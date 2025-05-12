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

    @Override
    public void savePost(PostCreateDTO postCreateDTO) {
        Post post = postMapper.toEntity(postCreateDTO);

        Optional<UserEntity> userOptional = userService.findUser(postCreateDTO.getUserEmail());
        UserEntity user = userOptional.orElseThrow(() -> new EntityNotFoundException("User not found with email: " + postCreateDTO.getUserEmail()));
        Category category= categoryService.findCategoryEntity(postCreateDTO.getCategoryId());
        post.setCategory(category);
        post.setUser(user);
        post.setDate(new Date());
        postRepo.save(post);
    }

    @Override
    public void deletePost(Long idPost) {
        postRepo.deleteById(idPost);
    }

    @Override
    public void editPost(Long idPost, PostCreateDTO postCreateDTO) {
        Post postEdit = postRepo.findById(idPost)
                .orElseThrow(() -> new EntityNotFoundException("Post not found "));

        if (postCreateDTO.getUserEmail() == null || postCreateDTO.getUserEmail().isEmpty()) {
            throw new IllegalArgumentException("User email is required to edit a post.");
        }
        if (!postEdit.getUser().getEmail().equals(postCreateDTO.getUserEmail())) {
            throw new IllegalArgumentException("You can only edit your own posts.");
        }

        postEdit.setIdea(postCreateDTO.getIdea());

        if (postCreateDTO.getCategoryId() != null) {
            Category category = categoryService.findCategoryEntity(postCreateDTO.getCategoryId());
            postEdit.setCategory(category);
        }

        postRepo.save(postEdit);
    }

    @Override
    public List<PostResponseDTO> findByCategory(Long idCategory) {
        return postRepo.findByCategoryId(idCategory)
                .stream()
                .map(post -> postMapper.toResponseDTO(post))
                .collect(Collectors.toList());
    }
}
