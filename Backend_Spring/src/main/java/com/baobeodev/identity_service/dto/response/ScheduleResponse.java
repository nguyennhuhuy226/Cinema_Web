package com.baobeodev.identity_service.dto.response;

import com.baobeodev.identity_service.entity.Branch;
import com.baobeodev.identity_service.entity.Movie;
import com.baobeodev.identity_service.entity.Room;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ScheduleResponse {
     int id;
     LocalDateTime startDateTime;
     double price;
     String movieName;
     String branchName;
     Room room;
}
