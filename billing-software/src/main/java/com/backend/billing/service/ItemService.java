package com.backend.billing.service;

import com.backend.billing.io.ItemRequest;
import com.backend.billing.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request, MultipartFile file);
    List<ItemResponse> fetchItems();
    void deleteItem(String itemId);

}