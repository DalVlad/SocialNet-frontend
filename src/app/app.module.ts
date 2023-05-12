import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { CatalogComponent } from './catalog/catalog.component';
import { ForeignCatalogComponent } from './foreignCatalog/foreign-catalog/foreign-catalog.component';
import { PersonListComponent } from './personList/person-list/person-list.component';

import { CommunityComponent } from './community/community.component';
import { CommunityService } from './community/community.service';
import { CommunityPageComponent } from './communityPage/communityPage.component';
import { MemberAllCommunitiesComponent} from './member/memberAllCommunity.component';
import { MemberService } from './member/member.service';
import { PublicationComponent } from './publication/publication.component';
import { MemberCommunityPageComponent } from './member/memberCommunityPage.component';
import { CommentOnPublicationComponent } from './commentOnPublication/commentOnPublication.component';
import { CommentOnPublicationService } from './commentOnPublication/commentOnPublication.service';
import { CommunityCreationComponent} from './community/communityCreationComponent';
import { PublicationCreationComponent } from './publication/publicationCreation.component';
import { PublicationEditComponent } from './publication/publicationEdit.component';
import { ChangeRoleComponent } from './member/changeRole.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes =[
  { path: 'start', component:  AppComponent},
  { path: 'AllCommunities', component:  CommunityComponent, children: [
    {path: 'members', component: MemberAllCommunitiesComponent}
  ]},
  { path: 'community/:name', component:  CommunityPageComponent},
  { path: 'communityCreation', component:  CommunityCreationComponent},
  { path: 'community/:name/publicationCreation', component: PublicationCreationComponent},
  { path: 'community/:name/publicationEdit/:id', component: PublicationEditComponent},
  { path: 'community/:id/members', component: ChangeRoleComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CatalogComponent,
    ForeignCatalogComponent,
    PersonListComponent,

    CommunityComponent,           //ifoxyo компоненты 
    CommunityPageComponent,
    CommunityCreationComponent,
    MemberAllCommunitiesComponent,
    MemberCommunityPageComponent,
    PublicationComponent,
    PublicationCreationComponent,
    PublicationEditComponent,
    CommentOnPublicationComponent,
    ChangeRoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [httpInterceptorProviders, CommunityService, MemberService, CommentOnPublicationService, PublicationEditComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
