package com.backend.foro.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "debe ser un email valido")
    private String email;

    @NotBlank(message = "la contraseña es obligatoria")
    @Size(min = 6, message = "la contraseña debe tener al menos 6 caracteres")
    private String password;

    private String role;

}
