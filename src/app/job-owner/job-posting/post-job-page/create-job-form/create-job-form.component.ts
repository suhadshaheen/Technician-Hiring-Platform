import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { JobService } from '../../../../../services/Jobservice.service';
import { JobPhotoService } from '../../../../../services/jobPhotos.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-job-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule ],
  templateUrl: './create-job-form.component.html',
  styleUrls: ['./create-job-form.component.css']
})
export class CreateJobFormComponent implements OnInit {
  jobForm: FormGroup;
  isEditMode = false;
  jobId!: number;
  selectedImages: File[] = [];
  imagePreviews: string[] = [];
  existingImages: { id: number, url: string }[] = [];
  imagesToDelete: number[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private jobPhotoService : JobPhotoService,
    private route: ActivatedRoute,
    private router: Router 
  ) {
    this.jobForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
      job_requirements: ['', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]],
      location: ['', [Validators.required]],
      budget: ['', [Validators.min(10)]],
      experience: ['', [Validators.required]],
      deadline: ['', Validators.required],
      workLevel: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.jobId = Number(idParam);

      this.jobService.getJobById(this.jobId).subscribe(job => {
        this.jobForm.patchValue({
          ...job,
          workLevel: job.work_level  
        });

        // one job photos upload
        this.jobPhotoService.getPhotosByJobId(this.jobId).subscribe(photos => {
          this.imagePreviews = photos.map((photo: any) => photo.photo_path); 
        });
      });

    this.jobPhotoService.getPhotosByJobId(this.jobId).subscribe(photos => {
    console.log("Loaded photos from backend:", photos);
    
    this.imagePreviews = photos.map(p => p.photo_path); 
    
    // give old photos an id
    this.existingImages = photos.map(p => ({
      id: p.id,
      url: p.photo_path
    }));
  });

    }
  }


  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);

      if (this.selectedImages.length + files.length > 5) {
        alert("You can upload a maximum of 5 images.");
        return;
      }

      //more than one pic
      files.forEach(file => {
        this.selectedImages.push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });

      console.log('Selected Images:', this.selectedImages);
    }
  }

  onSubmit(): void {
      if (this.jobForm.invalid) {
        alert("Please fill all required fields.");
        return;
      }

      const jobOwnerId = localStorage.getItem('userId');
      const jobData = new FormData();

      Object.entries(this.jobForm.value).forEach(([key, value]) => {
        jobData.append(key, String(value));
      });

      jobData.append('job_owner_id', jobOwnerId || '');
      jobData.append('experience', String(this.jobForm.value.experience));
      jobData.append('work_level', this.jobForm.value.workLevel);
      jobData.append('attempts', '0');

      const handleImageUploadAndDeletion = (jobId: number) => {
        const deleteObservables = this.imagesToDelete.map(id => 
          this.jobPhotoService.deletePhoto(id)
        );

        Promise.all(deleteObservables.map(obs => obs.toPromise()))
          .then(() => {
            this.imagesToDelete = [];

            if (this.selectedImages.length > 0) {
              this.jobPhotoService.uploadPhotos(jobId, this.selectedImages).subscribe({
                next: () => {
                  alert("Job updated successfully with images!");
                  this.jobForm.enable();
                },
                error: (err) => {
                  console.error("Error uploading images:", err);
                  alert("Job updated, but image upload failed.");
                }
              });
            } else {
              alert("Job posted/updated successfully!");
            }
          })
          .catch(err => {
            console.error("Error deleting photos:", err);
            alert("Failed to delete some images.");
          });
      };

      if (this.isEditMode) {
        jobData.append('_method', 'PUT');
        this.jobService.updateJob(this.jobId, jobData).subscribe({
          next: () => {
            handleImageUploadAndDeletion(this.jobId);
          },
          error: (err) => {
            console.error("Error updating job:", err);
            alert("Failed to update job.");
          }
        });
      } else {
        this.jobService.postJob(jobData).subscribe({
          next: (response) => {
            const jobId = response.job?.id || response.id;
            handleImageUploadAndDeletion(jobId);
          },
          error: (err) => {
            console.error("Error posting job:", err);
            alert("Failed to post job.");
          }
        });
      }
    }
    
  confirmCancel() : void{
    this.router.navigate(['/jobOwner/OwnerJobs']);
  }

  removeImage(index: number): void {
    const removedPreview = this.imagePreviews[index];

    const existing = this.existingImages.find(img => img.url === removedPreview);

    if (existing) {
      // store the photos selected to delete without deletion 
      this.imagesToDelete.push(existing.id);
      // remove from existingImages
      this.existingImages = this.existingImages.filter(img => img.id !== existing.id);
    } else {
      const newImageIndex = index - this.existingImages.length;
      if (newImageIndex >= 0) {
        this.selectedImages.splice(newImageIndex, 1);
      }
    }

    this.imagePreviews.splice(index, 1);
  }

  getImageUrl(photoPath: string): string {
    if (!photoPath) return ''; 
    if (photoPath.startsWith('data:')) return photoPath;
    if (photoPath.startsWith('http')) return photoPath; 
    return `http://127.0.0.1:8000/storage/${photoPath}`;
  }

}