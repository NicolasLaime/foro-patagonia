package com.backend.foro.services;

import com.backend.foro.dtos.CategoryCreateDTO;
import com.backend.foro.dtos.CategoryResponseDTO;
import com.backend.foro.mapper.CategoryMapper;
import com.backend.foro.model.Category;
import com.backend.foro.repository.ICategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService implements ICategoryService{

    @Autowired
    ICategoryRepository categoryRepo;

    @Autowired
    CategoryMapper categoryMapper;

    @Override
    @Transactional
    public List<CategoryResponseDTO> getCategories() {
        return categoryRepo.findAll()
                .stream()
                .map(category -> categoryMapper.toResponseDTO(category))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void saveCategory(CategoryCreateDTO categoryDto) {
        Category category = categoryMapper.toEntity(categoryDto);
        categoryRepo.save(category);
    }

    @Override
    @Transactional
    public CategoryResponseDTO findCategoryDTO(Long idCategory) {
        return categoryRepo.findById(idCategory).map(categoryMapper ::toResponseDTO)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
    }

    @Override
    @Transactional
    public Category findCategoryEntity(Long id) {
        return categoryRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + id));
    }


    @Override
    @Transactional
    public void deleteCategory(Long idCategory) {
        categoryRepo.deleteById(idCategory);
    }

    @Override
    @Transactional
    public void editCategory(Long idCategory, CategoryCreateDTO categoryCreateDTO) {
        Category categoryEdit = categoryRepo.findById(idCategory)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
        categoryEdit.setName(categoryCreateDTO.getName());
        categoryEdit.setDescription(categoryCreateDTO.getDescription());
        categoryRepo.save(categoryEdit);

    }
}
