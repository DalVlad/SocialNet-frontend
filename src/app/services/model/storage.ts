import { file } from "./file";
import { pathCatalog } from "./pathCatalog";

export class storage{
    pathCatalogRoot: pathCatalog;

    constructor(pathCatalogRoot: pathCatalog){
        this.pathCatalogRoot = pathCatalogRoot;
    }
}