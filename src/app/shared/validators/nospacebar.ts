import { AbstractControl, ValidationErrors } from "@angular/forms";

export class Nospacevalidator{
  static noSpace(control:AbstractControl) : ValidationErrors | null{
      let val = control.value as string;

      if(!val){
        return null;
      }else{
        if(val.includes(" ")){
          return {
            noSpacebar : 'space is not allowed'
          }
        }else{
            return null
        }
      }
  }
}