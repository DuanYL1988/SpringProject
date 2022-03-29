package com.springboot.project.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.springboot.project.model.Hero;

@Repository
public interface HeroDao extends CrudRepository<Hero, String> {

}
