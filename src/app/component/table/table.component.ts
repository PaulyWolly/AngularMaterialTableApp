//import { InputClearableExample } from './../input-clearable-example';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger} from '@angular/animations';


interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
    paginator!: MatPaginator;
  // MatPaginator Output
  // MatPaginator Output
    pageEvent!: PageEvent;
  pageSize = 3;
  pageSizeOptions: number[] = [3, 5, 7];
  countries: Country[] = [];
  expandedElement:any;
  value: string | undefined;

  displayedColumns: string[] = ['Flag', 'Name', 'Area', 'Population'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  @ViewChild(MatSort)
    sort!: MatSort;

  constructor(
      private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.getAllCountries();
  }

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
  }

  getAllCountries() {
    this.http.get<Country[]>('./assets/data/countries.json')
    .subscribe((data: any) => {
      //Is important
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  filterCountries(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    const filterValue = value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onMatSortChange() {
    this.dataSource.sort = this.sort;
  }

  clearValue() {
      this.value = '';
      this.getAllCountries();
  }
}