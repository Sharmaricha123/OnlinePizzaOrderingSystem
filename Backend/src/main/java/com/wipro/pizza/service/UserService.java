package com.wipro.pizza.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.pizza.exception.UserNotFoundException;
import com.wipro.pizza.model.User;
import com.wipro.pizza.repository.UserRepository;


@Service
public class UserService {
	
	@Autowired
	UserRepository urepo;
	
	public String save(User u) {
		
		Optional<User> org=urepo.findByEmailId(u.getEmailId());
		if(org.isEmpty())
			{
				urepo.save(u);
				return "User registered successfully";
			}
		return "already";
	}

	public String validateUser(String emailId, String password) throws Exception {
		Optional<User> org=urepo.findByEmailId(emailId);
		if(org.isEmpty())
			{
				throw new UserNotFoundException("User does not exists");
			}
		if(org.get().getPassword().equals(password))
			return "User Login success";
		return "Invalid Login Credentials";
		
	}
	
	public Optional<User> findUser(int userId){
		return urepo.findById(userId);
	}

	public User findUserByEmail(String emailId) {
		return urepo.findByEmailId(emailId).get();
	}

}
