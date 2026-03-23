import { Component, ContentChild, ElementRef, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-render-my-child',
  templateUrl: './render-my-child.component.html',
  styleUrls: ['./render-my-child.component.scss']
})
export class RenderMyChildComponent implements OnInit {
  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }
}
