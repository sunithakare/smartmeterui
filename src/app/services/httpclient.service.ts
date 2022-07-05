import { HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { observable, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpclientService {
  [x: string]: any;
  publicHttpClient:HttpClient;
  // Define API
  httpOptions : any    = {

  withCredentials: true,

    // headers: new HttpHeaders({
    //   // 'Content-Type':  'application/json',

    //   // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    //   // "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    //   // 'Access-Control-Allow-Origin': '*'
    // })
  }
  constructor(private http: HttpClient, backend: HttpBackend,private router: Router) {
    this.publicHttpClient = new HttpClient(backend);
   }

   publicGet(url:string): Observable<any> {
    return this.publicHttpClient.get<any>(environment.BASE_URL + url)
    .pipe(
      // retry(1),
      catchError(this.handleError)
    )
  }

  publicgetwithParam(url:string,queryParams:any): Observable<any> {
    const params = new HttpParams({ fromObject: queryParams });
    return this.publicHttpClient.get<any>(environment.BASE_URL + url,{params:params})
    .pipe(
      // retry(1),
      catchError(this.handleError)
    )
  }

  publicPost(url:string,body:any): Observable<any> {
    return this.publicHttpClient.post<any>(environment.BASE_URL + url,body)
    .pipe(
      // retry(1),
      catchError(this.handleError)
    )
  }

  get(url:string): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + url,this.httpOptions)
    .pipe(
      // retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API post() method =>
  post(url:string,body:any): Observable<any> {
    return this.http.post<any>(environment.BASE_URL + url,body,this.httpOptions)
    .pipe(
      // retry(1),
      catchError(this.handleError)
    )
  }

  delete(url:string): Observable<any> {
    return this.http.delete<any>(environment.BASE_URL + url,this.httpOptions)
    .pipe(
      // retry(1),
      catchError(this.handleError)
    )
  }

  uploadFile(url:string,body:any): Observable<any> {

    // var uploadOptions : any    = {

    //   withCredentials: true,

    //     headers: new HttpHeaders({
    //       'Content-Type':  'multipart/form-data',
    //     })
    //   };

    return this.http.put<any>(environment.BASE_URL + url,body,this.httpOptions)
    .pipe(
      // retry(1),
      catchError(this.handleError)
    )
  }
  //Create by developer
  uploadFilePost(url:string,body:any): Observable<any> {



    return this.http.post<any>(environment.BASE_URL + url,body,this.httpOptions)
    .pipe(
      // retry(1),
      catchError(this.handleError)
    )
  }
  // // HttpClient API post() method =>
  // postWithParam(url:string,body:any): Observable<any> {
  //   return this.http.post<any>(environment.BASE_URL + url,body,this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

  getPageablforURL(url:string,page:number,size:number): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + url+'?page='+page+'&size='+size)
    .pipe(
      // retry(1),
      catchError(this.handleError)
    )
  }
  getwithParam(url:string,queryParams:any): Observable<any> {
    const params = new HttpParams({ fromObject: queryParams });
    return this.http.get<any>(environment.BASE_URL + url,{params:params})
    .pipe(
      // retry(1),
      catchError(this.handleError)
    )
  }
  getResponse(url:string): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + url)
    .pipe(
      // retry(1),
      catchError(this.handleError)
    )
  }

  downloadusingPost(url:string,body:any): Observable<any> {
    return this.http.post(environment.BASE_URL + url,body,{responseType: 'blob',  withCredentials: true})
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  downloadusingGet(url:string,queryParams:any): Observable<any> {
    return this.http.get(environment.BASE_URL + url,{responseType: 'blob',  withCredentials: true,params:queryParams})
    .pipe(
      // retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling
  handleError(error:any) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
       console.log(JSON.stringify(error.error));
       console.log(JSON.stringify(error));
if (error instanceof HttpErrorResponse) {
  if (error.status==401) {
    this.router.navigate(['/home'])
    .then(value => {
      window.location.reload();
  })
  }
}

     }
    //  window.alert(errorMessage);
     return throwError(() => error);
  }

}

export interface APIResponse {
  status:   string;
  httpcode: number;
  message:  string;
  data:     any;
}

export interface PageableResponse {
  status:   string;
  httpcode: number;
  message:  string;
  data:     Data;
}

export interface Data {
  content:          any[];
  pageable:         Pageable;
  last:             boolean;
  totalPages:       number;
  totalElements:    number;
  size:             number;
  number:           number;
  sort:             Sort;
  numberOfElements: number;
  first:            boolean;
  empty:            boolean;
}

export interface Pageable {
  sort:       Sort;
  offset:     number;
  pageSize:   number;
  pageNumber: number;
  paged:      boolean;
  unpaged:    boolean;
}

export interface Sort {
  empty:    boolean;
  sorted:   boolean;
  unsorted: boolean;
}

export interface ConfigCode {
  codeType:   string;
  shortCode: string;
  shortDescription: string ;
}
