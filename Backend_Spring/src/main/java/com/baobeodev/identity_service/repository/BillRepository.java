package com.baobeodev.identity_service.repository;

import com.baobeodev.identity_service.entity.Bill;
import com.baobeodev.identity_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BillRepository extends JpaRepository<Bill, Integer> {
    List<Bill> findByUser_Username(String username);
    List<Bill> findByUser_Id(String Id);

}