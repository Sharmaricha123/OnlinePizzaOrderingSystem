package com.wipro.pizza.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Store {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int storeId;
    
	private String name;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@OneToOne(cascade = CascadeType.PERSIST)
    private Address address;

	private long phoneNo;

	public Store() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getStoreId() {
		return storeId;
	}

	public void setStoreId(int storeId) {
		this.storeId = storeId;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public long getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(long phoneNo) {
		this.phoneNo = phoneNo;
	}
	
	

	public Store(int storeId, Address address, long phoneNo,String name) {
		super();
		this.storeId = storeId;
		this.address = address;
		this.phoneNo = phoneNo;
		this.name=name;
	}

	@Override
	public String toString() {
		return "Store [storeId=" + storeId + ", name=" + name + ", address=" + address + ", phoneNo=" + phoneNo + "]";
	}
	

}
