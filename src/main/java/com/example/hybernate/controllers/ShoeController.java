package com.example.hybernate.controllers;

import com.example.hybernate.objects.Shoe;
import com.example.hybernate.services.ShoeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class ShoeController {
    private ShoeService shoeService;

    @GetMapping("")
    public ArrayList<Shoe> getAllShoes() {
    return shoeService.getAll();
    }
    @GetMapping("shoe")
    public ResponseEntity<Shoe> getShoeById(int id){
        Shoe shoe = shoeService.getShoe(id);
        if (shoe != null) {
            return ResponseEntity.status(200).body(shoe);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    @PostMapping("shoe")
    public ResponseEntity<String> createShoe(String name, int size, String brand, String gender, String style, String photo){
        Shoe shoe = new Shoe(name, size, brand, gender, style, photo);
        boolean success = shoeService.createShoe(shoe);
        if (success) {
            return ResponseEntity.status(201).body("Successfully created!");
        }
        return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failure to save.");
    }
}
