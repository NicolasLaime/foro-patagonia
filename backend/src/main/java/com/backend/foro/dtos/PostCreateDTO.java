package com.backend.foro.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.jmx.export.annotation.ManagedNotifications;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostCreateDTO {
    private String idea;
    private String userEmail;
    private Long categoryId;
}
