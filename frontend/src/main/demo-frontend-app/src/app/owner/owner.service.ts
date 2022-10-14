import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OwnerDto } from './dto/owner.dto'

@Injectable()
export class OwnerService {

  private url = "/api/owner";

  constructor(private httpClient: HttpClient) {

  }

  getOwners(): Observable<OwnerDto[]> {
    return this.httpClient.get<OwnerDto[]>(this.url);
  }

  createOwner(owner: OwnerDto){
      return this.httpClient.post(this.url, owner);
  }
  updateOwner(owner: OwnerDto) {
      return this.httpClient.put(this.url + '/' + owner.id, owner);
  }
  deleteOwner(id: number){
      return this.httpClient.delete(this.url + '/' + id);
  }
}