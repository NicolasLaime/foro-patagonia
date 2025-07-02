package com.backend.foro.controllers;


import com.backend.foro.dtos.PostResponseDTO;
import com.backend.foro.dtos.UserResponseDto;
import com.backend.foro.dtos.UserResponseDto;
import com.backend.foro.mapper.UserMapper;
import com.backend.foro.model.UserEntity;
import com.backend.foro.services.IUserService;
import com.backend.foro.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin/users")
public class AdminUserController {


    @Autowired
    IUserService userService;

     @Autowired
    PostService postService;

    @Autowired
    UserMapper userMapper;

    @GetMapping
    public ResponseEntity<List<UserResponseDto>>getAllUser(){
        List<UserResponseDto> users = userService.getAllUsers().stream().map(userMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable Long id) {
        UserEntity user = userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return ResponseEntity.ok(userMapper.toDto(user));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok("Usuario eliminado correctamente.");
    }

    @GetMapping("/{id}/posts")
    public ResponseEntity<List<PostResponseDTO>> getPostsByUser(@PathVariable Long id) {
        return ResponseEntity.ok(postService.findByUserId(id));
    }


    @DeleteMapping("/{userId}/posts/{postId}")
    public ResponseEntity<String> deletePostFromUser(@PathVariable Long userId, @PathVariable Long postId) {
        postService.deletePostFromUser(userId, postId);
        return ResponseEntity.ok("Post eliminado correctamente.");
    }


}
