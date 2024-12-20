import { Component, Inject, inject, NgZone, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import {
  MatNativeDateModule,
  ErrorStateMatcher,
  MatOptionModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../../services/client.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css'], // Fixed 'styleUrls'
})
export class UpdateClientComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  firstFormGroup!: FormGroup;
  client_id:any;
  photo:any;
  client:any;
  constructor(private clientservice:ClientService,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<UpdateClientComponent>,private router:Router,private ngZone:NgZone) {}

  ngOnInit(): void {
    
    this.client_id = this.data.id;
    
    this.firstFormGroup = this._formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      Date_of_birth: ['', Validators.required],
      num_tel: [
        '',
        [Validators.required, Validators.pattern(/^\d{8,15}$/)],
      ],
    });
    this.clientservice.getClientById(this.client_id).subscribe((data: any) => {
      this.client = data;
      this.photo = this.client.photo; // Set photo after fetching

      // Update the form with fetched data
      this.firstFormGroup.patchValue({
        firstname: this.client.firstname,
        lastname: this.client.lastname,
        Date_of_birth: this.client.Date_of_birth,
        num_tel: this.client.num_tel,
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
    this.clientservice.updateClient(this.client_id, formData).subscribe(
      ()=>{
        console.log('Data updated successfully');
        this.ngZone.run(()=>{
          this.router.navigateByUrl('/admin/gerer-client').then(() => {
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
