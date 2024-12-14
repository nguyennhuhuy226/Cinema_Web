package com.baobeodev.identity_service.dto.response;

import com.baobeodev.identity_service.entity.Bill;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ComboResponse {
    private String name; // Tên combo đồ ăn
    private double price; // Giá combo đồ ăn
}
