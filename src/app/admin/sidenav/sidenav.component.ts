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

  // ngOnInit() {
  //   this.sidebarService.toggleSidebar$.subscribe(() => {
  //     this.isCollapsed = !this.isCollapsed;
  //     this.collapsedChange.emit(this.isCollapsed);
  //   });
  // }
  wasAutoCollapsed = false;

ngOnInit() {
  this.handleResize(); // فحص أولي عند التحميل

  window.addEventListener('resize', this.handleResize.bind(this));

  this.sidebarService.toggleSidebar$.subscribe(() => {
    if (window.innerWidth >= 768) {
      this.isCollapsed = !this.isCollapsed;
      this.wasAutoCollapsed = false; // هذه نقرة يدوية
      this.collapsedChange.emit(this.isCollapsed);
    }
  });
}

handleResize() {
  const width = window.innerWidth;

  // إذا كانت الشاشة صغيرة، اضغط الـsidebar تلقائيًا
  if (width < 768 && !this.isCollapsed) {
    this.isCollapsed = true;
    this.wasAutoCollapsed = true;
    this.collapsedChange.emit(this.isCollapsed);
  }

  // إذا رجعت الشاشة كبيرة، وأنتَ فقط مضغوط تلقائيًا، افتح الـsidebar تلقائيًا
  else if (width >= 992 && this.isCollapsed && this.wasAutoCollapsed) {
    this.isCollapsed = false;
    this.wasAutoCollapsed = false;
    this.collapsedChange.emit(this.isCollapsed);
  }
}

}