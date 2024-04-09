package com.example.hybernate.repositories;

import com.example.hybernate.objects.Shoe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoeRepository extends JpaRepository<Shoe, Integer> {
    Shoe findByName(String name);
    boolean existsByName(String name);

}


