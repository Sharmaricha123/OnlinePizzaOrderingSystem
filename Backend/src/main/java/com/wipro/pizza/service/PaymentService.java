package com.wipro.pizza.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.pizza.model.Payment;
import com.wipro.pizza.repository.PaymentRepository;

@Service
public class PaymentService {
	
	@Autowired
	PaymentRepository paymentRepo;
	
	
	public Payment makePayment(Payment payment) {
		return paymentRepo.save(payment);
		
	}
	
}
