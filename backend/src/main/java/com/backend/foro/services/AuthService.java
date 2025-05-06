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
public class AuthService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;


    public AuthService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }


    public UserDetails loadUserByUsername(String email){
        UserEntity userEntity = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return User.builder()
                .username(userEntity.getEmail())
                .password(userEntity.getPassword())
                .authorities(Collections.singletonList(new SimpleGrantedAuthority(userEntity.getRole().getRoleName().name())))
                .build();

    }


    //login
    public LoginResponse login(LoginRequest loginRequest){
        UserEntity userEntity = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if(!passwordEncoder.matches(loginRequest.getPassword(), userEntity.getPassword())){
            throw new RuntimeException("contraseña incorrecta");
        }

        String role = userEntity.getRole().getRoleName().name();

        String token = jwtUtil.generateToken(userEntity.getEmail(), role);

        return new LoginResponse(token);

    }

    //registrar un usuario
    public RegisterResponse register(RegisterRequest registerRequest) {
        String email = registerRequest.getEmail();
        String password = registerRequest.getPassword();

        UserEntity user = new UserEntity();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));

        // Buscar el rol USER en la base de datos
        Optional<RoleEntity> roleOpt = roleRepository.findByRoleName(RoleEnum.USER);

        if (roleOpt.isEmpty()) {
            throw new RuntimeException("Error: Role USER not found in the database.");
        }

        user.setRole(roleOpt.get());

        userRepository.save(user);

        // Devolver un DTO con el mensaje de éxito
        return new RegisterResponse("User registered successfully!");
    }



}
