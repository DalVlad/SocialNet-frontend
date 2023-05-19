import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { NewsComponent } from './components/news/news.component';
import { CommentComponent } from './components/comment/comment.component';

const routes: Routes = [
  {
    path: 'person',
    component: ProfileComponent
  },
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'comment/:newsId',
    component: CommentComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
