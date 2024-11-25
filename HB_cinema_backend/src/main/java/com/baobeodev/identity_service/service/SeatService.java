package com.baobeodev.identity_service.service;

import com.baobeodev.identity_service.dto.response.SeatResponse;
import com.baobeodev.identity_service.entity.ScheduleSeat;
import com.baobeodev.identity_service.entity.Seat;
import com.baobeodev.identity_service.repository.ScheduleSeatRepository;
import com.baobeodev.identity_service.repository.SeatRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE , makeFinal = true)
@Slf4j//cho ghi log
public class SeatService {
    SeatRepository seatRepository;
    private final ScheduleSeatRepository scheduleSeatRepository;

    public List<SeatResponse> getSeatsForSchedule(int scheduleId) {
        List<ScheduleSeat> scheduleSeats = scheduleSeatRepository.findByScheduleId(scheduleId);
        return scheduleSeats.stream()
                .map(scheduleSeat -> {
                    Seat seat = scheduleSeat.getSeat();
                    return new SeatResponse(
                            seat.getId(),
                            seat.getName(),
                            scheduleSeat.isBooked(), // Trạng thái booked từ ScheduleSeat
                            seat.getSeatType(),
                            seat.getPrice()
                    );
                })
                .collect(Collectors.toList());
    }

}
