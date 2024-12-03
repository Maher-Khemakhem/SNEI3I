import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { WorkerService } from '../../../services/worker.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css'] // Note: Corrected property name to `styleUrls`
})
export class EditProfilComponent implements OnInit {
  loginService = inject(LoginService);
  workerService = inject(WorkerService);

  worker_id = localStorage.getItem('worker_id');
  firstname = '';
  lastname = '';
  email = '';
  num_tel: string | null = null;
  date_of_birth: string | null = null;
  speciality = '';
  description = '';
  location = '';
  price: number | null = null;
  certification: string | null = null;
  autre_service: string | null = null;
  photo: string | null = null;
  work_photos: string[] = []; // Array to store photo URLs or Base64 strings
  selectedFiles: File[] = []; // Temporarily stores selected files

  list_localisation: string[] = [
    'tunis', 'sfax', 'Ariana', 'Ben Arous', 'Mannouba', 'Bizerte', 'Nabeul', 'Beja',
    'Jendouba', 'Zaghouan', 'Siliana', 'Le Kef', 'Sousse', 'Monastir', 'Mahdia',
    'Kasserine', 'Sidi Bouzid', 'Kairouan', 'Gafsa', 'Gabes', 'Medenine',
    'Tozeur', 'Kebili', 'Ttataouine'
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.worker_id) {
      this.workerService.getWorkerbyID(this.worker_id).subscribe((res: any) => {
        this.firstname = res.firstname || '';
        this.lastname = res.lastname || '';
        this.num_tel = res.num_tel || null;
        this.date_of_birth = this.formatDate(res.date_of_birth);
        this.speciality = res.speciality || '';
        this.description = res.description || '';
        this.location = res.location || '';
        this.price = res.price || null;
        this.certification = res.certification || null;
        this.autre_service = res.autre_service || null;
        this.photo = res.photo || null;
        this.work_photos = res.work_photo || [];
        //alert(this.work_photos);
      });
    }
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
      this.selectedFiles = Array.from(input.files);
    }
  }

  // Upload selected photos
  uploadPhotos(): void {
    this.selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          // Add Base64 string to work_photos
          this.work_photos.push(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    });

    // Clear selected files after processing
    this.selectedFiles = [];
  }

  // Delete a photo by index
  deletePhoto(index: number): void {
    this.work_photos.splice(index, 1);
  }

  // Logout function
  logout(): void {
    localStorage.removeItem('worker_id');
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    this.loginService.logout();
  }

  // Submit the updated profile
  onSubmit(): void {
    const body = {
      firstname: this.firstname,
      lastname: this.lastname,
      num_tel: this.num_tel,
      date_of_birth: this.date_of_birth,
      speciality: this.speciality,
      description: this.description,
      location: this.location,
      price: this.price,
      autre_service: this.autre_service,
      work_photos: this.work_photos
    };

    if (this.worker_id) {
      this.workerService.updateWorker(this.worker_id, body).subscribe(
        (response) => {
          alert('Worker profile updated successfully!');
          this.router.navigate(['/worker/profil']);
        },
        (error) => {
          console.error('Update error:', error);
        }
      );
    }
  }
}
