package com.backend.foro.dtos;

import lombok.Data;

import java.util.Date;

@Data
public class PostResponseDTO {
    private Long id;
    private String idea;
    private Date date;
    private String userEmail;
    private String categoryName;
}
