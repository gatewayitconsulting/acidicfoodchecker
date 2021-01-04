import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  pHLevel: string;
  calories: string;
  protein: string;
  totalCarbohydrate: string;
}

/** Constants used to fill up our data base. */
const PHLEVELS: string[] = [
  '1', '2', '3', '4', '5', '6', '7', '7.4', '1.5'
];
const NAMES: string[] = [
  'Banana', 'Apple', 'Beef Jerky', 'Coffee', 'Bread', 'Salmon', 'Water', 'Almond Milk', 'Popcorn', 'Chobani Yogurt'
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'pHLevel', 'calories', 'protein', 'totalCarbohydrate'];
  dataSource: MatTableDataSource<UserData>;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Create 100 items
    const items = Array.from({length: 20}, (_, k) => createNewItem(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(items);
  }

  ngAfterViewInit() {
    this.paginator.pageSize = 15;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new item. */
function createNewItem(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))];

  return {
    id: id.toString(),
    name: name,
    pHLevel: PHLEVELS[Math.round(Math.random() * (PHLEVELS.length - 1))],
    calories: Math.round(Math.random() * 20).toString(),
    protein: '',
    totalCarbohydrate: ''
  };
}
