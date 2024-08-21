import { AbstractControl, ValidationErrors } from "@angular/forms";

export class EmpidValidators{
    static isEmpIdValidators(control:AbstractControl) : ValidationErrors | null{
    
        let val = control.value as string;

        if(val){
            let regexp = /^[A-Z]\d{3}$/;

            let isValid=regexp.test(val);

            if(isValid){
                return null;
            }else{
                return{
                    IsValidEmpId :'Emp id shoud start with 1 alphabet and end with 3 number'
                }
            }
        }else{
            return null;
        }

  
}
}