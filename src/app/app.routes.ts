import { Routes } from '@angular/router';
import { JopListComponent } from './job-search-suhad/jop-list/jop-list.component';
import { JobDetailsComponent } from './job-search-suhad/job-details/job-details.component';
import { ChatComponent } from './job-search-suhad/chat/chat.component';
export const routes: Routes = [
  { path: 'job-list', component: JopListComponent },
  { path: 'job-details/:id', component: JobDetailsComponent },
  {path: 'chat',component: ChatComponent,},
]
