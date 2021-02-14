import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Food } from '../../mock-data/models/food';
import { FoodService } from '../../mock-data/services/food.service';


export interface ItemData {
  id: string;
  name: string;
  pHLevel: number;
  calories: number;
  totalFat: number;
  protein: number;
  totalCarbohydrate: number;
}

/** Constants used to fill up our data base. */
const PHLEVELS: number[] = [
  1, 2, 3, 4, 5, 6, 7, 7.4, 1.5
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
  displayedColumns: string[] = ['select', 'id', 'name', 'pHLevel', 'calories', 'totalFat', 'protein', 'totalCarbohydrate'];
  dataSource: MatTableDataSource<ItemData>;
  food: Food[];
  selection = new SelectionModel<ItemData>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
      private foodService: FoodService,
      public dialog: MatDialog
    ) {
    // Create 100 items
    const items = Array.from({length: 5}, (_, k) => createNewItem(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(items);
  }

  // ngOnInit() {
  //   this.getFoods();
  // }

  ngAfterViewInit() {
    this.paginator.pageSize = 15;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // getFoods(): void {
  //   this.foodService.getFoods()
  //   .subscribe(food => this.food = food);
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addFood() {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: 'panda'
      }
    });
  }

  removeFood() {
    console.log("Food removed.");
  }

  calculate() {
    const pHSum = this.dataSource.data.map(food => food.pHLevel).reduce((acc, value) => acc + value, 0);
    let pHTotal = pHSum/this.dataSource.data.map(food => food.pHLevel).length;
    console.log("Total PH: " + pHTotal);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ItemData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}

/** Builds and returns a new item. */
function createNewItem(id: number): ItemData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))];

  return {
    id: id.toString(),
    name: name,
    pHLevel: PHLEVELS[Math.round(Math.random() * (PHLEVELS.length - 1))],
    calories: Math.round(Math.random() * 500),
    totalFat: Math.round(Math.random() * 20),
    protein: Math.round(Math.random() * 20),
    totalCarbohydrate: Math.round(Math.random() * 20)
  };
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'add-food.html'
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) private foodService: FoodService) {}
}