package com.backend.billing.controller;

import com.backend.billing.io.CategoryRequest;
import com.backend.billing.io.CategoryResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.backend.billing.service.CategoryService;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CategoryController
{
    private final CategoryService categoryService;

    @PostMapping("/admin/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(@RequestPart("category") String categoryString,
                                        @RequestPart("file") MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();
        CategoryRequest request = null;
        try{
            request = objectMapper.readValue(categoryString,CategoryRequest.class);
            return  categoryService.add(request,file);
        }
        catch(JsonProcessingException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Exception occurred while passing the JSON" + e);
        }
    }

    @GetMapping("/categories")
    public List<CategoryResponse> fetchCategories(){
        return categoryService.read();
    }

   @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/admin/categories/{categoryId}")
    public void deleteCategory(@PathVariable String categoryId){
        try{
            categoryService.delete(categoryId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Category Not Found" + e.getMessage());
        }
    }
}
