import { Component, OnInit } from '@angular/core';
import { Profile } from './profile';
import { ProfileService } from './profile.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  public profile: Profile;
  constructor(private profileService: ProfileService) { }
  ngOnInit(): void {
    this.getProfile();
  }

  public getProfile(): void {
    this.profileService.getProfile(1).subscribe(
      (response: Profile) => {
        this.profile = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
}
