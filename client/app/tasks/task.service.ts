import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BaseService } from '../shared/services';

@Injectable()
export class TaskService {
  constructor(private http: Http, private baseService: BaseService) { }

  private getUrl = '/api/tasks';
  private saveUrl = '/api/task';

  getAllTasks(): Observable<any> {
    return this.baseService.getAll(this.getUrl);
  }

  getTaskByBoardId(task: any, progress: any): Observable<any> {
    return this.http.get(this.getUrl + `/${progress}/${task.board_id}`).map(res => res.json());
  }

  getTaskByDev(task: any, progress: any): Observable<any> {
    return this.http.get(this.getUrl + `/dev/${progress}/${task.developer_id}`).map(res => res.json());
  }

  countAllTasks(): Observable<any> {
    return this.baseService.count(this.saveUrl + '/count').map(res => res.json());
  }

  addTask(task: any): Observable<any> {
    return this.baseService.add(this.saveUrl, task);
  }

  getTask(task: any) {
    return this.baseService.getById(this.saveUrl, task);
  }

  editTask(task: any): Observable<any> {
    return this.baseService.editById(this.saveUrl, task);
  }

  deleteTask(task: any): Observable<any> {
    return this.baseService.deleteById(this.saveUrl, task);
  }

}
