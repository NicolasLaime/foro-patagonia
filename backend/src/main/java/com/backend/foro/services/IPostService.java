package com.backend.foro.services;

import com.backend.foro.model.Post;

import java.util.List;

public interface IPostService {

    public List<Post> getPosts();
    public Post findPost(Long idPost);
    public void savePost(Post post);
    public void deletePost(Long idPost);
    public void  editPost(Long idPost,Post post);
    public List<Post> findByCategory(Long idCategory);

}
