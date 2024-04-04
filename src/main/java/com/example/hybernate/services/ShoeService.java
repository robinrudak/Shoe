package com.example.hybernate.services;

import com.example.hybernate.objects.Shoe;
import com.example.hybernate.repositories.ShoeRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ShoeService {
    private ShoeRepository repo;

    public ShoeService(ShoeRepository shoeRepository) {
        repo = shoeRepository;
    }
    public boolean createShoe(Shoe shoe) {
        if (shoe.getShoeName().length() > 45){
            return false;
        }
        Shoe newShoe = repo.save(shoe);
        shoe.setShoeID(newShoe.getShoeID());
        System.out.println("Got id " + shoe.getShoeID() + "!");
        return true;
    }
    public Shoe getShoe(int id) {
        if (repo.existsById(id)){
            return repo.findById(id).get();
        }
        return null;
    }

    public boolean updateShoe(Shoe shoe){
        if (repo.existsById(shoe.getShoeID())){
            repo.save(shoe);
            return true;
        }
        return false;
    }

    public ArrayList<Shoe> getAll() {
        return (ArrayList<Shoe>) repo.findAll();
    }
}
