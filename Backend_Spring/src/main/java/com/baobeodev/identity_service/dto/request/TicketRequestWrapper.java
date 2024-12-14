package com.baobeodev.identity_service.dto.request;

import com.baobeodev.identity_service.entity.Combo;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TicketRequestWrapper {
    private List<TicketRequest> ticketRequests;
    private List<Combo> combos;
}
