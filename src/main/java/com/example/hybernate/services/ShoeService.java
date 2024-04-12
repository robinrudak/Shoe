package com.example.hybernate.services;

import com.example.hybernate.objects.Shoe;
import com.example.hybernate.repositories.ShoeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ShoeService {
    @Autowired
    private ShoeRepository repo;

    public ShoeService(ShoeRepository shoeRepository) {
        repo = shoeRepository;
    }
    public boolean createShoe(Shoe shoe) {
        if (shoe.getShoeName().length() > 45){
            return false;
        }
        Shoe newShoe = repo.save(shoe);
        shoe.setShoeId(newShoe.getShoeId());
        System.out.println("Got id " + shoe.getShoeId() + "!");
        return true;
    }
    public Shoe getShoe(int id) {
        if (repo.existsById(id)){
            return repo.findById(id).get();
        }
        return null;
    }

    public boolean deleteShoe(int id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
    public boolean updateShoe(Shoe shoe){
        if (repo.existsById(shoe.getShoeId())){
            repo.save(shoe);
            return true;
        }
        return false;
    }

    public ArrayList<Shoe> getAll() {
        return (ArrayList<Shoe>) repo.findAll();
    }

    // Changes Linus
    public Shoe getShoeByName(String shoeName) {
        return repo.findByShoeName(shoeName);
    }

    public String checkShoeData(Shoe shoe, boolean post){
        try {
            if (post && repo.existsById(shoe.getShoeID())) {
                return "ID already exists";
            }
        }
        catch (Exception e) {
            // id is null
        }
        if (post && repo.existsByShoeName(shoe.getShoeName())) {
            return "Name already exists.";
        }
        try {
            if (!post && !repo.existsById(shoe.getShoeID())) {
                return "There is no such shoe.";
            }
        }
        catch (Exception e) {
            return "You did not give an id.";
        }
        if (shoe.getShoeName().length() > 45) {
            return "Name too long.";
        }
        if (shoe.getShoeName() == null) {
            return "Name required";
        }
        return "Accepted";
    }
}
