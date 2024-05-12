package com.wipro.pizza.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
@Entity
public class Pizza {


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int pizzaId;

	private String name;

	private String language;

	private String category;

	private float rating;

	private int quantity;

	private double cost;
	
	
	@ManyToOne
	@JoinColumn(name="store_id")
	private Store store;
	
	public Store getStore() {
		return store;
	}

	public void setStore(Store store) {
		this.store = store;
	}

	public Pizza() {
		super();
	}

	public int getPizzaId() {
		return pizzaId;
	}

	public void setPizzaId(int pizzaId) {
		this.pizzaId = pizzaId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public float getRating() {
		return rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getCost() {
		return cost;
	}

	public void setCost(double cost) {
		this.cost = cost;
	}
//
//	public List<Store> getStore() {
//		return stores;
//	}
//
//	public void setStore(List<Store> store) {
//		this.stores = store;
//	}

//	
//	
//	public Cart getCart() {
//		return cart;
//	}
//
//	public void setCart(Cart cart) {
//		this.cart = cart;
//	}

	@Override
	public String toString() {
		return "Pizza [pizzaId=" + pizzaId + ", name=" + name + ", language=" + language + ", category=" + category
				+ ", rating=" + rating + ", quantity=" + quantity + ", cost=" + cost  + "]";
	}

	
	
}
