package com.backend.foro.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.jmx.export.annotation.ManagedNotifications;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostCreateDTO {
    @NotBlank(message = "Idea must not be blank.")
    private String idea;

    @NotBlank(message = "Autor  is required.")
    private String author;

    private String imageUrl;

    @NotNull(message = "Category ID is required.")
    private Long categoryId;


    @NotBlank(message = "Content is required.")
    private String content;

}
