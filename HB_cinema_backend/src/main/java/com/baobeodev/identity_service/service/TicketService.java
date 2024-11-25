package com.baobeodev.identity_service.service;

import com.baobeodev.identity_service.dto.request.TicketRequest;
import com.baobeodev.identity_service.dto.response.BillResponse;
import com.baobeodev.identity_service.dto.response.ComboResponse;
import com.baobeodev.identity_service.dto.response.TicketAggregateResponse;
import com.baobeodev.identity_service.dto.response.TicketResponse;
import com.baobeodev.identity_service.entity.*;
import com.baobeodev.identity_service.exception.AppException;
import com.baobeodev.identity_service.exception.ErrorCode;
import com.baobeodev.identity_service.mapper.BillMapper;
import com.baobeodev.identity_service.mapper.TicketMapper;
import com.baobeodev.identity_service.repository.*;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.qrcode.QRCodeWriter;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE , makeFinal = true)
@Slf4j//cho ghi log
public class TicketService {
    TicketRepository ticketRepository;
    SeatRepository seatRepository;
    ScheduleRepository scheduleRepository;
    BillRepository billRepository;
    TicketMapper ticketMapper;
    @Autowired
    BillService billService;
    BillMapper billMapper;
    @Autowired
    private ScheduleSeatService scheduleSeatService;
    @Autowired
    private ComboRepository comboRepository;


    public List<TicketResponse> getAllTickets() {
        return ticketRepository.findAll().stream()
                .map(ticketMapper::toTicketResponse)
                .toList();
    }

    @Transactional
    public TicketAggregateResponse createTickets(Integer billId, List<TicketRequest> ticketRequests, List<Combo> combos) {
        // Kiểm tra và tạo mới Bill nếu chưa tồn tại
        Bill bill = getOrCreateBill(billId);

        // Thêm Combo vào Bill và lưu vào database
        billService.addCombosToBill(bill.getId(), combos);

        double totalTicketPrice = 0.0;
        double totalComboPrice = 0.0;

        // Xử lý các yêu cầu tạo vé
        List<TicketResponse> ticketResponses = new ArrayList<>();
        List<ComboResponse> comboResponses = null;
        for (TicketRequest ticketRequest : ticketRequests) {
            // Kiểm tra trạng thái ghế trong lịch chiếu và đặt ghế
            ScheduleSeat scheduleSeat = scheduleSeatService.bookSeatForSchedule(
                    ticketRequest.getScheduleId(), ticketRequest.getSeatId()
            );
            // Tạo mới Ticket và gắn các thông tin cần thiết
            Ticket ticket = new Ticket();
            ticket.setBill(bill); // Gắn bill vào ticket
            ticket.setSeat(scheduleSeat.getSeat());
            ticket.setSchedule(scheduleSeat.getSchedule());

            // Tính giá vé và cộng dồn vào tổng
            double ticketPrice = scheduleSeat.getSeat().getPrice();
            totalTicketPrice += ticketPrice;

            // Tạo QR code cho vé
            String qrCodeText = generateQRCodeText(ticket);
            String qrImageUrl = generateQRCodeImage(qrCodeText);
            ticket.setQrImageURL(qrImageUrl);

            // Lưu vé vào database
            ticketRepository.save(ticket);
            comboResponses = combos.stream()
                    .map(combo -> {
                        // map truc tiep k qua dto
                        ComboResponse response = new ComboResponse();
                        response.setName(combo.getName());
                        response.setPrice(combo.getPrice());
                        return response;
                    })
                    .toList();
            // Chuyển Ticket thành TicketResponse
            TicketResponse ticketResponse = ticketMapper.toTicketResponse(ticket);

            ticketResponses.add(ticketResponse);
        }
        // Tính tổng giá trị của Combo
        totalComboPrice = combos.stream().mapToDouble(Combo::getPrice).sum();

        // Tính tổng tiền (vé + combo)
        double totalAmount = totalTicketPrice + totalComboPrice;

        // Trả về kết quả tổng hợp
        return TicketAggregateResponse.builder()
                .totalTickets(ticketResponses.size())
                .totalPrice(totalTicketPrice)
                .totalComboPrice(totalComboPrice)
                .totalAmount(totalAmount)
                .tickets(ticketResponses)
                .combos(comboResponses)
                .bill(bill)
                .build();
    }
    private Bill getOrCreateBill(Integer billId) {
        if (billId != null) {
            return billRepository.findById(billId)
                    .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
        }
        BillResponse billResponse = billService.createBillForCurrentUser();
        return billMapper.toEntity(billResponse);
    }

    private String generateQRCodeText(Ticket ticket) {
        // Lấy thông tin từ đối tượng Ticket
        String startDateTime = ticket.getSchedule().getStartDateTime().toString(); // Thời gian bắt đầu
        String movieTitle = ticket.getSchedule().getMovie().getTitle();            // Tên phim
        String seatName = ticket.getSeat().getName();                              // Tên ghế
        String branchName = ticket.getSchedule().getBranch().getName();            // Tên chi nhánh
        String roomName = ticket.getSchedule().getRoom().getName();                // Tên phòng
        String timeBuyTicket=ticket.getBill().getCreatedTime().toString();     //ngày mua
        return """
        MOVIE: %s
        START TIME: %s
        BRANCH: %s
        ROOM: %s
        SEAT: %s
        TIME CREATE: %s
        """.formatted( movieTitle, startDateTime, branchName, roomName, seatName, timeBuyTicket);
    }

    private String generateQRCodeImage(String text) {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            Map<EncodeHintType, Object> hintMap = new HashMap<>();
            hintMap.put(EncodeHintType.MARGIN, 1); // Tùy chỉnh

            // Tạo QR code với kích thước 250x250 px
            BufferedImage qrCodeImage = MatrixToImageWriter.toBufferedImage(
                    qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, 250, 250, hintMap)
            );
            // Chuyển đổi hình ảnh thành base64 để sử dụng làm URL hình ảnh
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            ImageIO.write(qrCodeImage, "PNG", byteArrayOutputStream);
            byte[] imageBytes = byteArrayOutputStream.toByteArray();
            return "data:image/png;base64," + Base64.getEncoder().encodeToString(imageBytes);
        } catch (WriterException | IOException e) {
            throw new RuntimeException("Error generating QR Code", e);
        }
    }
    }


