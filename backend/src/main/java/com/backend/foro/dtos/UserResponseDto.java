package com.backend.foro.dtos;

import lombok.Data;

@Data
public class UserResponseDto {
    private Long id;
    private String email;
    private String role;
}
