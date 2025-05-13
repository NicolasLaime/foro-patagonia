package com.backend.foro.services;

import com.backend.foro.dtos.PostCreateDTO;
import com.backend.foro.dtos.PostResponseDTO;
import com.backend.foro.model.Post;

import java.util.List;

public interface IPostService {

    public List<PostResponseDTO> getPosts();
    public PostResponseDTO findPost(Long idPost);
    public PostResponseDTO savePost(PostCreateDTO postCreateDTO);
    public void deletePost(Long idPost);
    public PostResponseDTO  editPost(Long idPost, PostCreateDTO postCreateDTO);
    public List<PostResponseDTO> findByCategory(Long idCategory);


}
