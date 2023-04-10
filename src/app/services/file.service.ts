import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private getFileUrl = 'http://localhost:8080/file';
  private requestParam = '?pathCatalog='

  constructor(private http: HttpClient) { }

  getFile(fileName: string, path: string): Observable<Blob> {
    return this.http.get(this.getFileUrl + this.requestParam + path + '/' + fileName, { responseType: 'blob' });
  }


}
