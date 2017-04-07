import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  private menuItems: MenuItem[] = [];

  constructor() {
    this.buildMenu();
  }

  ngOnInit() {
  }

  buildMenu() {
    const homeMenuItem: MenuItem = {
      title: "Acasă",
      routerLink: ["home"]
    };
    const consultantsList: MenuItem = {
      title: "Listă consultanți",
      routerLink: ["list"]
    };
    this.menuItems.push(homeMenuItem);
    this.menuItems.push(consultantsList);
  }

}

class MenuItem {
  title: string;
  routerLink?: any[];
}
