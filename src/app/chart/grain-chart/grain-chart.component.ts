import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ViewTypeService} from '../../services/view-type.service';
import {NGXLogger} from 'ngx-logger';
import {UniswapSubscriberService} from '../../flow-cards/uniswap/uniswap-subscriber.service';
import {PriceChartBuilder} from '../price-chart-builder';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-grain-chart',
  templateUrl: './grain-chart.component.html',
  styleUrls: ['./grain-chart.component.css']
})
export class GrainChartComponent implements AfterViewInit {
  @ViewChild('price_chart') chartEl: ElementRef;
  coin = 'GRAIN';

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
      if (tx.coin !== this.coin) {
        return;
      }
      priceChartBuilder.collectLastUniTx(tx);
    });
  }
}
