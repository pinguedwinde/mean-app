import { Injectable } from "@angular/core";
import { from } from "rxjs";
import { map } from "rxjs/operators";
import { createApi } from "unsplash-js";
import { ApiResponse } from "unsplash-js/dist/helpers/response";
import { Photos } from "unsplash-js/dist/methods/search/types/response";

@Injectable({
  providedIn: "root",
})
export class PhotosService {
  private unsplash = createApi({
    accessKey:
      "d735ade0117e703f4c8b2ef98cfd27879291d34c8de2d7dd261616f684df435c",
  });

  // private unsplash = new Unsplash({
  //   applicationId:
  //     "d735ade0117e703f4c8b2ef98cfd27879291d34c8de2d7dd261616f684df435c",
  //   secret: "3860e72b9a84352726954fc3ce5820b4ee3f4e6751dbd6004e3ea4835c45cbd6",
  //   callback: "http://127.0.0.1:3000/unsplash",
  // });
  constructor() {}

  public getPhotos(search: string) {
    return from(
      this.unsplash.search
        .getPhotos({ query: search, page: 1, perPage: 100 })
        .then((value: ApiResponse<Photos>) => {
          return value.response;
        })
    ).pipe(
      map((res) => {
        return res.results.map((r) => ({ url: r.urls.small }));
      })
    );
  }
}
