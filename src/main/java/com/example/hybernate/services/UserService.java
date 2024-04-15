package com.example.hybernate.services;

import com.example.hybernate.objects.User;
import com.example.hybernate.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService {
    private UserRepository repo;

    public UserService(UserRepository userRepository) {
        repo = userRepository;
    }
    public boolean createUser(User user) {
        if (user.getUserName().length() > 45){
            return false;
        }
        User newUser = repo.save(user);
        user.setUserId(newUser.getUserId());
        System.out.println("Got id " + user.getUserId() + "!");
        return true;
    }
    public User getUser(int id) {
        if (repo.existsById(id)){
            return repo.findById(id).get();
        }
        return null;
    }

    public boolean deleteUser(int id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
    public boolean updateUser(User user){
        if (repo.existsById(user.getUserId())){
            repo.save(user);
            return true;
        }
        return false;
    }

    public ArrayList<User> getAll() {
        return (ArrayList<User>) repo.findAll();
    }
}
