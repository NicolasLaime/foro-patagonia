package com.backend.foro.dtos;


import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class ErrorResponseDTO {

    private String message;
    private String errorCode;
    private LocalDateTime timestamp;
    private String detail;
    private String path;

    public ErrorResponseDTO(String message, String errorCode, String detail , String path) {
        this.message = message;
        this.errorCode = errorCode;
        this.detail = detail;
        this.path = path;
        this.timestamp = LocalDateTime.now();
    }


}
