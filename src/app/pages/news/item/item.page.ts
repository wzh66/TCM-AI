import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../news.service';
import {LocationStrategy} from '@angular/common';

@Component({
    selector: 'app-news-item',
    templateUrl: './item.page.html',
    styleUrls: ['./item.page.scss'],
})
export class NewsItemPage {
    id = this.route.snapshot.params.id;
    news;

    constructor(private route: ActivatedRoute,
                private newsSvc: NewsService,
                private location: LocationStrategy) {
        this.newsSvc.getNewsDetail(this.id).subscribe(res => {
            this.news = res;
            this.news.detail = this.news.detail.replace(/src="/gi, 'src="api');
        });
    }

    back() {
        this.location.back();
    }
}
