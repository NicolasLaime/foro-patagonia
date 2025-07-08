package com.backend.foro.mapper;

import com.backend.foro.dtos.PostCreateDTO;
import com.backend.foro.dtos.PostResponseDTO;
import com.backend.foro.model.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PostMapper {

    // Post -> PostResponseDTO
    @Mapping(source = "user.email", target = "author")
    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "imageUrl" , target = "imageUrl")
    @Mapping(source = "content", target = "content")
    @Mapping(source = "user.id", target = "userId")
    PostResponseDTO toResponseDTO(Post post);

    //PostCreateDTO -> Post
    @Mapping(source = "imageUrl" , target = "imageUrl")
    @Mapping(source = "categoryId", target = "category.id")
    @Mapping(source = "content", target = "content")
    @Mapping(target = "id", ignore = true)
    Post toEntity(PostCreateDTO dto);
}
