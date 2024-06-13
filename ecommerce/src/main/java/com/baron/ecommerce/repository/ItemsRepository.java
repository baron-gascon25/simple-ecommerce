package com.baron.ecommerce.repository;

import com.baron.ecommerce.entity.Items;
import com.baron.ecommerce.entity.enums.ItemStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemsRepository extends JpaRepository<Items, Long> {

    List<Items> findItemsByCartIdAndStatus(int cart_id, ItemStatus status);
}
