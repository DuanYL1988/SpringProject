package com.springboot.project.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.project.dao.HeroDao;
import com.springboot.project.dao.HeroRepository;
import com.springboot.project.dto.Layout;
import com.springboot.project.model.Hero;
import com.springboot.project.service.HeroService;

@Service
public class HeroServiceImpl implements HeroService {

    @Autowired
    HeroDao heroDao;

    @Autowired
    HeroRepository heroRepository;

    @Override
    public List<Hero> getSearchList(Hero hero) {
        List<Hero> resultList = new ArrayList<Hero>();

        return resultList;
    }

    @Override
    public Map<String, List<Layout>> detailLayout(String id) {
        Hero hero = heroDao.findById(id).get();
        Map<String, List<Layout>> layout = new HashMap<>();
        List<Layout> baseInfo = new ArrayList<>();
        baseInfo.add(createCell("关联主表主键", "masterId", hero.getMasterId() + "", ""));
        baseInfo.add(createCell("称号UNIQUE", "titleName", hero.getTitleName() + "", ""));
        baseInfo.add(createCell("名UNIQUE", "name", hero.getName() + "", ""));
        baseInfo.add(createCell("昵称", "nickName", hero.getNickName() + "", ""));
        baseInfo.add(createCell("立绘图片文件夹名", "imgName", hero.getImgName() + "", ""));
        baseInfo.add(createCell("角色作品", "origin", hero.getOrigin() + "", ""));
        baseInfo.add(createCell("生命值", "hp", hero.getHp() + "", ""));
        baseInfo.add(createCell("攻击", "attact", hero.getAttact() + "", ""));
        baseInfo.add(createCell("速度", "speed", hero.getSpeed() + "", ""));
        baseInfo.add(createCell("防御", "def", hero.getDef() + "", ""));
        baseInfo.add(createCell("魔防", "mdf", hero.getMdf() + "", ""));
        baseInfo.add(createCell("武器名", "weapon", hero.getWeapon() + "", ""));
        baseInfo.add(createCell("A技能", "skillA", hero.getSkillA() + "", ""));
        baseInfo.add(createCell("B技能", "skillB", hero.getSkillB() + "", ""));
        baseInfo.add(createCell("C技能", "skillC", hero.getSkillC() + "", ""));
        baseInfo.add(createCell("圣印技能", "skillD", hero.getSkillD() + "", ""));
        baseInfo.add(createCell("支援技能", "skillS", hero.getSkillS() + "", ""));
        baseInfo.add(createCell("必杀技能", "skillE", hero.getSkillE() + "", ""));
        baseInfo.add(createCell("突破极限", "limitPlus", hero.getLimitPlus() + "", ""));
        baseInfo.add(createCell("神龙之花", "dragonFlower", hero.getDragonFlower() + "", ""));
        baseInfo.add(createCell("支援对象", "supportMate", hero.getSupportMate() + "", ""));
        baseInfo.add(createCell("祝福", "blessing", hero.getBlessing() + "", ""));
        baseInfo.add(createCell("兵种", "moveType", hero.getMoveType() + "", ""));
        baseInfo.add(createCell("武器类型", "weaponType", hero.getWeaponType() + "", ""));
        baseInfo.add(createCell("宝珠颜色", "color", hero.getColor() + "", ""));
        baseInfo.add(createCell("种族", "race", hero.getRace() + "", ""));
        baseInfo.add(createCell("英雄类型(连翼/传承)", "heroType", hero.getHeroType() + "", ""));
        baseInfo.add(createCell("队伍", "team", hero.getTeam() + "", ""));
        baseInfo.add(createCell("技能点", "skillPoint", hero.getSkillPoint() + "", ""));
        baseInfo.add(createCell("英雄点", "heroPoint", hero.getHeroPoint() + "", ""));
        baseInfo.add(createCell("特效标签", "specTag", hero.getSpecTag() + "", ""));
        baseInfo.add(createCell("卡池", "pool", hero.getPool() + "", ""));
        baseInfo.add(createCell("喜欢", "favorite", hero.getFavorite() + "", ""));
        baseInfo.add(createCell("评价等级", "rank", hero.getRank() + "", ""));
        baseInfo.add(createCell("登录日期", "createDatetime", hero.getCreateDatetime() + "", ""));
        baseInfo.add(createCell("更新日期", "updateDatetime", hero.getUpdateDatetime() + "", ""));
        layout.put("baseInfo", baseInfo);
        return layout;
    }

    private Layout createCell(String label, String name, String value, String type) {
        Layout layout = new Layout();
        layout.setLabel(label);
        layout.setName(name);
        layout.setValue(value);
        layout.setType(type);
        return layout;
    }

}
