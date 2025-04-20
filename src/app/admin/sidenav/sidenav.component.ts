import { CommonModule } from '@angular/common';
import { Component,EventEmitter,OnInit, Output} from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarServiceService } from '../../sidebar-service.service';
@Component({
  selector: 'app-sidenav',
  imports: [RouterModule , CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit{
  @Output() collapsedChange = new EventEmitter<boolean>();
  isCollapsed = false;

  constructor(private sidebarService: SidebarServiceService) {}

  ngOnInit() {
    this.sidebarService.toggleSidebar$.subscribe(() => {
      this.isCollapsed = !this.isCollapsed;
      this.collapsedChange.emit(this.isCollapsed);
    });
  }

}