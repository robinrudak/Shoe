package com.example.hybernate.objects;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

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


    public <E> User(int id, String name, int balance, String password, ArrayList<E> es) {
        this.userId = id;
        this.userName = name;
        this.userBalance = balance;
        this.userPassword = password;
    }
}

