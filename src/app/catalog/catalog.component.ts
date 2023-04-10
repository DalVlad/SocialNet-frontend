import { Component, OnInit } from '@angular/core';
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
  

  constructor(private fileService: FileService,
    private catalogService: CatalogService, private tokenStorage: TokenStorageService,
    private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pathCatalog = params['pathCatalog'];
    });
    this.catalogService.getCatalog(this.pathCatalog).subscribe(
      data => {
        for(let i = 0; i < data.pathCatalogRoot.files.length; i++){
        }
        data.pathCatalogRoot.files.forEach(file => {
          if(file.preview != null){
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
    if (this.pathCatalog == null) {
      this.pathCatalog = '';
    }
    this.fileService.getFile(fileName, this.pathCatalog).subscribe(
      data => {
        this.typeFile = data.type.substring(0, data.type.indexOf('/'));
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          this.urlFile = fileReader.result as string;
        };
        fileReader.readAsDataURL(data);
      },
      error => {
        this.errorMessage = "error load"
      },);
    this.nameFile = fileName;
  }
}
