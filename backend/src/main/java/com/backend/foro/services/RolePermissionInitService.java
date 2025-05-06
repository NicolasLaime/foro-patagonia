package com.backend.foro.services;

import com.backend.foro.model.PermissionEnum;
import com.backend.foro.model.RoleEntity;
import com.backend.foro.model.RoleEnum;
import com.backend.foro.model.UserEntity;
import com.backend.foro.repository.RoleRepository;
import com.backend.foro.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.EnumSet;
import java.util.Set;

@Service
public class RolePermissionInitService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public RolePermissionInitService(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void init(){
        if(!roleRepository.existsByRoleName(RoleEnum.USER)){
            createRole(RoleEnum.USER, Set.of(PermissionEnum.READ, PermissionEnum.WRITE));
        }

        if (!roleRepository.existsByRoleName(RoleEnum.ADMIN)) {
            createRole(RoleEnum.ADMIN, EnumSet.allOf(PermissionEnum.class)); // Asignar todos los permisos al rol ADMIN
        }

        if (!userRepository.existsByEmail("admin@foro.com")) {
            createAdminUser();
        }
    }


    private void createRole(RoleEnum roleName, Set<PermissionEnum> permissions) {
        RoleEntity role = new RoleEntity();
        role.setRoleName(roleName);
        role.setPermissions(permissions);
        roleRepository.save(role);
    }

    private void createAdminUser() {
        UserEntity adminUser = new UserEntity();
        adminUser.setEmail("admin@foro.com");
        adminUser.setPassword(passwordEncoder.encode("1234"));

        RoleEntity adminRole = roleRepository.findByRoleName(RoleEnum.ADMIN)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        adminUser.setRole(adminRole);

        userRepository.save(adminUser);
    }



}
