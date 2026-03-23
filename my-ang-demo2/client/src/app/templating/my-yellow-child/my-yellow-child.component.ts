import { Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-my-yellow-child',
  templateUrl: './my-yellow-child.component.html',
  styleUrls: ['./my-yellow-child.component.scss']
})
export class MyYellowChildComponent implements OnInit {

  constructor() { }

  @ContentChild('pushedContent', {static: true}) pushedContentRef!: ElementRef;

  ngOnInit(): void {
    if (this.pushedContentRef) {
      this.pushedContentRef.nativeElement.style.backgroundColor = 'lightblue';     // set background color of referenced pushed content
    }
  }
}
