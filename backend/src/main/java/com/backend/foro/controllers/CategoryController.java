package com.backend.foro.controllers;

import com.backend.foro.dtos.CategoryCreateDTO;
import com.backend.foro.dtos.CategoryResponseDTO;
import com.backend.foro.dtos.PostResponseDTO;
import com.backend.foro.services.ICategoryService;
import com.backend.foro.services.IPostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    ICategoryService categoryService;

    @Autowired
    IPostService postService;

    @GetMapping
    public ResponseEntity<List<CategoryResponseDTO>> getAllCategories(){
        return ResponseEntity.ok(categoryService.getCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> getCategory(@PathVariable Long id){
        return ResponseEntity.ok(categoryService.findCategoryDTO(id));
    }

    @GetMapping("/{id}/posts")
    public ResponseEntity<List<PostResponseDTO>> getPostsByCategory(@PathVariable Long id){
        return ResponseEntity.ok(postService.findByCategory(id));
    }


    @PostMapping
    public ResponseEntity<CategoryResponseDTO> createCategory(@Valid @RequestBody CategoryCreateDTO categoryCreateDTO){
        CategoryResponseDTO categoryResponseDTO = categoryService.saveCategory(categoryCreateDTO);
        URI location = URI.create("/categories/" + categoryResponseDTO.getId());
        return ResponseEntity.created(location).body(categoryResponseDTO);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id){
        categoryService.deleteCategory(id);
        return new ResponseEntity<>("Category deleted successfully.", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> editCategory(@PathVariable Long id, @RequestBody CategoryCreateDTO categoryCreateDTO){
        CategoryResponseDTO categoryResponseDTO = categoryService.editCategory(id, categoryCreateDTO);
        return ResponseEntity.ok(categoryResponseDTO);
    }
}
