package com.wipro.pizza.model;



public class ViewCart {
	
	public int getCartId() {
		return cartId;
	}

	public void setCartId(int cartId) {
		this.cartId = cartId;
	}

	private int cartId;
	
	private Pizza pizza;
	
	private User user;

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

	public ViewCart() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "ViewCart [cartId=" + cartId + ", pizza=" + pizza + ", user=" + user + "]";
	}

	
	

}
