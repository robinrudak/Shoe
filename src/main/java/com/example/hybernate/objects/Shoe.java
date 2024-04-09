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
@Table(name = "shoe")
public class Shoe {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int shoeID;

     @Column(nullable = false, length = 45, unique = true, name = "shoe_name")
    private String shoeName;
     @Column
    private int shoeSize;
     @Column
    private int shoeYear;

     public Shoe(String name, int size, int year) {
         shoeName = name;
         shoeSize = size;
         shoeYear = year;
     }

    public String getShoeName() {
        return shoeName;
    }

    public void setShoeName(String shoeName) {
        this.shoeName = shoeName;
    }

    public int getShoeSize() {
        return shoeSize;
    }

    public void setShoeSize(int shoeSize) {
        this.shoeSize = shoeSize;
    }

    public int getShoeYear() {
        return shoeYear;
    }

    public void setShoeYear(int shoeYear) {
        this.shoeYear = shoeYear;
    }

    public int getShoeID() {
        return shoeID;
    }

    public void setShoeID(int shoeID) {
        this.shoeID = shoeID;
    }
}

