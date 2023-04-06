import { Component, OnInit } from '@angular/core';
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
  fileBlob: Blob = new Blob;
  urlFile: string = '';
  typeFile: string = '';
  isLoad = false;
  nameFile = '';
  pathCatalog = '';

  constructor(private fileService: FileService,
     private catalogService: CatalogService, private tokenStorage: TokenStorageService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pathCatalog = params['pathCatalog'];
    });
    if(this.pathCatalog == null){
          this.catalogService.getStorage().subscribe(data => {
      this.info = {
        token: this.tokenStorage.getToken(),
        storage: data,
      };
    },);
    }else{
      this.catalogService.getCatalog(this.pathCatalog).subscribe(
      data => {
        this.info = {
          token: this.tokenStorage.getToken(),
          storage: data,
        };
    },
    error => {
      this.errorMessage = error.error.message;
    },);}
  }

  getFile(fileName: string): void{
    if(this.pathCatalog == null){
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
