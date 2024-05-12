package com.wipro.pizza.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.pizza.model.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

}
