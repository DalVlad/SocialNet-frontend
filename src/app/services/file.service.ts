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

  getFile(fileId: number, path: string): Observable<Blob> {
    return this.http.get(this.url + this.requestParam + path + '/' + fileId, { responseType: 'blob' });
  }

  getFileLike(fileId: number, path: string): Observable<any> {
    return this.http.get(this.url + "/like" + this.requestParam + path + '/' + fileId);
  }

  setFileLike(fileId: number, path: string): Observable<any> {
    return this.http.post(this.url + "/like" + this.requestParam + path + '/' + fileId, {});
  }

  saveImg(formData: FormData, path: string): Observable<any> {
    return this.http.post(this.url + "/img" + this.requestParam + path, formData)
  }

  saveVideo(formData: FormData, path: string): Observable<any> {
    return this.http.post(this.url + "/video" + this.requestParam + path, formData)
  }

  deleteFile(fileId: number, path: string): Observable<any> {
    return this.http.delete(this.url + this.requestParam + path + '/' + fileId)
  }

}
