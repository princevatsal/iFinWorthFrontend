import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.css'],
})
export class GeneralDataComponent {
  generateFormattedDate = (currentDate: any) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };
  showFilter = true;
  currTable = 'bigMacIndex';
  bigMacDataFields = [];
  bigMacData = [];
  worldBankDataFields = [];
  worldBankData = [];
  range = new FormGroup({
    start: new FormControl<Date>(new Date('2001-01-01')),
    end: new FormControl<Date>(new Date()),
  });
  countries = [
    { code: 'XKX', checked: true },
    { code: 'WLD', checked: true },
    { code: 'UMC', checked: true },
  ];
  showCountriesToFilter() {
    return this.countries.filter((country) =>
      this.worldBankData.find((item) => item[1] == country.code)
    );
  }
  getCountryName(id: string) {
    return this.worldBankData.find((item) => item[1] == id)?.[2] ?? ' ';
  }
  getCountryCodes() {
    return this.countries
      .filter((item) => item.checked)
      .map((item) => item.code)
      .join(',');
  }
  applyFilterBigMac() {
    this.bigMacData = [];
    this.fetchBigMacData();
  }
  clearFilterBigMac() {
    this.bigMacData = [];
    this.range = new FormGroup({
      start: new FormControl<Date>(new Date('2001-01-01')),
      end: new FormControl<Date>(new Date()),
    });
    this.fetchBigMacData();
  }
  clearFilterWorldBank() {
    this.worldBankData = [];
    this.countries = [
      { code: 'XKX', checked: true },
      { code: 'WLD', checked: true },
      { code: 'UMC', checked: true },
    ];
    this.fetchWorldBankData();
  }
  applyFilterWorldBank() {
    this.worldBankData = [];
    this.fetchWorldBankData();
  }
  getSeriesIds() {
    return [...new Set(this.worldBankData.map((item) => item[0]))];
  }
  showFilterCol(tableName: string) {
    return tableName === this.currTable;
  }
  setCurrTable = (tableName: string) => {
    this.currTable = tableName;
  };
  getDataFields = () => {
    return this.currTable == 'bigMacIndex'
      ? this.bigMacDataFields
      : this.worldBankDataFields;
  };
  getData = () => {
    return this.currTable == 'bigMacIndex'
      ? this.bigMacData
      : this.worldBankData;
  };
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
      `http://localhost:3000/getbigmacdata?startdate=${this.generateFormattedDate(
        this.range.value.start
      )}&enddate=${this.generateFormattedDate(this.range.value.end)}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.bigMacDataFields = result?.dataset?.column_names ?? [];
        this.bigMacData = result?.dataset?.data ?? [];
      })
      .catch((error) => console.log('errorrr', error));
  };
  fetchWorldBankData = () => {
    var requestOptions = {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
    console.log(this.getCountryCodes(), 'S');
    fetch(
      'http://localhost:3000/getworldbankdata?countries=' +
        this.getCountryCodes(),
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.datatable);
        this.worldBankDataFields =
          result?.datatable?.columns?.map((item: any) => item.name) ?? [];
        this.worldBankData = result?.datatable?.data ?? [];
      })
      .catch((error) => console.log('errorrr', error));
  };
  constructor() {
    this.fetchBigMacData();
    this.fetchWorldBankData();
  }
}
