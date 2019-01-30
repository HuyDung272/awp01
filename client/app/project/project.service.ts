import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BaseService } from '../shared/services';

@Injectable()
export class ProjectService {
  constructor(private http: Http, private baseService: BaseService) { }

  private getUrl = '/api/projects';
  private saveUrl = '/api/project';

  getAllProjects(): Observable<any> {
    return this.baseService.getAll(this.getUrl);
  }

  getProjectByPM(project: any): Observable<any> {
    return this.http.get(this.getUrl + `/${project.manage_by}`).map(res => res.json());
  }

  getProjectByProject(project: any): Observable<any> {
    return this.http.get(this.saveUrl + `/project/${project._id}`).map(res => res.json());
  }

  countAllProjects(): Observable<any> {
    return this.baseService.count(this.saveUrl + '/count').map(res => res.json());
  }

  addProject(project: any): Observable<any> {
    return this.baseService.add(this.saveUrl, project);
  }

  getProject(project: any) {
    return this.baseService.getById(this.saveUrl, project);
  }

   // Get by id
  getByBoard(board: any): Observable<any> {
    return this.http.get(this.saveUrl  + `/board/${board.project_id}`).map(res => res.json());
  }

  editProject(project: any): Observable<any> {
    return this.baseService.editById(this.saveUrl, project);
  }

  deleteProject(project: any): Observable<any> {
    return this.baseService.deleteById(this.saveUrl, project);
  }

}
