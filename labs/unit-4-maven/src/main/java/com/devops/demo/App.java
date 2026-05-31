package com.devops.demo;

public class App {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println("Maven Build Demo — Result of 10 + 5 = " + calc.add(10, 5));
    }
}
