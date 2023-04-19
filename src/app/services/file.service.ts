import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private url = 'http://localhost:8080/file';
  private requestParam = '?pathCatalog='

  constructor(private http: HttpClient) { }

  getFile(fileName: string, path: string): Observable<Blob> {
    return this.http.get(this.url + this.requestParam + path + '/' + fileName, { responseType: 'blob' });
  }

  saveImg(formData: FormData, path: string): Observable<any> {
    return this.http.post(this.url + "/img" + this.requestParam + path, formData)
  }

  saveVideo(formData: FormData, path: string): Observable<any> {
    return this.http.post(this.url + "/video" + this.requestParam + path, formData)
  }

  deleteFile(fileName: string, path: string): Observable<any> {
    return this.http.delete(this.url + this.requestParam + path + '/' + fileName)
  }

}
