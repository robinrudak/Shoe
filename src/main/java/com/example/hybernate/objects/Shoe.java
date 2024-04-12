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
@Table(name = "shoe")
public class Shoe {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int shoeId;

     @Column(nullable = false, length = 45, unique = true, name = "shoe_name")
    private String shoeName;
     @Column
    private int shoeSize;
     @Column
    private String shoeBrand;
     @Column
     private String shoeGender;
     @Column
     private String shoeStyle;
     @Column String shoePhoto;

     public Shoe(String name, int size, String brand, String gender, String style, String photo) {
         shoeName = name;
         shoeSize = size;
         shoeBrand = brand;
         shoeGender = gender;
         shoeStyle = style;
         shoePhoto = photo;
     }


    public <E> Shoe(int id, String name, int size, String brand, String gender, String style, String photo, ArrayList<E> es) {
    }
}

