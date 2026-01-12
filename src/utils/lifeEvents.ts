import { getEra } from "./era";

export type LifeEvent = {
  age: number;
  label: string;
  year: number;
  wareki: string;
};

const MILESTONES = [
  { age: 3, label: "七五三" },
  { age: 5, label: "七五三" },
  { age: 7, label: "七五三" },
  { age: 20, label: "成人" },
  { age: 60, label: "還暦" },
  { age: 70, label: "古希" },
  { age: 77, label: "喜寿" },
  { age: 80, label: "傘寿" },
  { age: 88, label: "米寿" },
  { age: 90, label: "卒寿" },
  { age: 99, label: "白寿" },
  { age: 100, label: "百寿" },
];

export const getLifeEvents = (birthYear: number): LifeEvent[] => {
  return MILESTONES.map((milestone) => {
    const year = birthYear + milestone.age;
    const wareki = getEra(year);
    return {
      age: milestone.age,
      label: milestone.label,
      year,
      wareki,
    };
  }).sort((a, b) => a.age - b.age);
};
