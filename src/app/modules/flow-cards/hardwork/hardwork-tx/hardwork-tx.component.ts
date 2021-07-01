import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {HardWorkDto} from '@data/models/hardwork-dto';
import {NGXLogger} from 'ngx-logger';
import {ViewTypeService} from '@data/services/view-type.service';
import {SnackBarService} from '@shared/snack-bar/snack-bar.service';
import {CustomModalComponent} from '@shared/custom-modal/custom-modal.component';
import {ContractsService} from '@data/services/contracts.service';
import {Vault} from '@data/models/vault';
import {HardworkDataService} from '@data/services/data/hardwork-data.service';
import { Utils } from '@data/static/utils';

@Component({
  selector: 'app-hardwork-tx',
  templateUrl: './hardwork-tx.component.html',
  styleUrls: ['./hardwork-tx.component.scss']
})
export class HardworkTxComponent implements AfterViewInit {
  @ViewChild('hardWorkHistoryListModal') private hardWorkHistoryListModal: CustomModalComponent;
  vaultFilter = 'all';
  minAmout = 0;

  constructor(
      public vt: ViewTypeService,
      private snack: SnackBarService,
      private log: NGXLogger,
      private contractsService: ContractsService,
      private hardworksData: HardworkDataService
  ) {
  }


  get vaultNames(): string[] {
    return this.contractsService.getContractsArray(Vault)
    .map(_ => _.contract?.name);
  }

  ngAfterViewInit(): void {
  }

  get dtos(): HardWorkDto[] {
    return this.hardworksData.getDtos();
  }

  openHardWorkHistoryListDialog(): void {
    this.hardWorkHistoryListModal.open();
  }

  getVaultModel(vaultAddress: string): Vault{
    return this.contractsService.getContracts(Vault).get(vaultAddress);
  }

  getVaultName(vault: string): string {
    return Utils.prettyVaultName(vault);
  }

}
