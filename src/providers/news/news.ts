import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs';
import { news } from '../../models/news';
import { Observable } from 'rxjs/Observable';
import { tap , take} from 'rxjs/operators';

/*
  Generated class for the NewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsProvider {
  private _news$ = new BehaviorSubject<news[]>([]); // 1
  batch = 4; // 2
  lastKey = ''; // 3
  finished = false; // 4
  constructor(
    private db: AngularFireDatabase
 ) {
  this.nextPage()
  .pipe(take(1))
  .subscribe();
 }

 get movies$(): Observable<news[]> {
  return this._news$.asObservable();
}
mapListKeys<T>(list: AngularFireList<T>): Observable<T[]> {
  return list
     .snapshotChanges()
     .map(actions =>
        actions.map(action =>
           ({ key: action.key, ...action.payload.val() })
        )
     );
}
private getMovies(batch: number, lastKey: string): // 1 e 2
Observable<news[]>
{
   return this.mapListKeys<news>( // 3
      this.db.list<news>('news', ref => { // 4
         const query = ref
            .orderByChild('title')
            .limitToFirst(batch);
         return (this.lastKey) // 5
            ? query.startAt(this.lastKey)
            : query;
       })
   );
}
nextPage(): Observable<news[]> {
  if (this.finished) { return this.movies$; } // 1
  return this.getMovies(this.batch + 2, this.lastKey) // 2
     .pipe(tap(news => {
           this.lastKey = news[news.length -1]['title']; // 3
           const newMovies = news.slice(0, this.batch); // 4
           const currentMovies = this._news$.getValue(); // 5
           if (
             this.lastKey
             == newMovies[newMovies.length -1]['title']
           ) { // 6
                this.finished = true;
           }
           this._news$.next(currentMovies.concat(newMovies)); // 7
          })
     );
}
}
