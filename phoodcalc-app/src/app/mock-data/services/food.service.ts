import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Food } from '../models/food';
import { FOODS } from './food';

@Injectable({ providedIn: 'root' })
export class FoodService {

  constructor() { }

  getFoods(): Observable<Food[]> {
    return of(FOODS);
  }

  getFood(id: number): Observable<Food> {
    return of(FOODS.find(food => food.id === id));
  }
}
