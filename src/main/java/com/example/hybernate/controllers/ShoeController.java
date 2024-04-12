package com.example.hybernate.controllers;

import com.example.hybernate.objects.Shoe;
import com.example.hybernate.services.ShoeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class ShoeController {
    private ShoeService shoeService;

    @GetMapping("allshoes")
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
    @PutMapping("shoe")
    public ResponseEntity<String> updateStudent(int id, String name, int size, String brand, String gender, String style, String photo) {
        Shoe shoe = new Shoe(id, name, size, brand, gender, style, photo, new ArrayList<>());
        boolean success = shoeService.updateShoe(shoe);
        if (success) {
            return ResponseEntity.status(200).body("Successfully updated!");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failure to update.");
    }
    @DeleteMapping("shoe")
    public ResponseEntity<String> deleteShoe(int id) {
        boolean success = shoeService.deleteShoe(id);
        if (success) {
            return ResponseEntity.status(200).body("Successfully deleted!");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failure to delete.");
    }

}
