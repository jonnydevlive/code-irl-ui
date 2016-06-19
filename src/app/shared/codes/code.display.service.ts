import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestMethod, RequestOptions, Headers } from '@angular/http';

import { CustomHttpService } from '../.';

@Injectable()
export class CodeDisplayService {
    private codesUrl: string[] = ['codes'];

    constructor(private http: Http) { }

    getRawFile(url: string) {
        var rawUrl = url.replace(
            /^https:\/\/github.com\/(.*?)\/(.*?)\/blob\//,
            "https://github.com/$1/$2/blob/");
        let response = this.http.get(rawUrl);
        let text = response.map(r => r.text());
        
        // This is non-escaped, non-encoded raw text.
        return text;
    }
}