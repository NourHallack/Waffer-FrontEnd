import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators'
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  myControl = new FormControl('');
  options: string[] = ["Vacuum Cleaner",
                        "Stick Vacuum Cleaner",
                        "Cordless Vacuum Cleaner",
                        "Bagless Vacuum Cleaner",
                        "Barrel Vacuum",
                        "Canister Cleaner",
                        "Upright Cleaner",
                        "Robot Cleaner",
                        "Refrigerator",
                        "4 Door Refrigerator",
                        "Television",
                        "Hair Dryer",
                        "Washer",
                        "iPhone 13 mini ",
                        "iPhone 13",
                        "iPhone 13 pro",
                        "iPhone 13 Pro Max",
                        "Samsung Galaxy"
  ];
  filteredOptions: Observable<string[]> | undefined;

  sortByOptions = [{ value: "name", icon: "badge", display: "Sort By Name" },
  { value: "price", icon: "payments", display: "Sort By Price" },
  { value: "date", icon: "schedule", display: "Sort By Date" },];



  @Output() searchPlanEvent = new EventEmitter<string>();

  order: String = "acs";
  type: String = "name";


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  changeSortOrder() {
    this.order == "acs" ? this.order = "desc" : this.order = "acs";
  }

  changeSortType(newType: String) {
    this.type = newType;
    console.log(this.type);
  }

  search() {
    this.api.doSearch(this.myControl.value, this.type + "_" + this.order).subscribe(res => { this.searchPlanEvent.emit(res); console.log(res) });

  }

}
