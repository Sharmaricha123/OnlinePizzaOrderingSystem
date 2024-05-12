package com.wipro.pizza.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class PurchaseOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;
    
	private LocalDate orderDate;
    // Other order properties

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    private double totalCost;
    
    private String status;
    
    
    @OneToMany
    private List<Cart> cartItems = new ArrayList<>();

    
    
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public double getTotalCost() {
		return totalCost;
	}

	public void setTotalCost(double totalCost) {
		this.totalCost = totalCost;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Cart> getCartItems() {
		return cartItems;
	}

	public void setCartItems(List<Cart> cartItems) {
		this.cartItems = cartItems;
	}

    public LocalDate getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDate date) {
		this.orderDate = date;
	}

	public PurchaseOrder() {
		super();
	}

	@Override
	public String toString() {
		return "PurchaseOrder [orderId=" + orderId + ", orderDate=" + orderDate + ", user=" + user + ", totalCost="
				+ totalCost + ", status=" + status + ", cartItems=" + cartItems + "]";
	}
	
	
    
}
