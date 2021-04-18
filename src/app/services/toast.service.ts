import { Injectable } from '@angular/core';
import { Toast, ToastModel } from '@syncfusion/ej2-notifications';

@Injectable()
export class ToastService {
  public toastInstance: Toast;
  public toastObj: Toast;

  constructor() {

  }

  createToast: Function = (element: HTMLElement, model: ToastModel): Toast => {
    if (!element.classList.contains('e-toast')) {
      this.toastObj = new Toast(model, element);
    }
    return this.toastObj
  };

  showToast: Function = (elemnet: HTMLElement, model: ToastModel) => {
    this.toastInstance = this.createToast(elemnet, model);
    this.toastInstance.show();
  }

  hideToast: Function = () => {
    if (this.toastInstance) {
      this.toastInstance.hide();
    }
  }

  hideToastAll: Function = () => {
    if (this.toastInstance) {
      this.toastInstance.hide('All');
    }
  }

}