package com.baobeodev.identity_service.service;

import com.baobeodev.identity_service.dto.request.ScheduleRequest;
import com.baobeodev.identity_service.dto.response.ScheduleResponse;
import com.baobeodev.identity_service.entity.*;
import com.baobeodev.identity_service.exception.AppException;
import com.baobeodev.identity_service.exception.ErrorCode;
import com.baobeodev.identity_service.mapper.ScheduleMapper;
import com.baobeodev.identity_service.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
@Slf4j
@Service
public class ScheduleService {
    @Autowired
    private ScheduleSeatRepository scheduleSeatRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private ScheduleMapper scheduleMapper;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private SeatRepository seatRepository;

    @PreAuthorize("hasRole('ADMIN')")
    public ScheduleResponse createScheduleByMovieId(int movieId, ScheduleRequest scheduleRequest) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
        Room room = roomRepository.findById(scheduleRequest.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));
        // Kiểm tra phòng có thuộc chi nhánh không
        if (!Objects.equals(room.getBranch().getId(), scheduleRequest.getBranchId())) {
            throw new IllegalArgumentException("Phòng ID " + scheduleRequest.getRoomId() + " không thuộc chi nhánh ID " + scheduleRequest.getBranchId());
        }
        Branch branch = branchRepository.findById(scheduleRequest.getBranchId())
                .orElseThrow(() -> new RuntimeException("Branch not found"));
        // Lấy thời gian bắt đầu từ ScheduleRequest
        LocalDateTime startDateTime = scheduleRequest.getStartDateTime();
        LocalDateTime currentDateTime = LocalDateTime.now();

        // Kiểm tra nếu thời gian bắt đầu trễ hơn giờ hiện tại
        if (startDateTime.isBefore(currentDateTime)) {
            throw new AppException(ErrorCode.SHOWTIME_LATE);
        }
        // Kiểm tra nếu thời gian bắt đầu cách giờ hiện tại ít hơn 6 tiếng
        if (startDateTime.isBefore(currentDateTime.plusHours(6))) {
            throw new AppException(ErrorCode.CREATE_SIX_HOURT_BEFORE);
        }
        // Lấy thời gian kết thúc từ thời gian bắt đầu
        LocalDateTime endDateTime = startDateTime.plusMinutes(180);

        // Kiểm tra trùng lặp lịch chiếu trong phòng
        List<Schedule> overlappingSchedules = scheduleRepository.findByRoomIdAndBranchId(
                        scheduleRequest.getRoomId(), scheduleRequest.getBranchId())
                .stream()
                .filter(existingSchedule -> {
                    LocalDateTime existingStart = existingSchedule.getStartDateTime();
                    if (existingStart == null) {
                        return false; // Bỏ qua các lịch chiếu có startDateTime là null
                    }
                    LocalDateTime existingEnd = existingStart.plusMinutes(180); // Tính endDateTime của lịch chiếu hiện tại
                    // Kiểm tra xem lịch chiếu có chồng chéo với thời gian mới hay không
                    return !(existingEnd.isBefore(startDateTime) || existingStart.isAfter(endDateTime));
                })
                .toList();
        if (!overlappingSchedules.isEmpty()) {
            throw new AppException(ErrorCode.DUPLICATE_SHOWTIMES);
        }
        // Tạo lịch chiếu mới
        Schedule newSchedule = Schedule.builder()
                .startDateTime(startDateTime)
                .price(scheduleRequest.getPrice())
                .movie(movie)
                .room(room)
                .branch(branch)
                .build();
        Schedule savedSchedule = scheduleRepository.save(newSchedule);
        return scheduleMapper.toScheduleResponse(savedSchedule);
    }
    //hàm này bị lỗi ánh xạ nên code khác với mấy cái khác
    @PreAuthorize("hasRole('ADMIN')")
    public ScheduleResponse createSchedule(ScheduleRequest scheduleRequest) {
        Room room = roomRepository.findById(scheduleRequest.getRoomId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND ));
        if (!Objects.equals(room.getBranch().getId(), scheduleRequest.getBranchId())) {
            throw  new AppException(ErrorCode.NOT_FOUND_ROOM_IN_BRAND);
        }
        Movie movie = movieRepository.findById(scheduleRequest.getMovieId())
                .orElseThrow(() ->new AppException(ErrorCode.NOT_FOUND));
        Branch branch = branchRepository.findById(scheduleRequest.getBranchId())
                .orElseThrow(() ->new AppException(ErrorCode.NOT_FOUND));

        Schedule schedule = new Schedule();
        schedule.setMovie(movie);
        schedule.setBranch(branch);
        schedule.setRoom(room);
        schedule.setStartDateTime(scheduleRequest.getStartDateTime());
        schedule.setPrice(scheduleRequest.getPrice());

        Schedule savedSchedule = scheduleRepository.save(schedule);
        return scheduleMapper.toScheduleResponse(savedSchedule);
    }
    public List<ScheduleResponse> getSchedulesByMovie(int movieId) {
        return scheduleRepository.findByMovieId(movieId).stream()
                .map(scheduleMapper::toScheduleResponse)
                .collect(Collectors.toList());
    }
    @PreAuthorize("hasRole('ADMIN')")
    public ScheduleResponse updateSchedule(int id, ScheduleRequest scheduleRequest) {
        // Lấy Schedule cũ
        Schedule existingSchedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("loi"));
