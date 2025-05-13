package com.backend.foro.controllers;

import com.backend.foro.dtos.PostCreateDTO;
import com.backend.foro.dtos.PostResponseDTO;
import com.backend.foro.services.IPostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    IPostService postService;

    @GetMapping
    public ResponseEntity<List<PostResponseDTO>> getAllPosts(){
        return ResponseEntity.ok(postService.getPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDTO> getPost(@PathVariable Long id){
        return ResponseEntity.ok(postService.findPost(id));
    }

    @PostMapping
    public ResponseEntity<PostResponseDTO> createPost( @Valid @RequestBody PostCreateDTO postCreateDTO){
        PostResponseDTO postResponseDTO = postService.savePost(postCreateDTO);
        URI location = URI.create("/posts/" + postResponseDTO.getId());
        return ResponseEntity.created(location).body(postResponseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id){
        postService.deletePost(id);
        return new ResponseEntity<>("Post deleted successfully.", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostResponseDTO>  editPost(@Valid @PathVariable Long id, @RequestBody PostCreateDTO postCreateDTO){
        PostResponseDTO postResponseDTO = postService.editPost(id,postCreateDTO);
        return ResponseEntity.ok(postResponseDTO);
    }
}
