package com.backend.foro.services;

import com.backend.foro.dtos.CategoryResponseDTO;
import com.backend.foro.dtos.PostCreateDTO;
import com.backend.foro.dtos.PostResponseDTO;
import com.backend.foro.mapper.CategoryMapper;
import com.backend.foro.mapper.PostMapper;
import com.backend.foro.model.Category;
import com.backend.foro.model.Post;
import com.backend.foro.model.UserEntity;
import com.backend.foro.repository.ICategoryRepository;
import com.backend.foro.repository.IPostRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService implements  IPostService {

    @Autowired
    IPostRepository postRepo;

    @Autowired
    UserService userService;

    @Autowired
    CategoryService categoryService;

    @Autowired
    PostMapper postMapper;

    @Autowired
    CategoryMapper categoryMapper;

    @Autowired
    ICategoryRepository categoryRepo;

    @Override
    public List<PostResponseDTO> getPosts() {
        return postRepo.findAll()
                .stream()
                .map(post -> postMapper.toResponseDTO(post))
                .collect(Collectors.toList());
    }

    @Override
    public PostResponseDTO findPost(Long idPost) {
        return postRepo.findById(idPost)
                .map(postMapper::toResponseDTO)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));
    }

    public List<PostResponseDTO> getPostsByUserEmail(String email) {
        UserEntity user = userService.findUser(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + email));

        List<Post> posts = postRepo.findByUser(user);

        return posts.stream()
                .map(post -> postMapper.toResponseDTO(post))
                .collect(Collectors.toList());
    }

    @Override
    public PostResponseDTO savePost(PostCreateDTO postCreateDTO) {
        String emailUsuarioLogueado = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userService.findUser(emailUsuarioLogueado)
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + emailUsuarioLogueado));

        Post post = postMapper.toEntity(postCreateDTO);

        Category category = categoryService.findCategoryEntity(postCreateDTO.getCategoryId());

        post.setCategory(category);
        post.setUser(user);
        post.setDate(new Date());

        postRepo.save(post);

        return postMapper.toResponseDTO(post);
    }


    @Override
    public void deletePost(Long idPost) {
        postRepo.deleteById(idPost);
    }

    @Override
    public PostResponseDTO editPost(Long idPost, PostCreateDTO postCreateDTO) {
        Post postEdit = postRepo.findById(idPost)
                .orElseThrow(() -> new EntityNotFoundException("Post not found "));

        postEdit.setIdea(postCreateDTO.getIdea());

        if (postCreateDTO.getCategoryId()!= null) {
            Category category = categoryService.findCategoryEntity(postCreateDTO.getCategoryId());
            postEdit.setCategory(category);
        }
        postRepo.save(postEdit);
        return postMapper.toResponseDTO(postEdit);
    }

    @Override
    public List<PostResponseDTO> findByCategory(Long idCategory) {
        return postRepo.findByCategoryId(idCategory)
                .stream()
                .map(post -> postMapper.toResponseDTO(post))
                .collect(Collectors.toList());
    }


}
