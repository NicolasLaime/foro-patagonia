package com.backend.foro.config;

import com.backend.foro.model.RoleEntity;
import com.backend.foro.model.RoleEnum;
import com.backend.foro.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;

public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    public DataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) {
        // Crear roles si no existen
        for (RoleEnum roleEnum : RoleEnum.values()) {
            if (!roleRepository.existsByRoleName(roleEnum)) {
                RoleEntity role = new RoleEntity();
                role.setRoleName(roleEnum);
                roleRepository.save(role);
                System.out.println("Rol creado: " + roleEnum.name());
            }
        }
    }

}
