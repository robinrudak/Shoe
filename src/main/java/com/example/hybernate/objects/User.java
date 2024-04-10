package com.example.hybernate.objects;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int shoeId;

    @Column(nullable = false, length = 45, unique = true, name = "User_name")
    private String userName;
    @Column(name = "User_Balance")
    private int userBalance;
    @Column(name = "User_Password")
    private String userPassword;


    public User(String name, int balance, String password) {
        userName = name;
        userBalance = balance;
        userPassword = password;

    }


}

