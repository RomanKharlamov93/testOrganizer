import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import * as moment from 'moment';
import {Observable} from "rxjs";



export interface Events {
  id?: string,
  title: string,
  date?: string
}

interface CreateResponse {
  name: string
}


@Injectable({
  providedIn: 'root'
})

export class EventService {
  static url = 'https://myorganizer2.firebaseio.com/events';

  constructor(private http: HttpClient) {

  }

  load(date: moment.Moment): Observable<Events[]> {
    return this.http
      .get<Events[]>(`${EventService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(events => {
        if (!events) {
          return []
        }
        return Object.keys(events).map(key => ({...events[key], id: key}))
      }))
  }

  remove(someEvent: Events): Observable<void> {
    return this.http.delete<void>(`${EventService.url}/${someEvent.date}/${someEvent.id}.json`)
  }

  create(someEvent: Events): Observable<Events> {
    return this.http.post<CreateResponse>(`${EventService.url}/${someEvent.date}.json`, someEvent)
      .pipe(map(res => {
        console.log('Response:', res);
        return {...someEvent, id: res.name}
      }))
  }
}
