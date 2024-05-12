package com.wipro.pizza.model;

import java.util.List;
import java.util.Map;

public class RequestData {
	
	
	private Map<String,List<Integer>> data;

	public Map<String, List<Integer>> getData() {
		return data;
	}

	public void setData(Map<String, List<Integer>> data) {
		this.data = data;
	}

	public RequestData() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
