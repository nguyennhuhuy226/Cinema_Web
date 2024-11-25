package com.baobeodev.identity_service.controller;

import com.baobeodev.identity_service.dto.response.SeatResponse;
import com.baobeodev.identity_service.entity.Schedule;
import com.baobeodev.identity_service.entity.ScheduleSeat;
import com.baobeodev.identity_service.entity.Seat;
import com.baobeodev.identity_service.exception.AppException;
import com.baobeodev.identity_service.exception.ErrorCode;
import com.baobeodev.identity_service.repository.ScheduleRepository;
import com.baobeodev.identity_service.repository.ScheduleSeatRepository;
import com.baobeodev.identity_service.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/schedules")
@RequiredArgsConstructor
public class ScheduleSeatController {

    private final ScheduleSeatRepository scheduleSeatRepository;
    private final ScheduleRepository scheduleRepository;
    private final SeatRepository seatRepository;


}
