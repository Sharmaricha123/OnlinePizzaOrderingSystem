package com.wipro.pizza.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.pizza.model.Cart;
import com.wipro.pizza.model.PurchaseOrder;
import com.wipro.pizza.model.User;
import com.wipro.pizza.model.Pizza;
import com.wipro.pizza.repository.PurchaseOrderRepository;


@Service
public class PurchaseOrderService {
	
	@Autowired
	PurchaseOrderRepository purchaseOrderRepo;
	
	@Autowired
	UserService userService;
	
	@Autowired
	CartService cartService;
	
	@Autowired
	PizzaService pizzaService;
	
	public PurchaseOrder placeOrder(int userId,List<Integer> cartIds) throws Exception {
		System.out.println(cartIds);
		double total=0;
		List<Cart> cartList=new ArrayList<>();
		
		for(int i:cartIds) {
			//use modify cart
			
			Cart cart=cartService.findCart(i).get();
			cart.setStatus("ordered");
			cartService.saveCart(cart);
			cartList.add(cartService.findCart(i).get());
			total+=cart.getPizza().getCost();
			
		}
		PurchaseOrder purchase=new PurchaseOrder();
		purchase.setCartItems(cartList);
		LocalDate date=java.time.LocalDate.now();
		purchase.setOrderDate(date);
		User u=userService.findUser(userId).get();
		purchase.setUser(u);
		purchase.setStatus("order-placed");
		purchase.setTotalCost(total);
		return purchaseOrderRepo.save(purchase);
		
	}
	
	public String cancelOrder(int orderId) {
		PurchaseOrder purchase=findOrderById(orderId);
		List<Cart> cartList=purchase.getCartItems();
		for(Cart cart:cartList) {
			cart.setStatus("not ordered");
			cartService.saveCart(cart);
		}
		purchase.setStatus("cancelled");
		return "cancelled";
	}
	
	public PurchaseOrder findOrderById(int orderId) {
   
		return purchaseOrderRepo.findById(orderId).get();
		
	}

}
