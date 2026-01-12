import { describe, it, expect } from "vitest";
import { getLifeEvents } from "./lifeEvents";

describe("getLifeEvents", () => {
  it("should return correct milestones for a given birth year", () => {
    // Example: Born in 2000
    const birthYear = 2000;
    const events = getLifeEvents(birthYear);

    // 3 years old -> 2003
    const ev3 = events.find((e) => e.age === 3);
    expect(ev3).toBeDefined();
    expect(ev3?.year).toBe(2003);
    expect(ev3?.label).toBe("七五三");
    expect(ev3?.wareki).toBe("平成15年");

    // 20 years old -> 2020
    const ev20 = events.find((e) => e.age === 20);
    expect(ev20).toBeDefined();
    expect(ev20?.year).toBe(2020);
    expect(ev20?.label).toBe("成人");
    expect(ev20?.wareki).toBe("令和2年");

    // 60 years old -> 2060
    const ev60 = events.find((e) => e.age === 60);
    expect(ev60).toBeDefined();
    expect(ev60?.year).toBe(2060);
    expect(ev60?.label).toBe("還暦");
    // Assuming Reiwa continues
    expect(ev60?.wareki).toBe("令和42年");
  });

  it("should return milestones sorted by age", () => {
    const events = getLifeEvents(1990);
    let prevAge = 0;
    for (const event of events) {
      expect(event.age).toBeGreaterThan(prevAge);
      prevAge = event.age;
    }
  });

  it("should include all expected milestones", () => {
    const events = getLifeEvents(2024);
    const expectedAges = [3, 5, 7, 20, 60, 70, 77, 80, 88, 90, 99, 100];
    const actualAges = events.map((e) => e.age);
    expect(actualAges).toEqual(expectedAges);
  });
});
