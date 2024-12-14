package com.baobeodev.identity_service.repository;

import com.baobeodev.identity_service.entity.Bill;
import com.baobeodev.identity_service.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    List<Ticket> findByBill_Id(Integer billId);
}