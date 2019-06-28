import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { news } from '../../models/news';
import { NewsProvider } from '../../providers/news/news';
import {take} from 'rxjs/operators'
import { DetailPage } from '../detail/detail';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  news$: Observable<news[]>;

  constructor(public navCtrl: NavController, private newsS:NewsProvider) {

  }
  ionViewDidLoad() {
   this.news$ =  this.newsS.movies$;
 }


 doInfinite(infiniteScroll:any): Promise<void> { // 1
  console.log('hi');
  console.log(this.newsS.finished);
  if (!this.newsS.finished) { // 2
     return new Promise((resolve, reject) => {
        this.newsS.nextPage() // 3
           .pipe(take(1))
           .subscribe(news => {
              console.log('Movies:', news);
              resolve();
           });
     });
  }
  return Promise.resolve();
}

detail(movie){
  this.navCtrl.push(DetailPage, movie);
}

}
