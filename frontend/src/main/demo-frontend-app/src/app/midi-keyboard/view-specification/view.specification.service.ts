import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpecificationDto } from './../dto/specification.dto';

@Injectable()
export class ViewSpecificationService {

  constructor(private httpClient: HttpClient) {

  }

  getSpecificationById(specificationId): Observable<SpecificationDto> {
    return this.httpClient.get<SpecificationDto>('/api/specification/' + specificationId);
  }

  updateSpecification(specificationId: number, updatedSpecification: SpecificationDto) {
    return this.httpClient.put<SpecificationDto>('api/specification/' + specificationId, updatedSpecification)
  }
}
