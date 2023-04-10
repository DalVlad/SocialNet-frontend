import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { storage } from './model/storage';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

    private getFileUrl = 'http://localhost:8080/catalog';
    private requestParam = '?pathCatalog='

  constructor(private http: HttpClient) { }

  getCatalog(path: string): Observable<storage> {
    return this.http.get(this.getFileUrl + this.requestParam + path).pipe(map((data: any) => {
      return new storage(data);
    }));
  }
}
