import { Component, OnInit } from '@angular/core';
import {ViewTypeService} from '../../services/view-type.service';

@Component({
  selector: 'app-flow-cards-view',
  templateUrl: './flow-cards-view.component.html',
  styleUrls: ['./flow-cards-view.component.css']
})
export class FlowCardsViewComponent implements OnInit {

  constructor(public vt: ViewTypeService) { }

  ngOnInit(): void {
  }

}
