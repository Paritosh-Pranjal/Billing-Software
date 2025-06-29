package com.backend.billing.service.impl;

import com.backend.billing.entity.CategoryEntity;
import com.backend.billing.entity.ItemEntity;
import com.backend.billing.io.ItemRequest;
import com.backend.billing.io.ItemResponse;
import com.backend.billing.repository.CategoryRepository;
import com.backend.billing.repository.ItemRepository;
import com.backend.billing.service.FileUploadService;
import com.backend.billing.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;
    private final FileUploadService fileUploadService;

    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) {
        String imgUrl = fileUploadService.uploadFile(file);
        ItemEntity newItem = convertToEntity(request);
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found: " + request.getCategoryId()));
        newItem.setCategory(existingCategory);
        newItem.setImgUrl(imgUrl);
        newItem = itemRepository.save(newItem);
        return convertToResponse(newItem);
    }

    @Override
    public List<ItemResponse> fetchItems() {
        return itemRepository.findAll().stream().map(itemEntity -> convertToResponse(itemEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteItem(String itemId) {
        ItemEntity existingItem = itemRepository.findByItemId(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found with itemId: " + itemId));
        boolean isFileDelete = fileUploadService.deleteFile(existingItem.getImgUrl());
        if(isFileDelete){
            itemRepository.delete(existingItem);
        }else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Unable to delete image");
        }
    }

    private ItemEntity convertToEntity(ItemRequest request){
        return  ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .build();
    }

    private ItemResponse convertToResponse(ItemEntity newItem){
        return ItemResponse.builder()
                .itemId(newItem.getItemId())
                .name(newItem.getName())
                .description(newItem.getDescription())
                .price(newItem.getPrice())
                .imgUrl(newItem.getImgUrl())
                .categoryName(newItem.getCategory().getName())
                .categoryId(newItem.getCategory().getCategoryId())
                .createdAt(newItem.getCreateAt())
                .updatedAt(newItem.getUpdatedAt())
                .build();
    }
}
