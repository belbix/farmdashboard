import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {ViewTypeService} from '@data/services/view-type.service';
import {NGXLogger} from 'ngx-logger';
import {ChartBuilder} from '@modules/chart/chart-builder';
import {HarvestDto} from '@data/models/harvest-dto';
import {HarvestsService} from '@data/services/http/harvests.service';
import {RewardsService} from '@data/services/http/rewards.service';
import {ChartGeneralMethodsComponent} from '@modules/chart/chart-general-methods.component';
import {StaticValues} from '@data/static/static-values';
import {forkJoin} from 'rxjs';
import {Addresses} from '@data/static/addresses';

@Component({
  selector: 'app-ps-apy-dialog',
  templateUrl: './ps-apy-dialog.component.html',
  styleUrls: ['./ps-apy-dialog.component.css']
})
export class PsApyDialogComponent extends ChartGeneralMethodsComponent implements AfterViewInit {

  constructor(public vt: ViewTypeService,
              public cdRef: ChangeDetectorRef,
              private log: NGXLogger,
              private harvestsService: HarvestsService,
              private rewardsService: RewardsService,
  ) {
    super(cdRef, vt);
  }

  load(): void {

    forkJoin([
      this.rewardsService.getHistoryRewards(Addresses.ADDRESSES.get('PS'), StaticValues.NETWORKS.get('eth')),
      this.harvestsService.getHarvestHistoryByVault(Addresses.ADDRESSES.get('PS'), StaticValues.NETWORKS.get('eth'))
    ]).subscribe(([rewards, harvests]) => {
      const chartBuilder = new ChartBuilder();
      chartBuilder.initVariables(2);

      rewards?.forEach(reward => {
        let harvest: HarvestDto = null;
        for (let i = 1; i < harvests.length; i++) {
          if (harvests[i].blockDate - reward.blockDate >= 0) {
            harvest = harvests[i - 1];
            harvests = harvests.slice(i - 1, harvests.length);
            break;
          }
        }
        if (harvest == null) {
          this.log.info('Not found harvest for reward');
          return;
        }

        chartBuilder.addInData(0, reward.blockDate, reward.weeklyApy);
        chartBuilder.addInData(1, reward.blockDate, harvest.lastUsdTvl / 1000000);

      });

      this.handleData(chartBuilder, [
        ['Weekly APY %', 'right', '#0085ff'],
        ['TVL M$', '1', '#eeb000']
      ]);
    });
  }
}
