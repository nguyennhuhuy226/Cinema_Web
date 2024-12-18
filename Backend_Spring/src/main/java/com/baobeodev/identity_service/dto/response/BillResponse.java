package com.baobeodev.identity_service.dto.response;

import com.baobeodev.identity_service.entity.Ticket;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BillResponse {
     int id;
     LocalDateTime createdTime;
     Ticket ticket;
}
