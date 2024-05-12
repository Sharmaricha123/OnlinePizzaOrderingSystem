package com.wipro.pizza.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.swing.text.View;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.pizza.exception.UserNotFoundException;
import com.wipro.pizza.model.Cart;
import com.wipro.pizza.model.User;
import com.wipro.pizza.model.Pizza;
import com.wipro.pizza.model.ViewCart;
import com.wipro.pizza.repository.CartRepository;

@Service
public class CartService {
	
	@Autowired
	CartRepository cartRepo;
	
	@Autowired
	UserService userService;
	
	@Autowired
	PizzaService pizzaService;
	//add try catch to handle if product not added or not modified...
	
//	public void createCart(int userId) {
//		Cart c=new Cart(userId);
//		cartRepo.save(c);
//	}
	
	
	public String addToCart(int userId,int pizzaId) {
		Optional<User> u=userService.findUser(userId);
		if(u.isEmpty())
			return "User doesn't exist!So register";
		Pizza pizza=pizzaService.findPizza(pizzaId).get();
			Optional<Cart> cart=cartRepo.findByUserAndPizzaAndStatus(u.get(), pizza,"not ordered");
			if(cart.isEmpty() || (cart.get().getStatus().equals("ordered")))
			{
				Cart c=new Cart();
				c.setUser(u.get());
				c.setPizza(pizza);	
				c.setStatus("not ordered");
				cartRepo.save(c);
				return "product added successfully to cart";
			}
			return "product already exists in cart";
	}
	
	public String removefromCart(int cartId) {
//		cartRepo.findById(cartId);
//		c.setVcd(vcdService.findVcd(vcdId).get());
		cartRepo.deleteById(cartId);
		return "product removed from cart";
	}
//	
//	public String modifyCart(int userId,Vcd newVcd) {
//		Cart c=cartRepo.findById(userId).get();
//		vcdService.updateVcd(newVcd.getVcdId(), newVcd);
//		
//		cartRepo.save(c);
//		return "product modified";
//	}
//	
	public List<ViewCart> viewCarts(int userId) {
		Optional<User> u=userService.findUser(userId);
		if(u.isEmpty())
			throw new UserNotFoundException("User not registerd");
		
		List<Cart> cartList=cartRepo.findAllByUser(u.get());
		List<ViewCart> viewCarts=new ArrayList<>();
		
		for(Cart c:cartList) {
			if(!(c.getStatus().equals("ordered"))) {
			ViewCart vc=new ViewCart();
			vc.setCartId(c.getCartId());
			vc.setPizza(pizzaService.findPizza(c.getPizza().getPizzaId()).get());
			vc.setUser(userService.findUser(userId).get());
			viewCarts.add(vc);
			}
		}
		System.out.println(cartList);
		System.out.println(viewCarts);
		return viewCarts;
	}

//	public String modifyCart(int userId, int vcdId, int noOfVcds) {
//		Optional<User> u=userService.findUser(userId);
//		Cart c=cartRepo.findByUser(u.get())	
//				   .get();
//		c.setNoOfVcds(noOfVcds);
//	
//		return null;
//	}
//	
//	
	public Optional<Cart> findCart(int cartId)
	{
		
		return cartRepo.findById(cartId);
	}

	public void saveCart(Cart cart) {
		cartRepo.save(cart);
		
	}
	
	public List<Cart> findByPizza(Pizza pizza){
		return cartRepo.findAllByPizza(pizza);
	}

}
