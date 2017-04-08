import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  private menuItems: MenuItem[] = [];
  private menuVisible = false;

  constructor() {
    this.buildMenu();
  }

  ngOnInit() {
  }

  private buildMenu() {
    const homeMenuItem: MenuItem = {
      title: "Acasă",
      routerLink: ["home"]
    };
    const consultantsList: MenuItem = {
      title: "Listă consultanți",
      routerLink: ["list"]
    };
    const consultantsMap: MenuItem = {
      title: "Hartă consultanți",
      routerLink: ["map"]
    };
    this.menuItems.push(homeMenuItem);
    this.menuItems.push(consultantsList);
    this.menuItems.push(consultantsMap);
  }

  public toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
}

class MenuItem {
  title: string;
  routerLink?: any[];
}
