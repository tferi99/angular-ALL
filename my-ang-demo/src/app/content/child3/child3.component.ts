import { Component, ContentChild, OnInit } from '@angular/core';

@Component({
  selector: 'con-child3',
  templateUrl: './child3.component.html',
  styleUrls: ['./child3.component.scss']
})
export class Child3Component {
  @ContentChild('projectedContent') projectedContent: any;

  ngAfterContentInit() {
    console.log('Content:', this.projectedContent);
  }
}

