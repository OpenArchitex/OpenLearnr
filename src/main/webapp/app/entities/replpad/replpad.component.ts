import { Component, OnInit } from '@angular/core';
import { ReplpadService } from 'app/entities/replpad/replpad.service';

@Component({
  selector: 'jhi-repl',
  templateUrl: './replpad.component.html',
  styles: []
})
export class REPLComponent implements OnInit {
  replURL: string;

  constructor(protected replService: ReplpadService) {}

  ngOnInit() {
    this.replService.getREPLPad().subscribe(response => {
      this.replURL = response;
    });
  }
}
