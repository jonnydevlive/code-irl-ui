import { Component } from '@angular/core';
import { Control, FORM_DIRECTIVES } from '@angular/common'
import { TagService, TagList, TagsComponent } from '../shared'

import { Observable } from 'rxjs/Rx';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'home'
    selector: 'home',  // <home></home>
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [
        Title
    ],
    // We need to tell Angular's compiler which directives are in our template.
    // Doing so will allow Angular to attach our behavior to an element
    directives: [
        TagsComponent,
        XLarge,
        FORM_DIRECTIVES
    ],
    // We need to tell Angular's compiler which custom pipes are in our template.
    pipes: [],
    // Our list of styles in our component. We may add more to compose many styles together
    styles: [require('./home.css')],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: require('./home.html')
})
export class Home {
    // Set our default values
    // TypeScript public modifiers
    tagName: string;
    tagControl = new Control();
    tags: Observable<any>;
    tagList = new TagList();
    constructor(public appState: AppState, public title: Title, private tagService: TagService) {
        this.tags = this.tagControl.valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .switchMap(tagName => {
                if (tagName === "") {
                    return Observable.of([]);
                } else {
                    return this.tagService.getTags(tagName);
                }
            });
    }

    addTag(tag) {
        this.tagName = "";
        this.tagList.addTag(tag);
    }
}
