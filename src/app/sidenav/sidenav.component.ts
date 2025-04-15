import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule , CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  isSidebarCollapsed = false;

toggleSidebar() {
  this.isSidebarCollapsed = !this.isSidebarCollapsed;
  console.log(this.isSidebarCollapsed)
}

}
