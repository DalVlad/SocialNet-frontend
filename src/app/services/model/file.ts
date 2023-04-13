import { SafeUrl } from "@angular/platform-browser";

export class file {
    name: string;
    preview: string;
    extension: string;
    url: SafeUrl;

    constructor(name: string, preview: string, extension: string, url: string) {
        this.name = name;
        this.extension = extension;
        this.preview = preview;
        this.url = url;
    }
}