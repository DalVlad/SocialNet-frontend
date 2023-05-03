import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CatalogService } from 'src/app/services/catalog.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-foreign-catalog',
  templateUrl: './foreign-catalog.component.html',
  styleUrls: ['./foreign-catalog.component.css']
})
export class ForeignCatalogComponent implements OnInit {

  info: any;
  errorMessage: any;
  urlFile: string = '';
  fileLikes: number = 0;
  isLike: boolean = false;
  typeFile: string = '';
  nameFile = '';
  fileId = 0;
  pathCatalog = '';
  login = '';
  file: any = null;
  preview: any;
  previewURL: any;

  constructor(private fileService: FileService,
    private catalogService: CatalogService, private tokenStorage: TokenStorageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.errorMessage = null;
    this.route.queryParams.subscribe(params => {
      this.pathCatalog = params['pathCatalog'];
      this.login = params['l'];
    });
    console.log(this.login);
    this.catalogService.getForeignCatalog(this.pathCatalog, this.login).subscribe(
      data => {
        data.pathCatalogRoot.files.forEach(file => {
          if (file.preview != null && file.preview != '') {
            file.url = "data:image/jpeg;base64," + file.preview;
          }
        });
        this.info = {
          token: this.tokenStorage.getToken(),
          storage: data,
        };
      },
      error => {
        this.errorMessage = error.error.message;
      });
  }

  getFile(fileName: string, fileId: number): void {
    this.urlFile = '';
    this.fileLikes = 0;
    this.isLike = false;
    this.errorMessage = null;
    this.getLike(fileId);
    if (this.pathCatalog == null) {
      this.pathCatalog = '';
    }
    this.fileService.getFile(fileId, this.pathCatalog).subscribe(
      data => {
        this.typeFile = data.type.substring(0, data.type.indexOf('/'));
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          this.urlFile = fileReader.result as string;
        }; fileReader.readAsDataURL(data);
      },
      error => {
        this.errorMessage = "error load"
      },);
    this.nameFile = fileName;
    this.fileId = fileId;
  }

  async getLike(fileId: number) {
    this.fileService.getFileLike(fileId, this.pathCatalog).subscribe(
      data => {
        this.fileLikes = data.likes,
          this.isLike = data.like_person
      });
  }

  setLike() {
    this.fileService.setFileLike(this.fileId, this.pathCatalog).subscribe(
      data => {
        if (this.isLike) {
          this.fileLikes -= 1;
        } else {

          this.fileLikes += 1;
        }
        this.isLike = !this.isLike;
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }

  dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

}
