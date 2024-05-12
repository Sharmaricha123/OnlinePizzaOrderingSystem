package com.wipro.pizza.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.pizza.model.Store;
import com.wipro.pizza.model.Pizza;

public interface PizzaRepository extends JpaRepository<Pizza, Integer> {

	Optional<Pizza> findByName(String name);

	List<Pizza> findAllByStore(Store store);
	
	List<Pizza> findAll();

	List<Pizza> findAllByNameContaining(String search);

}
