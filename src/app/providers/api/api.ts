import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import environment from '../../../environments/environment';


/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable({
  providedIn: 'root'
})
export class Api {
  static url: string = `${environment.apiUrl}/v1`;

  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: any, reqOpts?: any): Observable<any> {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(Api.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any): Observable<any> {
    return this.http.post(Api.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any): Observable<any> {
    return this.http.put(Api.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any): Observable<any> {
    return this.http.delete(Api.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any): Observable<any> {
    return this.http.patch(Api.url + '/' + endpoint, body, reqOpts);
  }

}
