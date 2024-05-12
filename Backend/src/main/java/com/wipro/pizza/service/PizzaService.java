package com.wipro.pizza.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.pizza.model.Cart;
import com.wipro.pizza.model.Store;
import com.wipro.pizza.model.Pizza;
import com.wipro.pizza.repository.CartRepository;
import com.wipro.pizza.repository.PizzaRepository;

@Service
public class PizzaService {

	@Autowired
	PizzaRepository pizzaRepo;
	
	@Autowired
	CartRepository cartRepo;
	
	@Autowired
	StoreService storeService;

	public String savePizza(int storeId,Pizza v) {

		// we don't enter id
		Store store= storeService.findStore(storeId).get();
		
		List<Pizza> org = pizzaRepo.findAllByStore(store);
		if (org.isEmpty()) {
			v.setStore(store);
			pizzaRepo.save(v);
			return "pizza added successfully";
		}
		else 
		{
			for(Pizza pizza:org) {
				if(pizza.getName().equals(v.getName()))
					return "pizza already exists";
			}
			v.setStore(store);
			pizzaRepo.save(v);
			return "pizza added successfully";
		}
	}

	public String updatePizza(Pizza v) {

		Optional<Pizza> org = findPizza(v.getPizzaId());
		if (org.isEmpty()) {
			return "pizza not found";
		}	
		v.setStore(v.getStore());
		pizzaRepo.save(v);
		return "pizza updated successfully";

	}

	public String deletePizza(int pizzaId) {

		Optional<Pizza> org = findPizza(pizzaId);
		if (org.isEmpty()) {
			return "pizza not found exception";
		}
		List<Cart> cart=cartRepo.findAllByPizza(org.get());
		System.out.println(cart);
		for(Cart c:cart) {System.out.println("deleted");
		    if(c.getStatus().equals("ordered"))
		    	{c.setPizza(null);
		        cartRepo.save(c);}
		    else {
			cartRepo.deleteById(c.getCartId());
		    }
		}
//		
		pizzaRepo.deleteById(pizzaId);
		return "pizza deleted successfully";

	}

	public Optional<Pizza> findPizza(int id) {

		Optional<Pizza> org = pizzaRepo.findById(id);

		return org;

	}

	public List<Pizza> findAllPizzasfromStore(int storeId) {
		Store store= storeService.findStore(storeId).get();
		
		return pizzaRepo.findAllByStore(store);
	}
	
	public List<Pizza> findAllPizzas() {
	
		return pizzaRepo.findAll();
	}

	public List<Pizza> findAllByName(String search) {
		
		return pizzaRepo.findAllByNameContaining(search);
	}


}
