package com.example.hybernate.controllers;

import com.example.hybernate.objects.Shoe;
import com.example.hybernate.objects.User;
import com.example.hybernate.services.ShoeService;
import com.example.hybernate.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/user")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("allusers")
    public ArrayList<User> getAllUsers() {
        return userService.getAll();
    }

    @GetMapping("user")
    public ResponseEntity<User> getUserByName(String name){
        ArrayList<User> userArrayList = getAllUsers();
        for(User user : userArrayList) {
            if(user.getUserName().equals(name)) {
                User userFound = userService.getUser(user.getUserId());
                if (userFound != null) {
                    return ResponseEntity.status(200).body(userFound);
                }
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @PostMapping("user")
    public ResponseEntity<String> createUser(String name, int balance, String password){
        User user = new User(name, balance, password);
        boolean success = userService.createUser(user);

        if (success) {
            return ResponseEntity.status(201).body("Successfully created!");
        }
        return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failure to save.");
    }

    @PutMapping("user")
    public ResponseEntity<String> updateUser(int id, String name, int balance, String password) {
        User user = new User(id, name, balance, password, new ArrayList<>());
        boolean success = userService.updateUser(user);
        if (success) {
            return ResponseEntity.status(200).body("Successfully updated!");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failure to update.");
    }
    @DeleteMapping("user")
    public ResponseEntity<String> deleteUser(int id) {
        boolean success = userService.deleteUser(id);
        if (success) {
            return ResponseEntity.status(200).body("Successfully deleted!");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failure to delete.");
    }
}
