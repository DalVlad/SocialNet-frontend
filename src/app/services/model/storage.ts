import { pathCatalog } from "./pathCatalog";

export class storage {
    pathCatalogRoot: pathCatalog;

    constructor(pathCatalogRoot: pathCatalog) {
        this.pathCatalogRoot = pathCatalogRoot;
    }
}