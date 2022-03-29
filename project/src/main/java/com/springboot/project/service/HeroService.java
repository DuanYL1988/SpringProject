package com.springboot.project.service;

import java.util.List;
import java.util.Map;

import com.springboot.project.dto.Layout;
import com.springboot.project.model.Hero;

public interface HeroService {

    List<Hero> getSearchList(Hero hero);

    Map<String, List<Layout>> detailLayout(String id);

}
