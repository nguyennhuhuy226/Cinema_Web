package com.baobeodev.identity_service.repository;

import com.baobeodev.identity_service.entity.Role;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,String> {
    @EntityGraph(attributePaths = "permissions")
    Optional<Role> findByName(String name);
}
