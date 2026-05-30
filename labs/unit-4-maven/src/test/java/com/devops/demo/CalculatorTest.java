package com.devops.demo;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    @Test
    void addsNumbers() {
        assertEquals(15, new Calculator().add(10, 5));
    }

    @Test
    void subtractsNumbers() {
        assertEquals(5, new Calculator().subtract(10, 5));
    }
}
