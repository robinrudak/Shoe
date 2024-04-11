package com.example.hybernate;

import application.AddShoeForm;
import application.SetupUI;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.swing.*;

@SpringBootApplication
public class HybernateApplication {

	public static void main(String[] args) {
		SpringApplication.run(HybernateApplication.class, args);
		SetupUI setupUI = new SetupUI();
	}


}
