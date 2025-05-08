package com.backend.foro.services;

import com.backend.foro.model.Category;
import com.backend.foro.model.Post;

import java.util.List;
import java.util.Optional;

public interface ICategoryService {

    public List<Category> getCategories();
    public void saveCategory(Category category);
    public Category findCategory(Long idCategory);
    public void deleteCategory(Long idCategory);
    public void editCategory(Long idCategory, Category category);

}
