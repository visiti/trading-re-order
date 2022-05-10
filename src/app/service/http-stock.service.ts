import { KLineData } from 'klinecharts';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { getParams } from '../share/randomParams'

export interface tick {
  open: number,
  close: number,
  high: number,
  low: number,
  volume: number,
  turnover: number,
  timestamp: number
}

const API_HOST = 'https://www.binancezh.biz'
@Injectable({
  providedIn: 'root'
})
export class HttpStockService {
  constructor(private http: HttpClient) { }

  // private limit = 50;

  // private rawKLines: KLineData[] = [];

  // get rawDate() {
  //   console.log(this.rawKLines);
  //   if (!this.rawKLines.length) {
      
  //     this.getKLines().subscribe(data => this.rawKLines = data);
  //   }
  //   return this.rawKLines;
  // }
  getKLines() {
    return this.http.get<number[][]>(API_HOST + '/fapi/v1/klines', {
      params: getParams()
    }).pipe(
      map(klines => {
        let KLineData: KLineData[] = [];
        for (let i = 0; i < klines.length; i++) {
          let tick = {
            timestamp: klines[i][0],
            open: klines[i][1],
            high: klines[i][2],
            low: klines[i][3],
            close: klines[i][4],
            volume: klines[i][5],
            turnover: klines[i][7]
          }
          KLineData[i] = tick;
        }
        return KLineData;
      }
      ),
    )
  }
}
