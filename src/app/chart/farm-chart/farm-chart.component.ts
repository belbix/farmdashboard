import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {UniswapSubscriberService} from '../../flow-cards/uniswap/uniswap-subscriber.service';
import {ViewTypeService} from '../../services/view-type.service';
import {PriceChartBuilder} from '../price-chart-builder';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-farm-chart',
  templateUrl: './farm-chart.component.html',
  styleUrls: ['./farm-chart.component.css']
})
export class FarmChartComponent implements AfterViewInit {
  @ViewChild('price_chart') chartEl: ElementRef;
  coin = 'FARM';
  otherCoin = 'ETH';

  constructor(private httpService: HttpService,
              private uniswapSubscriberService: UniswapSubscriberService,
              public vt: ViewTypeService,
              private log: NGXLogger) {
  }

  ngAfterViewInit(): void {
    const priceChartBuilder = new PriceChartBuilder(this.log, this.coin, this.chartEl, this.vt);
    this.httpService.getUniswapOHLC(this.coin).subscribe(data => {
      this.log.debug(this.coin + ' prices loaded ', data);
      priceChartBuilder.addValuesToChart(data, false);
    });

    this.uniswapSubscriberService.handlers.set(this, tx => {
      if (tx.coin !== this.coin || tx.otherCoin !== this.otherCoin) {
        return;
      }
      priceChartBuilder.collectLastUniTx(tx);
    });
  }
}
