package com.springboot.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.springboot.project.dao.HeroDao;
import com.springboot.project.dao.HeroRepository;
import com.springboot.project.model.Hero;
import com.springboot.project.service.HeroService;

@Controller
@RequestMapping(value = "/hero")
public class HeroController {

    @Autowired
    HeroService heroService;

    @Autowired
    HeroDao heroDao;

    @Autowired
    HeroRepository heroRepository;

    /**
     * 初期表示
     */
    @RequestMapping(value = "index")
    public String goIndex(Model model) {
        Hero inDto = new Hero();
        List<Hero> resultList = heroRepository.selectByDto(inDto);
        model.addAttribute("resultList", resultList);
        return "hero/index";
    }

    /**
     * 检索
     */
    @RequestMapping(value = "search")
    public String doAjaxSearch(Model model, Hero hero) {
        List<Hero> resultList = heroRepository.selectByDto(hero);
        model.addAttribute("resultList", resultList);
        return "hero/index";
    }

    /**
     * AJAX检索
     */
    @RequestMapping(value = "ajaxSearch")
    @ResponseBody
    public Object doAjaxSearch(@RequestBody Hero hero) {
        List<Hero> resultList = heroRepository.selectByDto(hero);
        return resultList;
    }

    /**
     * 取得单条数据
     */
    @RequestMapping(value = "detail/{id}")
    public String getDetail(@PathVariable("id") String id, Model model) {
        Hero hero = heroDao.findById(id).get();
        model.addAttribute("detailObj", hero);
        return "hero/detail";
    }

    /**
     * Ajax更新
     */
    @RequestMapping(value = "regist/execute")
    @ResponseBody
    public String doAjaxRegist(Model model, Hero obj) {
        // 判断是更新还是新规

        heroDao.save(obj);
        return "update success!";
    }

}
