package com.backend.foro.services;

import com.backend.foro.dtos.CategoryCreateDTO;
import com.backend.foro.dtos.CategoryResponseDTO;
import com.backend.foro.model.Category;
import com.backend.foro.model.Post;

import java.util.List;
import java.util.Optional;

public interface ICategoryService {

    public List<CategoryResponseDTO> getCategories();
    public void saveCategory(CategoryCreateDTO categoryDto);
    public CategoryResponseDTO findCategoryDTO(Long idCategory);
    public Category findCategoryEntity(Long id);
    public void deleteCategory(Long idCategory);
    public void editCategory(Long idCategory, CategoryCreateDTO categoryCreateDTO);

}
