package com.backend.foro.dtos;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class ErrorValidationDTO extends ErrorResponseDTO {


    private List<String> details;

    public ErrorValidationDTO(List<String> details, String message, String errorCode, String detail, String path) {
        super(message, errorCode, detail, path);
        this.details = details;
    }

}
