import { Component, Inject, inject, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../../services/client.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
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
  selector: 'app-update-admin',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,MatNativeDateModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,CommonModule],
  providers:[provideNativeDateAdapter()],
  templateUrl: './update-admin.component.html',
  styleUrl: './update-admin.component.css'
})
export class UpdateAdminComponent {
  private _formBuilder = inject(FormBuilder);
  firstFormGroup!: FormGroup;
  admin_id:any;
  photo:any;
  admin:any;
  constructor(private adminservice:AdminService,private clientservice:ClientService,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<UpdateAdminComponent>,private router:Router,private ngZone:NgZone) {}

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
    });
    this.adminservice.getAdminById(this.admin_id).subscribe((data: any) => {
      this.admin = data.admin;
      this.photo = this.admin.photo; // Set photo after fetching

      // Update the form with fetched data
      this.firstFormGroup.patchValue({
        firstname: this.admin.firstname,
        lastname: this.admin.lastname,
        Date_of_birth: this.admin.Date_of_birth,
        num_tel: this.admin.num_tel,
      });
    });
  }
  update(){
    const formData = {
      "firstname":this.firstFormGroup.value.firstname,
      "lastname":this.firstFormGroup.value.lastname,
      "Date_of_birth":this.firstFormGroup.value.Date_of_birth,
      "num_tel":this.firstFormGroup.value.num_tel,
      "photo":this.photo
    }
    this.adminservice.updateAdmin(this.admin_id, formData).subscribe(
      ()=>{
        console.log('Data updated successfully');
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
