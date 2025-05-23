import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AdminLayoutComponent } from './dashboard/admin-layout/admin-layout.component';
@Component({
  selector: 'app-admin',
  imports: [RouterModule ,SidenavComponent , AdminLayoutComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  isCollapsed = false;

onSidebarToggle(state: boolean) {
  this.isCollapsed = state;
}

}
