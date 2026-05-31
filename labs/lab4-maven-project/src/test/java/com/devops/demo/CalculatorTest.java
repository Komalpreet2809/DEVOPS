package com.devops.demo;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    @Test
    void testAddition() {
        assertEquals(12, new Calculator().add(7, 5));
    }

    @Test
    void testSubtraction() {
        assertEquals(3, new Calculator().subtract(8, 5));
    }
}
