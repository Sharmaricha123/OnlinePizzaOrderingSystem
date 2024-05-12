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

import com.wipro.pizza.model.Login;
import com.wipro.pizza.model.Store;
import com.wipro.pizza.model.User;
import com.wipro.pizza.service.StoreService;
import com.wipro.pizza.service.UserService;
import com.wipro.pizza.service.PizzaService;
import com.wipro.pizza.model.Pizza;

@RestController
@RequestMapping("/pizza/app")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminStoreController {

	@Autowired
	UserService userService;

	@Autowired
	StoreService storeService;

	@Autowired
	PizzaService pizzaService;

	@Autowired
	HomeController homeController;

	@PostMapping("/admin/add/store")
	public ResponseEntity<String> addStore(@RequestBody Store store) {
		// System.out.println(store.getAddress());
		System.out.println(store.toString());
		if (homeController.getAdminAccess()) {

			String response = "";
			try {
				response = storeService.saveStore(store);
			} catch (Exception e) {
				return ResponseEntity.status(200).body(e.getMessage());
			}

			return ResponseEntity.status(200).body(response);
		}
		return ResponseEntity.status(403).body("Access denied");
	}

	@PostMapping("/admin/update/store/{id}")
	public ResponseEntity<String> updateStore(@PathVariable int id, @RequestBody Store store) {
		System.out.println(store.toString());
		if (homeController.getAdminAccess()) {
		String response = "";
		try {
			response = storeService.updateStore(id, store);
		} catch (Exception e) {
			return ResponseEntity.status(200).body(e.getMessage());
		}

		return ResponseEntity.status(200).body(response);
		}
		return ResponseEntity.status(403).body("Access denied");
	}

	@GetMapping("/admin/delete/store/{id}")
	public ResponseEntity<String> deleteStore(@PathVariable int id) {
		// System.out.println(store.getAddress());
		if (homeController.getAdminAccess()) {
		List<Pizza> pizzas = pizzaService.findAllPizzasfromStore(id);
		for (Pizza pizza : pizzas)
			pizzaService.deletePizza(pizza.getPizzaId());
		String response = "";
		try {
			response = storeService.deleteStore(id);
		} catch (Exception e) {
			return ResponseEntity.status(200).body(e.getMessage());
		}

		return ResponseEntity.status(200).body(response);}
		return ResponseEntity.status(403).body("Access denied");
		
	}

	@GetMapping("/admin/view/store/{id}")
	public ResponseEntity<Object> viewStore(@PathVariable int id) {
		// System.out.println(store.getAddress());
		if (homeController.getAdminAccess()) {
		Store response;
		try {
			response = storeService.findStore(id).get();
		} catch (Exception e) {
			return ResponseEntity.status(200).body(e.getMessage());
		}

		return ResponseEntity.status(200).body(response);
		}
		return ResponseEntity.status(403).body("Access denied");
	}

//	@GetMapping("/admin/view/stores")
//	public ResponseEntity<Object> viewStores() {
//		// System.out.println(store.getAddress());
//		if (homeController.getAdminAccess()) {
//		Object response;
//		try {
//			response = storeService.findAllStores();
//
//		} catch (Exception e) {
//			return ResponseEntity.status(200).body(e.getMessage());
//		}
//
//		return ResponseEntity.status(200).body(response);}
//		return ResponseEntity.status(403).body("Access denied");
//	}
	@GetMapping("/admin/view/stores/{search}")
	public ResponseEntity<Object> viewStoresBySearchKeyword(@PathVariable String search) {
		// System.out.println(store.getAddress());
		if (homeController.getAdminAccess()) {
		Object response;
		try {
			if(search.equals("undefined"))
				response = storeService.findAllStores();
			else
			response = storeService.findStoresByKeyword(search);

		} catch (Exception e) {
			return ResponseEntity.status(200).body(e.getMessage());
		}

		return ResponseEntity.status(200).body(response);}
		return ResponseEntity.status(403).body("Access denied");
	}

}
