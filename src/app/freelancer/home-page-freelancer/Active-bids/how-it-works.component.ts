import {Component, Input} from '@angular/core';
import {JopListComponent} from '../../job-search/jop-list/jop-list.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-Active-bids',
  imports: [
    JopListComponent,
    RouterLink
  ],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.css'
})
export class ActiveBidsComponent {
  yourActiveBidJobsArray = [

  ];


}
