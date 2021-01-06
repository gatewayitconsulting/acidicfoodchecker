import { Food } from '../models/food';

let id = 1;
let NAMES: string[] = [
    'Banana', 'Apple', 'Beef Jerky', 'Coffee', 'Bread', 'Salmon', 'Water', 'Almond Milk', 'Popcorn', 'Chobani Yogurt'
];
let name = NAMES[Math.round(Math.random() * (NAMES.length - 1))];
export const FOODS: Food[] = [
    { 
        id: id++,
        name: name,
        pHLevel: Math.round(Math.random() * 1),
        calories: Math.round(Math.random() * 500),
        totalFat: Math.round(Math.random() * 20),
        protein: Math.round(Math.random() * 20),
        totalCarbohydrate: Math.round(Math.random() * 20)
    },
];
