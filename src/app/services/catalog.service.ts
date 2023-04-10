import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { storage } from './model/storage';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

    private url = 'http://localhost:8080/catalog';
    private requestParam = '?pathCatalog='

  constructor(private http: HttpClient) { }

  getCatalog(path: string): Observable<storage> {
    return this.http.get(this.url + this.requestParam + path).pipe(map((data: any) => {
      return new storage(data);
    }));
  }

  creataCatalog(path: string): Observable<any> {
    return this.http.post(this.url + this.requestParam + path, null)
  }

}
