import { Component, OnInit } from '@angular/core';
import {DateService} from "../shared/date.service";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.sass']
})
export class SelectorComponent  {

  constructor(private dateService: DateService) { }

  go(dir: number) {
    this.dateService.changeMonth(dir)
  }
}
