import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
import { CatalogService } from '../services/catalog.service';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  info: any;
  errorMessage: any;
  urlFile: string = '';
  typeFile: string = '';
  nameFile = '';
  pathCatalog = '';
  createCatalogName: any;
  fileName: string = "Файл не выбран";
  file: any = null;
  mapURLImg: Map<string, string> = new Map();
  preview: any;
  previewURL: any;

  constructor(private fileService: FileService,
    private catalogService: CatalogService, private tokenStorage: TokenStorageService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.errorMessage = null;
    this.route.queryParams.subscribe(params => {
      this.pathCatalog = params['pathCatalog'];
    });
    this.catalogService.getCatalog(this.pathCatalog).subscribe(
      data => {
        for (let i = 0; i < data.pathCatalogRoot.files.length; i++) {
        }
        data.pathCatalogRoot.files.forEach(file => {
          if (file.preview != null) {
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

  getFile(fileName: string): void {
    this.urlFile = '';
    this.errorMessage = null;
    if (this.pathCatalog == null) {
      this.pathCatalog = '';
    }
    if (this.mapURLImg.get(fileName) != undefined) {
      this.nameFile = fileName;
      this.urlFile = this.mapURLImg.get(fileName)!;
      this.typeFile = this.urlFile.split("/")[0].split(":")[1];
      return;
    }
    this.fileService.getFile(fileName, this.pathCatalog).subscribe(
      data => {
        this.typeFile = data.type.substring(0, data.type.indexOf('/'));
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          this.mapURLImg.set(fileName, fileReader.result as string);
          if (this.urlFile == '') {
            this.urlFile = fileReader.result as string;
          }
        };
        fileReader.readAsDataURL(data);
      },
      error => {
        this.errorMessage = "error load"
      },);
    this.nameFile = fileName;
  }

  createCatalog() {
    this.errorMessage = null;
    this.catalogService.creataCatalog(this.createCatalogName).subscribe(
      data => {
        window.location.reload();
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }

  onFileSelected(event: any) {
    this.errorMessage = null;
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
    if (this.file.type.substring(0, this.file.type.indexOf('/')) == "video") {
      const video: HTMLVideoElement = document.createElement('video');
      video.src = URL.createObjectURL(this.file);
      video.preload = 'auto';
      video.currentTime = 1;
      video.addEventListener('loadeddata', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);
        this.previewURL = canvas.toDataURL();
        const blob = this.dataURItoBlob(this.previewURL);
        this.preview = new File([blob], 'preview.png', { type: 'image/png' });
      });
    }
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


  saveFile() {
    this.errorMessage = null;
    const formData = new FormData();
    formData.append("file", this.file);
    if (this.file.type.substring(0, this.file.type.indexOf('/')) == "video") {
      formData.append("preview", this.preview);
      this.fileService.saveVideo(formData, this.pathCatalog).subscribe(
        data => {
          window.location.reload();
        },
        error => {
          this.errorMessage = error.error.message;
        }
      );
    } else {
      this.fileService.saveImg(formData, this.pathCatalog).subscribe(
        data => {
          window.location.reload();
        },
        error => {
          this.errorMessage = error.error.message;
        }
      );
    }

  }

  deleteFile() {
    this.errorMessage = null;
    if (!confirm("Удалить файл с имяним " + this.nameFile)) {
      return;
    }
    this.fileService.deleteFile(this.nameFile, this.pathCatalog).subscribe(
      data => {
        window.location.reload();
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }

}
