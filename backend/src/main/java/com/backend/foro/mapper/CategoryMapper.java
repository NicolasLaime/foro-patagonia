package com.backend.foro.mapper;

import com.backend.foro.dtos.CategoryCreateDTO;
import com.backend.foro.dtos.CategoryResponseDTO;
import com.backend.foro.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {


    @Mapping(source = "name" , target = "name")
    @Mapping(target = "id", ignore = true)
    Category toEntity( CategoryCreateDTO dto);


    @Mapping(source = "name", target = "name")
    @Mapping(source = "description", target = "description")
    @Mapping(expression = "java(category.getPostCount())", target = "postCount")
    CategoryResponseDTO toResponseDTO(Category category);


    @Mapping(source = "name", target = "name")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "postCount", target = "postCount")
    @Mapping(target = "id", ignore = true)
    Category toEntity(CategoryResponseDTO dto);


}
