/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.backend.foro.model;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;


/**
 *
 * @author Usuario
 * */

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String idea;

    private Date date;

    private String content;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "author")
    private String author;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private UserEntity user;

}
