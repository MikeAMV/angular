import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, GifsResponse } from '../types/gifs';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _apiKey = 'CZGOWs83eFnNLnQUz0d6dJCwKf3KgRAA';
  private _history: string[] = [];
  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGif(query: string) {
    if (!query.trim() || this._history.includes(query)) return;
    this._history.unshift(query);
    localStorage.setItem('history', JSON.stringify(this._history));
    this.http
      .get<GifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=${this._apiKey}&q=${query}&limit=10`
      )
      .subscribe((response: GifsResponse) => {
        this.results = response.data;
        localStorage.setItem(`${query}`, JSON.stringify(this.results));
        
      });
  }
}
