package com.fag.cobrinha.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SnakeController {

    @GetMapping("/")
    public ModelAndView index(){
        ModelAndView mv  = new ModelAndView();
        mv.setViewName("home/index");
        return mv;
    }
}
