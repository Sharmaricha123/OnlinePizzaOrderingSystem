package com.wipro.pizza.model;


public class CardDetails {


	private long creditCardNumber;

	private String validDate;

	private String cvv;
	
	public CardDetails() {
		super();
		// TODO Auto-generated constructor stub
	}

	public long getCreditCardNumber() {
		return creditCardNumber;
	}

	public void setCreditCardNumber(long creditCardNumber) {
		this.creditCardNumber = creditCardNumber;
	}

	public String getValidDate() {
		return validDate;
	}

	public void setValidDate(String validDate) {
		this.validDate = validDate;
	}

	public String getCvv() {
		return cvv;
	}

	public void setCvv(String cvv) {
		this.cvv = cvv;
	}

	@Override
	public String toString() {
		return "CardDetails [creditCardNumber=" + creditCardNumber + ", validDate=" + validDate + ", cvv=" + cvv + "]";
	}
	

}
