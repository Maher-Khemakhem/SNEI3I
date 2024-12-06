import { Component, Inject, inject, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../../services/client.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  
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
import { WorkerService } from '../../../../services/worker.service';
@Component({
  selector: 'app-update-worker',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,MatNativeDateModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,CommonModule],
  providers:[provideNativeDateAdapter()],
  templateUrl: './update-worker.component.html',
  styleUrl: './update-worker.component.css'
})
export class UpdateWorkerComponent {
  private _formBuilder = inject(FormBuilder);
  firstFormGroup!: FormGroup;
  worker_id:any;
  photo:any;
  worker:any;
  constructor(private workerservice:WorkerService,private clientservice:ClientService,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<UpdateWorkerComponent>,private router:Router,private ngZone:NgZone) {}

  ngOnInit(): void {
    
    this.worker_id = this.data.id;
    
    this.firstFormGroup = this._formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      Date_of_birth: ['', Validators.required],
      num_tel: [
        '',
        [Validators.required, Validators.pattern(/^\d{8,15}$/)],
      ],
    });
    this.workerservice.getWorkerbyID(this.worker_id).subscribe((data: any) => {
      this.worker = data;
      this.photo = this.worker.photo; // Set photo after fetching

      // Update the form with fetched data
      this.firstFormGroup.patchValue({
        firstname: this.worker.firstname,
        lastname: this.worker.lastname,
        Date_of_birth: this.worker.date_of_birth,
        num_tel: this.worker.num_tel,
      });
      console.log(this.worker.date_of_birth);
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
    this.workerservice.updateWorker(this.worker_id, formData).subscribe(
      ()=>{
        console.log('Data updated successfully');
        this.ngZone.run(()=>{
          this.router.navigateByUrl('/admin/gerer-worker').then(() => {
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
