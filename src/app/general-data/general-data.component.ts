import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
const COUNTRIES = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754,
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199,
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463,
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397,
  },
];

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.css'],
})
export class GeneralDataComponent {
  countries = COUNTRIES;
  showFilter = true;
  tableFields = [];
  tableData = [];
  start_date = '2010-01-01';
  end_date = '2023-01-01';
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  renderValue = (val: string) => {
    if (Number(val)) {
      return Math.round(Number(val));
    } else return val;
  };
  toggleShowFilter = () => {
    this.showFilter = !this.showFilter;
  };
  fetchBigMacData = () => {
    var requestOptions = {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };

    fetch(
      `http://localhost:3000/getbigmacdata?startdate=${this.start_date}&enddate=${this.end_date}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.tableFields = result?.dataset?.column_names ?? [];
        this.tableData = result?.dataset?.data ?? [];
      })
      .catch((error) => console.log('errorrr', error));
  };
  constructor() {
    this.fetchBigMacData();
  }
}
