package com.wipro.pizza.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.pizza.model.Cart;
import com.wipro.pizza.model.PurchaseOrder;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Integer> {

	
}
