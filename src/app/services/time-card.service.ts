import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeCard } from '../domain/time-card.model';
import { Page } from '../domain/page.model';

@Injectable({
    providedIn: 'root'
})
export class TimeCardService {
    private apiUrl = 'http://localhost:8080/api/v1/timecards';

    constructor(private http: HttpClient) { }

    submitFormData(data: TimeCard): Observable<TimeCard> {
        return this.http.post<TimeCard>(this.apiUrl, data);
    }
    
    getAllTimeCards(): Observable<Page<TimeCard>> {
        return this.http.get<Page<TimeCard>>(this.apiUrl);
    }
}
