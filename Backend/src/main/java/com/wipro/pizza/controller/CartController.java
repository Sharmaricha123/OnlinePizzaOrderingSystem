package com.wipro.pizza.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.pizza.exception.UserNotFoundException;
import com.wipro.pizza.model.User;
import com.wipro.pizza.model.ViewCart;
import com.wipro.pizza.service.CartService;
import com.wipro.pizza.service.PizzaService;

@RestController
@RequestMapping("/pizza/app/home")

@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
	
	@Autowired
	HomeController homeController;
	
	@Autowired
	CartService cartService;
	
	
	@Autowired
	PizzaService pizzaService;
	
	@PostMapping("/cart/add/{pizzaId}")
	public ResponseEntity<String> addtoCart(@PathVariable int pizzaId){
		
		if(homeController.isUserAccess()) {
		User loggedInUser=homeController.getLoggedInUser();
		
		if(loggedInUser==null)
			throw new  UserNotFoundException("login");
		String response = cartService.addToCart(loggedInUser.getUserId(), pizzaId);
		return ResponseEntity.status(200).body(response);
		}
		return ResponseEntity.status(403).body("Access denied");
		
	}
	//view cart of user so sending  userId
	@GetMapping("/cart/view")
	public ResponseEntity<Object> viewCart(){
		//displays all cart items
		if(homeController.isUserAccess()) {
		List<ViewCart> response=new ArrayList<>();
		User loggedInUser=homeController.getLoggedInUser();
		response=cartService.viewCarts(loggedInUser.getUserId());
		
		return ResponseEntity.status(200).body(response);
		}
		return ResponseEntity.status(403).body("Access denied");
	}
	@RequestMapping("/cart/delete/{cartId}")
	public ResponseEntity<String> deleteCart(@PathVariable int cartId){
		if(homeController.isUserAccess()) {
		String response=cartService.removefromCart(cartId);
		return ResponseEntity.status(200).body(response);
		}
		return ResponseEntity.status(403).body("Access denied");
	}
	//modify is pending.....
	
//	@RequestMapping("/cart/modify/{userId}/{vcdId}/{noOfVcds}")
//	public ResponseEntity<String> modifyCart(@PathVariable int userId,@PathVariable int vcdId,@PathVariable int noOfVcds){
//		
//		String response=carktService.modifyCart(userId,vcdId,noOfVcds);
//		return ResponseEntity.status(200).body(response);
//	}

}
