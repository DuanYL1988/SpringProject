package com.springboot.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.springboot.project.model.Hero;

@Repository
public interface HeroRepository {

    Hero selectOneById(@Param("id") String id);

    Hero selectOneByUniqueKey(@Param("titleName") String titleName, @Param("name") String name);

    List<Hero> selectByDto(Hero hero);

    List<Hero> customQuary(Hero hero);

}
