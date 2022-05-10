import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }
  balance = 10000;
  bid = {
    price: 0,
    vol: 0
  };
  rulingPrice = 0;

  buy(price: number) {

  }

  hold() {

  }
}
