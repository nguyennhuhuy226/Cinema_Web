package com.baobeodev.identity_service.repository;

import com.baobeodev.identity_service.entity.Seat;
import org.mapstruct.Mapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository  extends JpaRepository<Seat,Integer> {
List<Seat> findByRoomId(int roomid);
}
