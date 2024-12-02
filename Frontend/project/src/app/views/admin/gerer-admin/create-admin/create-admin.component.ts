import { Component, Inject, inject, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { ClientService } from '../../../../services/client.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import {
  MatNativeDateModule,
  ErrorStateMatcher,
  MatOptionModule,
  
} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-admin',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,MatNativeDateModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,CommonModule],
  providers:[provideNativeDateAdapter()],
  templateUrl: './create-admin.component.html',
  styleUrl: './create-admin.component.css'
})
export class CreateAdminComponent {
  private _formBuilder = inject(FormBuilder);
  firstFormGroup!: FormGroup;
  admin_id:any;
  photo:any;
  admin:any;
  constructor(private adminservice:AdminService,private clientservice:ClientService,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<CreateAdminComponent>,private router:Router,private ngZone:NgZone) {}

  ngOnInit(): void {
    
    this.admin_id = this.data.id;
    
    this.firstFormGroup = this._formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      Date_of_birth: ['', Validators.required],
      num_tel: [
        '',
        [Validators.required, Validators.pattern(/^\d{8,15}$/)],
      ],
      email:['',Validators.required],
      password:['',Validators.required],
    });
    
  }
  create(){
    const formData = {
      "firstname":this.firstFormGroup.value.firstname,
      "lastname":this.firstFormGroup.value.lastname,
      "Date_of_birth":this.firstFormGroup.value.Date_of_birth,
      "num_tel":this.firstFormGroup.value.num_tel,
      "photo":this.photo,
      "email":this.firstFormGroup.value.email,
      "password":this.firstFormGroup.value.password,
    }
    this.adminservice.createAdmin(formData).subscribe(
      ()=>{
        console.log('Data Created successfully');
        this.ngZone.run(()=>{
          this.router.navigateByUrl('/admin/gerer-admin').then(() => {
            this.data = {err:true};
            this.dialogRef.close(this.data); // Close the modal
            //window.location.reload(); // Refresh the page
          });
        },(err:any)=>{
          console.log(err);
        })
      }
    );
  }
  onPhotoUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photo = reader.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
