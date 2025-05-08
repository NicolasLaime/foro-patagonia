package com.backend.foro.services;

import com.backend.foro.model.Category;
import com.backend.foro.repository.ICategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements ICategoryService{

    @Autowired
    ICategoryRepository categoryRepo;

    @Override
    @Transactional
    public List<Category> getCategories() {
        List<Category> categories = categoryRepo.findAll();
        return categories;
    }

    @Override
    @Transactional
    public void saveCategory(Category category) {
        categoryRepo.save(category);
    }

    @Override
    @Transactional
    public Category findCategory(Long idCategory) {
        return categoryRepo.findById(idCategory)
                .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada"));
    }

    @Override
    @Transactional
    public void deleteCategory(Long idCategory) {
        categoryRepo.deleteById(idCategory);
    }

    @Override
    @Transactional
    public void editCategory(Long idCategory, Category category) {
        Category categoryEdit = categoryRepo.findById(idCategory)
                .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada"));
        categoryEdit.setName(categoryEdit.getName());

    }
}
