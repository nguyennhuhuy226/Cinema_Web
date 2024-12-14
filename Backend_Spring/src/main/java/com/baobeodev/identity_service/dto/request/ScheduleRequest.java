package com.baobeodev.identity_service.dto.request;

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
public class ScheduleRequest {
      LocalDateTime startDateTime;  // Thay vì có 2 trường startDate và startTime
     double price;
     int movieId;
     int branchId;
     int roomId;
}
