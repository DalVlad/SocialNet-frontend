import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from './profile';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    private profileUrl = 'http://localhost:8080/person';

    constructor(private http: HttpClient) { }

    public getProfile(profileId: number): Observable<Profile> {
        return this.http.get<Profile>(`${this.profileUrl}/${profileId}`)
    }

    public createProfile(personId: number, profile: Profile): Observable<Profile> {
        return this.http.post<Profile>(`${this.profileUrl}/${personId}`, profile)
    }

    public updateProfile(profileId: number, profile: Profile): Observable<Profile> {
        return this.http.put<Profile>(`${this.profileUrl}/${profileId}`, profile)
    }
}