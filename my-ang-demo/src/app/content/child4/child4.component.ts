import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'con-child4',
  templateUrl: './child4.component.html',
  styleUrls: ['./child4.component.scss']
})
export class Child4Component implements OnInit {
  @Input() content!: TemplateRef<any>;
  templateData = { message: 'Dynamic data from the child pushed back into parent template (that pushed into child template)' };

  constructor() { }

  ngOnInit(): void {
  }

}
