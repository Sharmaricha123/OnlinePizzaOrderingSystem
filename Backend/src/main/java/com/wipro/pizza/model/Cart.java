package com.wipro.pizza.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Cart {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int cartId;
	
	@ManyToOne
	@JoinColumn(name = "pizza_id")
	private Pizza pizza;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	private String status;
	
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getCartId() {
		return cartId;
	}

	public void setCartId(int cartId) {
		this.cartId = cartId;
	}

	public Pizza getPizza() {
		return pizza;
	}

	public void setPizza(Pizza pizza) {
		this.pizza = pizza;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Cart() {
		super();
	}

	@Override
	public String toString() {
		return "Cart [cartId=" + cartId + ", pizza=" + pizza + ", user=" + user + ", status=" + status + "]";
	}

	
//	
//	public int getNoOfVcds() {
//		return noOfVcds;
//	}
//
//	public void setNoOfVcds(int noOfVcds) {
//		this.noOfVcds = noOfVcds;
//	}

	
	
	

}
