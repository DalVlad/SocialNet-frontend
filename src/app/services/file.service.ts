import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private getFileUrl = 'http://localhost:8080/file?pathCatalog=';

  constructor(private http: HttpClient) { }

  getFile(fileName: string, path: string): Observable<Blob> {
    return this.http.get(this.getFileUrl + path + '/' + fileName, { responseType: 'blob' });
  }

}
