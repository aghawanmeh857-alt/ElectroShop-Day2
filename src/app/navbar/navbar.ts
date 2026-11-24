import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  selectedPage: string = 'Home';

  selectPage(page: string): void {
    this.selectedPage = page;
  }

}