//                        new AppException(ErrorCode.NOT_FOUND));
        // Lấy Room từ yêu cầu và kiểm tra chi nhánh
        Room room = roomRepository.findById(scheduleRequest.getRoomId())
                .orElseThrow(() -> new RuntimeException("loi room"));

        if (!Objects.equals(room.getBranch().getId(), scheduleRequest.getBranchId())) {
            throw  new AppException(ErrorCode.NOT_FOUND_ROOM_IN_BRAND);
        }
        // Lấy Movie và Branch từ yêu cầu
        Movie movie = movieRepository.findById(scheduleRequest.getMovieId())
                .orElseThrow(() -> new RuntimeException("loi phim"));
        Branch branch = branchRepository.findById(scheduleRequest.getBranchId())
                .orElseThrow(() -> new RuntimeException("loi branch"));
        existingSchedule.setStartDateTime(scheduleRequest.getStartDateTime());
        existingSchedule.setPrice(scheduleRequest.getPrice());
        existingSchedule.setMovie(movie);
        existingSchedule.setBranch(branch);
        existingSchedule.setRoom(room);
        Schedule updatedSchedule = scheduleRepository.save(existingSchedule);
        return scheduleMapper.toScheduleResponse(updatedSchedule);
    }
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteSchedule(int id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));
        scheduleRepository.delete(schedule);}
    // Chạy tự động mỗi giờ
    @Scheduled(fixedRate = 3600000) // 1 giờ = 3600000 ms
    public void updateSeatsForAllRooms() {
        List<Integer> roomIds = scheduleRepository.findAllRoomIds(); // Thêm phương thức này
        roomIds.forEach(roomId -> {
            try {
                updateRoomAndSeatsAfterShow(roomId); // Gọi logic xử lý cho từng phòng
            } catch (AppException e) {
                log.warn("Skipping room {}: {}", roomId, e.getMessage());
            }
        });
    }
    public void updateRoomAndSeatsAfterShow(int roomId) {
        LocalDateTime now = LocalDateTime.now();
        log.info("Current time (now): {}", now);

        // Truy vấn các lịch chiếu trong phòng
        List<Schedule> schedules = scheduleRepository.findByRoomIdAndStartDateTimeBetween(
                roomId, now.minusDays(1), now.plusDays(1)
        );
        if (schedules.isEmpty()) {
            // Truy vấn tất cả ScheduleSeats cho các lịch chiếu trong phòng
            List<ScheduleSeat> scheduleSeats = scheduleSeatRepository.findBySchedule_Room_Id(roomId);

            // Cập nhật trạng thái booked của các ghế trong ScheduleSeat
            scheduleSeats.forEach(scheduleSeat -> {
                scheduleSeat.setBooked(false);  // Đặt trạng thái ghế thành chưa được đặt
                scheduleSeatRepository.save(scheduleSeat);
            });
            log.info("Seats updated successfully for room {}.", roomId);
            throw new AppException(ErrorCode.NO_SCHEDULES_FOUND);
        }

        // Kiểm tra nếu có lịch chiếu đang diễn ra
        boolean isOngoingSchedule = schedules.stream()
                .anyMatch(s -> now.isAfter(s.getStartDateTime()) &&
                        now.isBefore(s.getStartDateTime().plusMinutes(Long.parseLong(s.getMovie().getDuration()))));
        if (isOngoingSchedule) {
            throw new AppException(ErrorCode.AN_ONGOING_SCHEDULE);
        }

        // Kiểm tra nếu tất cả lịch chiếu đã kết thúc
        boolean allSchedulesFinished = schedules.stream()
                .allMatch(s -> now.isAfter(s.getStartDateTime().plusMinutes(Long.parseLong(s.getMovie().getDuration()))));
        if (!allSchedulesFinished) {
            throw new AppException(ErrorCode.NO_FINISHED_SCHEDULES);
        }

        // Cập nhật trạng thái ghế trong bảng ScheduleSeat nếu tất cả lịch chiếu đã kết thúc
        log.info("All schedules finished for room {}. Proceeding to update seats.", roomId);

        // Truy vấn tất cả ScheduleSeats cho các lịch chiếu trong phòng
        List<ScheduleSeat> scheduleSeats = scheduleSeatRepository.findBySchedule_Room_Id(roomId);

        // Cập nhật trạng thái booked của các ghế trong ScheduleSeat
        scheduleSeats.forEach(scheduleSeat -> {
            scheduleSeat.setBooked(false);  // Đặt trạng thái ghế thành chưa được đặt
            scheduleSeatRepository.save(scheduleSeat);
        });
        log.info("Seats updated successfully for room {}.", roomId);
    }

}
