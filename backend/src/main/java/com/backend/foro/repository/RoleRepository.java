package com.backend.foro.repository;

import com.backend.foro.model.RoleEntity;
import com.backend.foro.model.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity,Long> {

    Optional<RoleEntity> findByRoleName(RoleEnum roleName);
    boolean existsByRoleName(RoleEnum roleName);

}
