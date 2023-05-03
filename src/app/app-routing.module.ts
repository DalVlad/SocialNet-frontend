import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ForeignCatalogComponent } from './foreignCatalog/foreign-catalog/foreign-catalog.component';
import { PersonListComponent } from './personList/person-list/person-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
      path: 'auth/login',
      component: LoginComponent
  },
  {
      path: 'signup',
      component: RegisterComponent
  },
  {
    path: 'gallery',
    component: CatalogComponent
  },
  {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
  },
  {
    path: 'foreign/gallery',
    component: ForeignCatalogComponent
  },
  {
    path: 'people',
    component: PersonListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }