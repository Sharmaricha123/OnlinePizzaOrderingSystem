package com.wipro.pizza.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.pizza.model.Pizza;
import com.wipro.pizza.service.PizzaService;



@RestController
@RequestMapping("/pizza/app")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminPizzaController {
	
	@Autowired
	HomeController homeController;
	
	@Autowired
	PizzaService pizzaService;
	
	@PostMapping("/admin/{storeId}/add/pizza")
	public ResponseEntity<String> addPizza(@PathVariable int storeId,@RequestBody Pizza pizza) throws Exception {
		
		// System.out.println(store.getAddress());
		if(homeController.getAdminAccess()) {
		String response = "";
//		try {
			response = pizzaService.savePizza(storeId,pizza);
//		} catch (Exception e) {
//			return ResponseEntity.status(200).body(e.getMessage());
//		}
		
			return ResponseEntity.status(200).body(response);
		}
		return ResponseEntity.status(403).body("Access denied");
	}

	@PostMapping("/admin/update/pizza/{pizzaId}")
	public ResponseEntity<String> updatePizza(@PathVariable int pizzaId, @RequestBody Pizza pizza) throws Exception {
		// System.out.println(store.getAddress());
		if(homeController.getAdminAccess()) {
		String response = "";
		try {
			response = pizzaService.updatePizza(pizza);
		} catch (Exception e) {
			return ResponseEntity.status(200).body(e.getMessage());
		}
		
		return ResponseEntity.status(200).body(response);
		}
		return ResponseEntity.status(403).body("Access denied");
	}

	@GetMapping("/admin/delete/pizza/{pizzaId}")
	public ResponseEntity<String> deletePizza(@PathVariable int pizzaId) throws Exception {
		// System.out.println(store.getAddress());
		if(homeController.getAdminAccess()) {
		String response = "";
		try {
			response = pizzaService.deletePizza(pizzaId);
		} catch (Exception e) {
			return ResponseEntity.status(200).body(e.getMessage());
		}
		
		return ResponseEntity.status(200).body(response);
		}
		return ResponseEntity.status(403).body("Access denied");
	}
	
	@GetMapping("/admin/{storeId}/view/pizzas")
	public ResponseEntity<Object> viewPizzafromStore(@PathVariable int storeId) throws Exception {
		// System.out.println(store.getAddress());
		if(homeController.getAdminAccess()) {
		List<Pizza> response;
		try {
			response = pizzaService.findAllPizzasfromStore(storeId);
		} catch (Exception e) {
			return ResponseEntity.status(200).body(e.getMessage());
		}

		return ResponseEntity.status(200).body(response);}
		return ResponseEntity.status(403).body("Access denied");
	}
	
	@GetMapping("/admin/view/pizza/{pizzaId}")
	public ResponseEntity<Object> viewPizza(@PathVariable int pizzaId) throws Exception {
		// System.out.println(store.getAddress());
		if(homeController.getAdminAccess()) {
		Pizza response;
		try {
			response = pizzaService.findPizza(pizzaId).get();
		 }
		catch (Exception e) {
			return ResponseEntity.status(200).body(e.getMessage());
		}
		return ResponseEntity.status(200).body(response);
		}
		return ResponseEntity.status(403).body("Access denied");
	}
	
	@GetMapping("/admin/view/allpizzas")
	public ResponseEntity<Object> viewPizzas() {
		// System.out.println(store.getAddress());

		List<Pizza> response;
		try {
			response = pizzaService.findAllPizzas();
		} catch (Exception e) {
			return ResponseEntity.status(200).body(e.getMessage());
		}

		return ResponseEntity.status(200).body(response);
	}

}
