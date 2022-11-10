import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [],
})
export class SearchComponent {
  @ViewChild('searchInput')
  input!: ElementRef<HTMLInputElement>;
  constructor(private readonly gifsService: GifsService) {}

  search() {
    const query = this.input.nativeElement.value;
    this.gifsService.searchGif(query);
    this.input.nativeElement.value = '';
  }
}
