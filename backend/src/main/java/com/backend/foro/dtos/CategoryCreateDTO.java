package com.backend.foro.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryCreateDTO {

    @NotBlank(message = "Category name is required.")
    @Size(min = 3, max = 50, message = "Category name must be between 3 and 50 characters.")
    private String name;

    @NotBlank(message = "Category description is required.")
    @Size(min = 5, max = 255, message = "Category description must be between 5 and 255 characters.")
    private String description;

    private String imageUrl;
}
