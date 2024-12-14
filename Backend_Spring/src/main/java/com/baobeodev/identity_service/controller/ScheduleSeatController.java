package com.baobeodev.identity_service.controller;

import com.baobeodev.identity_service.dto.request.ApiResponse;
import com.baobeodev.identity_service.dto.response.ScheduleSeatResponse;
import com.baobeodev.identity_service.dto.response.SeatResponse;
import com.baobeodev.identity_service.dto.response.TicketResponse;
import com.baobeodev.identity_service.entity.Schedule;
import com.baobeodev.identity_service.entity.ScheduleSeat;
import com.baobeodev.identity_service.entity.Seat;
import com.baobeodev.identity_service.exception.AppException;
import com.baobeodev.identity_service.exception.ErrorCode;
import com.baobeodev.identity_service.repository.ScheduleRepository;
import com.baobeodev.identity_service.repository.ScheduleSeatRepository;
import com.baobeodev.identity_service.repository.SeatRepository;
import com.baobeodev.identity_service.service.ScheduleSeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/schedule_seat")
@RequiredArgsConstructor
public class ScheduleSeatController {
    private final ScheduleSeatService scheduleSeatService;

    @GetMapping("/schedule/{scheduleId}")
    public ApiResponse<List<ScheduleSeatResponse>> getTicketsByBillId(@PathVariable Integer scheduleId) {
        List<ScheduleSeatResponse> scheduleSeatResponses = scheduleSeatService.getScheduleSeatForIdSchedule(scheduleId);
        return ApiResponse.<List<ScheduleSeatResponse>>builder().result(scheduleSeatResponses).build();
    }
}
