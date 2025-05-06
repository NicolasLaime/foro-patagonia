package com.backend.foro.repository;

import com.backend.foro.model.RoleEntity;
import com.backend.foro.model.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<RoleEntity,Long> {

    Optional<RoleEntity> findByRoleName(RoleEnum roleName);  // Cambiado a RoleEnum
    boolean existsByRoleName(RoleEnum roleName);

}
