import { Component, OnInit, ViewChild } from '@angular/core';
import { ContextMenuComponent, ContextMenuService } from '@perfectmemory/ngx-contextmenu';
import { Gender, Person } from '../../shared/model/person.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('oneContextMenu', {static: false}) contextMenu!: ContextMenuComponent<Person>;

  persons: Person[] = [
    {
      id: 0,
      name: 'John Smith',
      email: 'js@a.b',
      active: true,
      gender: Gender.MALE
    },
    {
      id: 1,
      name: 'Jane Doe',
      email: 'jd@a.b',
      active: true,
      gender: Gender.FEMALE
    }
  ];

// The value can be typed
//  public value: string = 'a simple value attached to the context menu';

  constructor(
    private contextMenuService: ContextMenuService<Person>
  ) { }

  ngOnInit(): void {}

  public onContextMenu($event: MouseEvent, person: Person): void {
    this.contextMenuService.show(this.contextMenu, {
      x: $event.x,
      y: $event.y,
      value: person
    });
    $event.preventDefault();
    $event.stopPropagation();
  }


  // The value can be typed
  public execute(text: string, value: Person) {
    console.log(`[${text}]: `, value);
  }

  onlyMenVisible(value: Person | undefined): boolean {
    if (!value) {
      return false;
    }
    return value && value.gender === Gender.FEMALE;
  }

/*  onMenu($event: MouseEvent) {
    console.log('onMenu()', $event);
    console.log('contextMenu', this.contextMenu);

    this.contextMenuService.show(this.contextMenu, {
      x: $event.x,
      y: $event.y,
      value: this.value,
    });
  }*/
}
