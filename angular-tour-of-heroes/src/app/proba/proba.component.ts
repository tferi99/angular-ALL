import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'my-proba',
  templateUrl: './proba.component.html',
  styleUrls: ['./proba.component.css']
})
export class ProbaComponent implements OnInit {

  name: string;

  constructor() {
    this.name = 'World';
  }

  ngOnInit() {
  }
}
