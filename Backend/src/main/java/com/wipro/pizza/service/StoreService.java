package com.wipro.pizza.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.pizza.model.Store;
import com.wipro.pizza.model.Pizza;
import com.wipro.pizza.repository.AddressRepository;
import com.wipro.pizza.repository.StoreRepository;

@Service
public class StoreService {
	
	@Autowired
	StoreRepository storeRepo;
	
	@Autowired
	AddressRepository addressRepo;
	
	public String saveStore(Store s) {
		
		//we don't enter id
		Optional<Store> org=storeRepo.findByName(s.getName());
		if(org.isEmpty())
			{
				addressRepo.save(s.getAddress());
				storeRepo.save(s);
				return "store added successfully";
			}
		return "store already exists";
	}
	
	public String updateStore(int id,Store s) {
		
		Optional<Store> org=findStore(id);
		if(org.isEmpty())
			{
			  return "store not found";
			}
     	Store newStore=org.get();
	
		if(!newStore.getAddress().equals(s.getAddress()) && s.getAddress()!=null)
			newStore.setAddress(s.getAddress());
		if(!(newStore.getPhoneNo()==s.getPhoneNo()) && s.getPhoneNo()!=0)
			newStore.setPhoneNo(s.getPhoneNo());
		if(!newStore.getName().equals(s.getName()) && s.getName()!=null)
			newStore.setName(s.getName());
//		
		//s.setStoreId(org.get().getStoreId());
		addressRepo.save(newStore.getAddress());
		storeRepo.save(newStore);
		return "store updated successfully";
		
	}
	public String deleteStore(int id) {
		
		Optional<Store> org=findStore(id);
		
		if(org.isEmpty())
			{
			  return "store not found exception";
			}
		storeRepo.deleteById(id);
		return "store deleted successfully";
		
	}
	public Optional<Store> findStore(int id) {
		
		
		Optional<Store> org=storeRepo.findById(id);
		
		return org;
		
	}
	public List<Store> findAllStores() {
		
		List<Store> org=storeRepo.findAll();
		
		return org;
		
	}

	public List<Store> findStoresByKeyword(String search) {
		
		return storeRepo.findAllByNameContaining(search);
	}
	
	

}
