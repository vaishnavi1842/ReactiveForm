import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from './shared/const/validationpattern';
import { Nospacevalidator } from './shared/validators/nospacebar';
import { EmpidValidators } from './shared/validators/empidvalidators';
import { COUNTRIES_META_DATA } from './shared/const/countriesdata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ReactiveForm';
  signUpForm !: FormGroup;
  genderArr:Array<string> =["femail","male", "others"];
  countryArr= COUNTRIES_META_DATA;
  ngOnInit(): void {
    this.createSignUpForm()
    this.confirmPassMatch()
    this.confirmPassHandler()
    this.signUpForm.get('currentAddress')
    ?.valueChanges
    .subscribe(res=>{
      if(this.signUpForm.get('currentAddress')?.valid){
        this.signUpForm.controls['isAddSame'].enable()
      }else{
        this.signUpForm.controls['isAddSame'].disable()
        this.signUpForm.controls['isAddSame'].patchValue(false)
      }
    })


    this.signUpForm.controls['isAddSame'].valueChanges
    .subscribe(res=>{
      if(res){
        this.signUpForm.controls['permantAddress'].patchValue(this.signUpForm.controls['currentAddress'].value);
        this.signUpForm.controls['permantAddress'].disable()
      }else{
        this.signUpForm.controls['permantAddress'].reset()
        this.signUpForm.controls['permantAddress'].enable()

      }
    })

    
  }

  createSignUpForm(){
    this.signUpForm = new FormGroup({
      username : new FormControl(null,[Validators.required,Validators.minLength(5), Validators.maxLength(12),
        Validators.pattern(CustomRegex.username), Nospacevalidator.noSpace
      ]),
      email : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.email), Nospacevalidator.noSpace ]),
      empId: new FormControl(null,[Validators.required, EmpidValidators.isEmpIdValidators ]),
      gender : new FormControl(null,[Validators.required]),
      currentAddress : new FormGroup({
        country :  new FormControl(null,Validators.required),
        state :  new FormControl(null,Validators.required),
        city :  new FormControl(null,Validators.required),
        zipcode :  new FormControl(null,Validators.required)
      }),
      permantAddress : new FormGroup({
        country :  new FormControl(null,Validators.required),
        state :  new FormControl(null,Validators.required),
        city :  new FormControl(null,Validators.required),
        zipcode :  new FormControl(null,Validators.required)
      }),
      isAddSame:new FormControl({value:false, disabled:true}),
      skills : new FormArray([new FormControl (null,[Validators.required])]),
      password : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.password)]),
      confirmpassword : new FormControl({value:null,disabled:true},[Validators.required]),

    })
  }

  OnSignUp(){
    console.log(this.signUpForm.getRawValue());
    console.log(this.signUpForm);  
  }

  get SkillFormArr(){
    return this.signUpForm.get('skills') as FormArray
  }

  onSkillAdd(){
   if(this.SkillFormArr.length<5){
    let getSkillControl= new FormControl(null,[Validators.required]);
    this.SkillFormArr.push(getSkillControl)
   }
  }

  onSkillRemove(i:number){
    this.SkillFormArr.removeAt(i)
  }

  confirmPassMatch(){
    this.signUpForm.get('confirmpassword')
    ?.valueChanges
    .subscribe(res=>{
      if(this.signUpForm.controls['password'].value!==res){
        this.signUpForm.controls['confirmpassword']?.setErrors({invalid :true})
      }else{
        this.signUpForm.controls['confirmpassword']?.setErrors(null)
    
      }
    })
  }

  confirmPassHandler(){
    this.signUpForm.get('password')
    ?.valueChanges
    .subscribe(res=>{
      if(this.signUpForm.controls['password']?.value){
        this.signUpForm.controls['confirmpassword']?.enable()
      }else{
        this.signUpForm.controls['confirmpassword']?.disable()
    
      }
    })
  }

  }

