package com.backend.foro.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class LoginRequest {

    @NotBlank(message = "el email es obligatorio")
    @Email(message = "Debe ser un email valido")
    private String email;


    @NotBlank(message = "La constraseña es obligatoria")
    private String password;
}
