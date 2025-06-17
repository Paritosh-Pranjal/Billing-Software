package com.backend.billing.service;

import com.backend.billing.io.CategoryRequest;
import com.backend.billing.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface CategoryService {
    CategoryResponse add(CategoryRequest categoryRequest, MultipartFile file);
    List<CategoryResponse> read();
    void delete(String categoryId);
}
