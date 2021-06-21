import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {WebsocketService} from '../../../services/websocket.service';
import {HttpService} from '../../../services/http/http.service';
import {NGXLogger} from 'ngx-logger';
import {HarvestDto} from '../../../models/harvest-dto';
import {ViewTypeService} from '../../../services/view-type.service';
import {SnackBarService} from '../../../main/snack-bar/snack-bar.service';
import {CustomModalComponent} from 'src/app/dialogs/custom-modal/custom-modal.component';
import {ContractsService} from '../../../services/contracts.service';
import {Vault} from '../../../models/vault';
import {HarvestsService} from '../../../services/http/harvests.service';
import {HarvestDataService} from '../../../services/data/harvest-data.service';

@Component({
  selector: 'app-harvest-tx',
  templateUrl: './harvest-tx.component.html',
  styleUrls: ['./harvest-tx.component.scss']
})
export class HarvestTxComponent implements AfterViewInit {
  vaultFilter = 'all';
  minAmount = 0;
  openedModal: Record<string, boolean> = {};
  @ViewChild('harvestHistoryModal') private harvestHistoryModal: CustomModalComponent;
  constructor(private ws: WebsocketService,
              private httpService: HttpService,
              private cdRef: ChangeDetectorRef,
              public vt: ViewTypeService,
              private snack: SnackBarService,
              private log: NGXLogger,
              private contractsService: ContractsService,
              private harvestsService: HarvestsService,
              private harvestData: HarvestDataService,
              private contractService: ContractsService
  ) {
  }

  ngAfterViewInit(): void {
  }

  get vaultNames(): string[] {
    return this.contractsService.getContractsArray(Vault)
    .map(_ => _.contract.name);
  }

  get dtos(): HarvestDto[] {
    return this.harvestData.getDtos();
  }

  /**
   * @TODO: to rename? because it does not provide icon, it provides an entire vault
   */
  getVaultIcon(vaultAddress: string): Vault {
    return this.contractService.getContracts(Vault).get(vaultAddress);
  }

  openHarvestHistory(): void {
    this.harvestHistoryModal.open();
  }

  hideTradeLinks(dtoId: string): void {
    this.openedModal[dtoId] = false;
  }

  showTradeLinks(dtoId: string): void {
    this.openedModal[dtoId] = true;
  }
}
