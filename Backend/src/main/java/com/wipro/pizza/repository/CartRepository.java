package com.wipro.pizza.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wipro.pizza.model.Cart;
import com.wipro.pizza.model.User;
import com.wipro.pizza.model.Pizza;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer>{


	List<Cart> findAllByUser(User user);


	Optional<Cart> findByUserAndPizzaAndStatus(User user, Pizza pizza, String string);


	List<Cart> findAllByPizza(Pizza pizza);

	//Cart findByCartIdAndUser(int cartId, User user);

}
