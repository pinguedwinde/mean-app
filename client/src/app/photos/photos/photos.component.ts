import { photosSelector } from "./../shared/store/photos.selectors";
import { select } from "@ngrx/store";
import { Component, OnInit } from "@angular/core";
import { State } from "@mean-app/shared/store";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Photo } from "../shared/models/photo.model";

@Component({
  selector: "app-photos",
  templateUrl: "./photos.component.html",
  styleUrls: ["./photos.component.css"],
})
export class PhotosComponent implements OnInit {
  public photos$: Observable<Photo[]>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.photos$ = this.store.pipe(select(photosSelector));
  }
}
