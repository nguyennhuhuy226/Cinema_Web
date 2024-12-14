package com.baobeodev.identity_service.dto.response;

import com.baobeodev.identity_service.entity.Bill;
import com.baobeodev.identity_service.entity.Combo;
import com.baobeodev.identity_service.entity.Ticket;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TicketAggregateResponse {
     int totalTickets; // Tổng số vé
     double totalPrice;
     double totalComboPrice;
     double totalAmount;
     List<TicketResponse> tickets;
     List<ComboResponse> combos;
     Bill bill;

}
