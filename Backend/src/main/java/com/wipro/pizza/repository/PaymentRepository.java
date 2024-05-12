package com.wipro.pizza.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.pizza.model.Payment;

public interface PaymentRepository  extends JpaRepository<Payment , String>{

}
