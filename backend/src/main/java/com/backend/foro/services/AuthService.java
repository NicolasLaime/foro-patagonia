package com.backend.foro.services;

import com.backend.foro.dto.auth.LoginRequest;
import com.backend.foro.dto.auth.LoginResponse;
import com.backend.foro.dto.auth.RegisterRequest;
import com.backend.foro.dto.auth.RegisterResponse;
import com.backend.foro.model.RoleEntity;
import com.backend.foro.model.RoleEnum;
import com.backend.foro.model.UserEntity;
import com.backend.foro.repository.RoleRepository;
import com.backend.foro.repository.UserRepository;
import com.backend.foro.utils.JwtUtil;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class AuthService  {

    private final UserDetailsServiceImpl userDetailsService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;


    public AuthService(UserDetailsServiceImpl userDetailsService, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }



    //login
    public LoginResponse login(LoginRequest loginRequest){
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());

        if(!passwordEncoder.matches(loginRequest.getPassword(), userDetails.getPassword())){
            throw new RuntimeException("Contraseña incorrecta");
        }

        String role = userDetails.getAuthorities().iterator().next().getAuthority();

        String token = jwtUtil.generateToken(userDetails.getUsername(),role);

        return new LoginResponse(token);

    }

    //registrar un usuario
    public RegisterResponse register(RegisterRequest registerRequest) {
        String email = registerRequest.getEmail();
        String password = registerRequest.getPassword();

        // Asignar el rol: si no se especifica, asignamos "USER" por defecto
        String roleName = (registerRequest.getRole() != null && !registerRequest.getRole().isEmpty())
                ? registerRequest.getRole().toUpperCase()
                : "USER";

        // Buscar el rol en la base de datos
        Optional<RoleEntity> roleOpt = roleRepository.findByRoleName(RoleEnum.valueOf(roleName));

        if (roleOpt.isEmpty()) {
            throw new RuntimeException("Error: Role " + roleName + " not found in the database.");
        }

        UserEntity user = new UserEntity();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(roleOpt.get());

        userRepository.save(user);

        // Devolver un DTO con el mensaje de éxito
        return new RegisterResponse("User registered successfully!");
    }



}
