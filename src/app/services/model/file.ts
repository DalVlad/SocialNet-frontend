import { SafeUrl } from "@angular/platform-browser";

export class file {
    id: number;
    name: string;
    preview: string;
    extension: string;
    url: SafeUrl;

    constructor(id: number, name: string, preview: string, extension: string, url: string) {
        this.id = id;
        this.name = name;
        this.extension = extension;
        this.preview = preview;
        this.url = url;
    }
}