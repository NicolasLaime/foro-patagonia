package com.backend.foro.mapper;

import com.backend.foro.dtos.PostCreateDTO;
import com.backend.foro.dtos.PostResponseDTO;
import com.backend.foro.model.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PostMapper {

    // Post -> PostResponseDTO
    @Mapping(source = "user.email", target = "userEmail")
    @Mapping(source = "category.name", target = "categoryName")
    PostResponseDTO toResponseDTO(Post post);

    //PostCreateDTO -> Post
    @Mapping(source = "userEmail", target = "user.email")
    @Mapping(source = "categoryId", target = "category.id")
    @Mapping(target = "id", ignore = true)
    Post toEntity(PostCreateDTO dto);
}
