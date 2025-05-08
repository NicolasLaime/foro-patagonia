package com.backend.foro.services;

import com.backend.foro.model.Post;
import com.backend.foro.repository.ICategoryRepository;
import com.backend.foro.repository.IPostRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostService implements  IPostService {

    @Autowired
    IPostRepository postRepo;

    @Autowired
    ICategoryRepository categoryRepo;

    @Override
    public List<Post> getPosts() {
        return postRepo.findAll();
    }

    @Override
    public Post findPost(Long idPost) {
        return postRepo.findById(idPost).orElseThrow(() -> new EntityNotFoundException("Post no encontrado"));
    }

    @Override
    public void savePost(Post post) {
        postRepo.save(post);
    }

    @Override
    public void deletePost(Long idPost) {
        postRepo.deleteById(idPost);
    }

    @Override
    public void editPost(Long idPost, Post post) {
        Post postEdit = postRepo.findById(idPost).orElseThrow(() -> new EntityNotFoundException("Post no encontrado"));
        postEdit.setIdea(post.getIdea());
        postRepo.save(postEdit);
    }

    @Override
    public List<Post> findByCategory(Long idCategory) {
        return postRepo.findByCategoryId(idCategory);
    }
}
