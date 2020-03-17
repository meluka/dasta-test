import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';


import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder } from '@angular/forms';

export interface PeriodicElement {
  id: number;
  category: string;
  name: string;
  number: number;
  date: string;
  star: string;
}
interface TableFilter {
  category: string;
  name: string;
  number: number;
  date: string;
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  myForm: FormGroup;
  categories: string[] = ['book', 'animal', 'computer'];
  displayedColumns: string[] = ["select", 'category', 'name', 'number', 'date','star'];
  ELEMENT_DATA: PeriodicElement[] = [
    { id: 1, category: "book", name: "saba", number: 55522, date: "12/22/2020", star: "aaa" },
    { id: 2, category: "animal", name: "gio", number: 55511, date: "10/22/2020", star: "ss" },
    { id: 3, category: "book", name: "gio", number: 55511, date: "10/22/2020", star: "fff" },
    { id: 4, category: "computer", name: "levani", number: 33222, date: "11/22/2020", star: "ff" }
  ]

  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }


  applyFilter(event: Event) {
    let values: TableFilter = this.myForm.getRawValue();
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      let returnValue = data.category.toString().trim().toLowerCase().indexOf(values.category.toLowerCase()) !== -1 &&
        (data.name.toString().trim().toLowerCase().indexOf(values.name.toLowerCase()) !== -1) &&
        (data.number.toString().trim().toLowerCase().indexOf(values.number.toString().toLowerCase()) !== -1);
        
        if(values.date){
          returnValue = returnValue && (data.date.toString().trim().toLowerCase().indexOf(new Date(values.date).toLocaleDateString().toString().toLowerCase()) !== -1)
        }
        return returnValue;

    }
    this.dataSource.filter = JSON.stringify(values);

  }



  constructor(private fb: FormBuilder) {

    this.myForm = this.fb.group({
      category: [""],
      name: [""],
      number: [""],
      date: [""]

    })

  }

  check(){
    console.log(this.selection.selected);
  }

  ngOnInit() {
    console.log(this.dataSource.filteredData)
  }




}


