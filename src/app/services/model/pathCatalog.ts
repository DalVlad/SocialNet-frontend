import { file } from "./file";

export class pathCatalog {
    pathName: string;
    files: file[];
    pathCatalogs: pathCatalog[]

    constructor(pathName: string, files: file[], pathCatalogs: pathCatalog[]) {
        this.pathName = pathName;
        this.files = files;
        this.pathCatalogs = pathCatalogs;
    }
}