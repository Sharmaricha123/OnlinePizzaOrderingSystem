package com.wipro.pizza.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
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

import com.wipro.pizza.model.CardDetails;
import com.wipro.pizza.model.Login;
import com.wipro.pizza.model.Payment;
import com.wipro.pizza.model.PurchaseOrder;
import com.wipro.pizza.model.User;
import com.wipro.pizza.model.Pizza;
import com.wipro.pizza.repository.PaymentRepository;
import com.wipro.pizza.service.PaymentService;
import com.wipro.pizza.service.PurchaseOrderService;
import com.wipro.pizza.service.StoreService;
import com.wipro.pizza.service.UserService;
import com.wipro.pizza.service.PizzaService;

@RestController
@RequestMapping("/pizza/app")
@CrossOrigin(origins = "http://localhost:3000")

public class HomeController {

	@Autowired
	PurchaseOrderService purchaseService;

	@Autowired
	UserService userService;

	@Autowired
	StoreService storeService;
	
	
	@Autowired
	PaymentService paymentService;
	
	
	@Autowired
	PizzaService pizzaService;

	private User loggedInUser;

	private boolean adminAccess;

	private boolean userAccess;

	public boolean isUserAccess() {
		return userAccess;
	}

	public void setUserAccess(boolean userAccess) {
		this.userAccess = userAccess;
	}

	public User getLoggedInUser() {
		return loggedInUser;
	}

	public void setLoggedInUser(User loggedInUser) {
		this.loggedInUser = loggedInUser;
	}

	public boolean getAdminAccess() {
		return adminAccess;
	}

	public void setAdminAccess(boolean adminAccess) {
		this.adminAccess = adminAccess;
	}

	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody User u) {
		String response = userService.save(u);
		return ResponseEntity.status(200).body(response);
	}

	@PostMapping({ "/login", "/admin/login" })
	public ResponseEntity<String> loginUser(@RequestBody Login login) {
		String response = "";
		String email = login.getEmailId();
		String password = login.getPassword();
		if (email.equals("admin@wipro.pizzastore.com")) {
			if (password.equals("12345678")) {
				adminAccess = true;
				return ResponseEntity.status(200).body("Admin Login Success");
			}

			else
				return ResponseEntity.status(200).body("Invlaid Login Credentials");
		} else {
			try {
				response = userService.validateUser(email, password);
				System.out.println(userService.findUserByEmail(email));
				loggedInUser = userService.findUserByEmail(email);
				userAccess=true;
			} catch (Exception usrnotfound) {
				return ResponseEntity.status(200).body(usrnotfound.getMessage());
			}

			return ResponseEntity.status(200).body(response);
		}
	}

	@GetMapping("/logout")
	public void logoutUser() {
		loggedInUser = null;
		userAccess=false;
		adminAccess=false;
	}

//	@GetMapping("/home/getUser")
//	public ResponseEntity<Object> loggedInUser() {
//		User response;
//		try {
//		   response=loggedInUser;
//		} catch (Exception usrnotfound) {
//			return ResponseEntity.status(200).body(usrnotfound.getMessage());
//		}
//
//		return ResponseEntity.status(200).body(response);
//	}
	// user can see the vcds even if he is not logged in
	@GetMapping("/home/view/allpizzas/{search}")
	public ResponseEntity<Object> viewPizzas(@PathVariable String search) {
		// System.out.println(store.getAddress());
		
		List<Pizza> response;
		System.out.println(search);
		try {
			if(search.equals("undefined")) {
			response = pizzaService.findAllPizzas();
			}
			else
				response=pizzaService.findAllByName(search);
		} catch (Exception e) {
			return ResponseEntity.status(200).body(e.getMessage());
		}

		return ResponseEntity.status(200).body(response);
		}
	

	@PostMapping("/home/place-order")
	public ResponseEntity<String> placeOrder(@RequestBody LinkedHashMap object) throws Exception {
		if(userAccess) {
		int userId = loggedInUser.getUserId();
		// System.out.println(object.get("cartIds").getClass());
		ArrayList<Integer> cartIds = (ArrayList<Integer>) object.get("cartIds");
		PurchaseOrder purchaseOrder = null;
		try {
			purchaseOrder = purchaseService.placeOrder(userId, cartIds);
			return ResponseEntity.status(200).body( purchaseOrder.getOrderId()+"");

		} catch (Exception e) {
			return  ResponseEntity.status(200).body(e.getMessage());
		}}
		return ResponseEntity.status(403).body("Access denied");

	}

	@GetMapping("/home/cancel-order/{orderId}")
	public ResponseEntity<String> cancelOrder(@PathVariable String orderId) {
		if(userAccess) {
		try {
			return ResponseEntity.status(200).body( purchaseService.cancelOrder(Integer.parseInt(orderId)));

		} catch (Exception e) {
			return ResponseEntity.status(200).body(e.getMessage());
		}
		}
		return ResponseEntity.status(403).body("Access denied");

	}

	@GetMapping("home/order/{orderId}")
	public PurchaseOrder getOrder(@PathVariable String orderId) {	
		int orderid=Integer.parseInt(orderId);
		//System.out.println(purchaseService.findOrderById(orderid));
		return purchaseService.findOrderById(orderid);
	}
	
	@PostMapping("home/order/{orderId}/pay")
	public Payment payNow(@PathVariable int orderId, @RequestBody CardDetails  cardDetails) {	
		
		System.out.println(cardDetails);
		
	    PurchaseOrder purchaseOrder=purchaseService.findOrderById(orderId);
	    System.out.println(purchaseOrder.getTotalCost()+"dubehw");
		Payment payment=new Payment();
		
		String card="XXXX-XXXX-XXXX-"+(cardDetails.getCreditCardNumber()%1000);
		
		payment.setCardNumber(card);
		payment.setPurchaseOrder(purchaseOrder);
		
		payment.setStatus("paid");
		
		payment.setAmount(purchaseOrder.getTotalCost());
		
		return paymentService.makePayment(payment);
		
		}
	

}
