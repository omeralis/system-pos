import { Injectable , TemplateRef  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertifyServiceService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast:any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
  constructor() { }
  
  success(message: string) {
    this.show(message, { classname: 'bg-success text-light', delay: 10000 })
  }
  error(message: string) {
    this.show(message, { classname: 'bg-danger text-light', delay: 15000 });
  }

}
