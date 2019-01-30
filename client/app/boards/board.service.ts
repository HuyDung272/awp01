import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BaseService } from '../shared/services';

@Injectable()
export class BoardService {
  constructor(private http: Http, private baseService: BaseService) { }

  private getUrl = '/api/boards';
  private saveUrl = '/api/board';

  getAllBoards(): Observable<any> {
    return this.baseService.getAll(this.getUrl);
  }

  countAllBoards(): Observable<any> {
    return this.baseService.count(this.saveUrl + '/count').map(res => res.json());
  }

  getBoardByProject(board: any): Observable<any> {
    return this.http.get(this.getUrl + `/${board.project_id}`).map(res => res.json());
  }

  addBoard(board: any): Observable<any> {
    return this.baseService.add(this.saveUrl, board);
  }

  getBoard(board: any) {
    return this.baseService.getById(this.saveUrl, board);
  }

  editBoard(board: any): Observable<any> {
    return this.baseService.editById(this.saveUrl, board);
  }

  deleteBoard(board: any): Observable<any> {
    return this.baseService.deleteById(this.saveUrl, board);
  }

}
