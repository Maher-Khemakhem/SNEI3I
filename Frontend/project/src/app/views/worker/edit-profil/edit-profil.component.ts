import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { WorkerService } from '../../../services/worker.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import the Router service

@Component({
  selector: 'app-edit-profil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-profil.component.html',
  styleUrl: './edit-profil.component.css'
})
export class EditProfilComponent implements OnInit {
  loginService = inject(LoginService);
  workerService = inject(WorkerService);


  worker_id = localStorage.getItem('worker_id');
  firstname: any = "";
  lastname: any = "";
  email: any = "";
  num_tel: any;
  date_of_birth: any;
  speciality: any = "";
  description: any = "";
  location: any = "";
  price: any;
  certification: any;
  autre_service: any;
  photo: any;
  work_photos: any; // Updated to handle multiple photos
  selectedFiles: File[] = []; // Temporarily stores selected files
  list_localisation: string[] = [
    "tunis", "sfax", "Ariana", "Ben Arous", "Mannouba", "Bizerte", "Nabeul", "Beja", 
    "Jendouba", "Zaghouan", "Siliana", "Le Kef", "Sousse", "Monastir", "Mahdia", 
    "Kasserine", "Sidi Bouzid", "Kairouan", "Gafsa", "Gabes", "Medenine", 
    "Tozeur", "Kebili", "Ttataouine"
  ];

  ngOnInit(): void {
    this.workerService.getWorkerbyID(this.worker_id).subscribe((res: any) => {
      this.firstname = res.firstname;
      this.lastname = res.lastname;
      this.num_tel = res.num_tel;
      this.date_of_birth = this.formatDate(res.date_of_birth);
      this.speciality = res.speciality;
      this.description = res.description;
      this.location = res.location;
      this.price = res.price;
      this.certification = res.certification;
      this.autre_service = res.autre_service;
      this.photo = res.photo;
      this.work_photos = res.work_photo ;
     
    });
  }

  // Helper function to format date
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files); // Store selected files
    }
  }

  // Upload selected photos
  uploadPhotos(): void {
    this.selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.work_photos.push(reader.result as string); // Add Base64 string
        }
      };
      reader.readAsDataURL(file);
    });

    // Clear selected files after upload
    this.selectedFiles = [];
  }

  // Delete a photo by index
  deletePhoto(index: number): void {
    this.work_photos.splice(index, 1); // Remove photo from array
  }

  logout(): void {
    localStorage.removeItem("worker_id");
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    this.loginService.logout();
  }
  constructor(private router: Router) {} // Inject the Router service

  onSubmit(){
    const body = {
      "firstname":this.firstname,
      "lastname":this.lastname,
      "num_tel":this.num_tel,
      "date_of_birth":this.date_of_birth,
      "speciality":this.speciality,
      "description":this.description,
      "location":this.location,
      "price":this.price,
      "autre_service":this.autre_service,
      "work_photos":this.work_photos
    }
    this.workerService.updateWorker(this.worker_id, body).subscribe(
    (response) => {
      alert('Worker profile updated successfully!');
      console.log('Update response:', response);
      this.router.navigate(['/worker/profil']);
    },
    (error) => {
      
      console.error('Update error:', error);
    }
  );
  }
}
