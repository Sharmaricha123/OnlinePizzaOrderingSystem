package com.wipro.pizza.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.pizza.model.Address;
import com.wipro.pizza.model.Store;

public interface StoreRepository extends JpaRepository<Store, Integer> {

	Optional<Store> findByName(String name);

	List<Store> findAllByNameContaining(String search);

}
