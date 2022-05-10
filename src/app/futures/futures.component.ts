import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Chart, init, KLineData, extension } from 'klinecharts';
import { HttpStockService } from '../service/http-stock.service';
import { _VOL } from '../share/chartTechnicalindcator'

// import NP from 'number-precision'
import { Decimal } from 'decimal.js-light';
Decimal.set({
  precision: 8,
});


extension.addTechnicalIndicatorTemplate(_VOL);

@Component({
  selector: 'app-futures',
  templateUrl: './futures.component.html',
  styleUrls: ['./futures.component.css']
})
export class FuturesComponent implements AfterViewInit, OnInit {
  @ViewChild('chart') chartDom: any
  private KChart: Chart | null = null
  constructor(private httpStockService: HttpStockService) { }
  KLineData: KLineData[] = [];
  step = 50;

  /**
   * 
   */
  balance = 10000;
  account = 10000;
  holding = false;
  holdPrice: number = 0;
  holdDir = 0;
  rate = 0;
  Rate = 0;

  nextStock() {
    this.step++;
    this.KChart?.updateData(this.KLineData[this.step]);
    if (!this.holding) { return }
    const price = this.KLineData[this.step].close;
    this.rate = Number(new Decimal(price).div(this.holdPrice).minus(1).times(this.holdDir).toFixed(5));
    this.balance = Number(new Decimal(this.rate).plus(1).times(this.account).toFixed(5));
    this.Rate = Number(new Decimal(this.balance).div(10000).minus(1).toFixed(5));
  }

  buy(dir: number) {
    if (this.holding && this.holdDir !== dir) {
      this.account = this.balance;
    }
    this.holdPrice = this.KLineData[this.step].close;
    this.holdDir = dir;
    this.holding = true;
    this.nextStock();
  }

  ping() {
    this.account = this.balance;
    this.holdDir = 0;
    this.holdPrice = 0;
    this.holding = false;
    this.rate = 0
    this.nextStock();
  }

  getpercent(num: number) {
    return new Decimal(num).times(100)
  }


  ngOnInit(): void {
    this.httpStockService.getKLines().subscribe(data => {
      this.KLineData = data;
      this.KChart?.applyNewData(this.KLineData.slice(0, 50))
    })
  }

  ngAfterViewInit(): void {
    this.KChart = init(this.chartDom.nativeElement,
      {
        grid: {
          show: false
        },
        xAxis: {
          tickText: false
        },
        crosshair: {
          vertical: { text: false }
        },
        technicalIndicator: {
          margin: {
            top: 0.2,
            bottom: -0.001
          },
        },
        tooltip: {
          showRule: 'none'
        }

      }
    );
    this.KChart?.createTechnicalIndicator('MMVOL');
  }
}
