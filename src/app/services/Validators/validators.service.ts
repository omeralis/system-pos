import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  submitedForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
  setSubmiting(value:boolean){
    this.submitedForm.next(value);
  }
}
