import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { JobService } from '../../../../../services/Jobservice.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-job-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule ],
  templateUrl: './create-job-form.component.html',
  styleUrls: ['./create-job-form.component.css']
})
export class CreateJobFormComponent implements OnInit {
  jobForm: FormGroup;
  isEditMode = false;
  jobId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
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
        this.jobForm.patchValue(job);
      });
    }
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imagePreview = reader.result;
        console.log('Preview Image: ', imagePreview);
        // You can store this preview if needed for UI
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.jobForm.invalid) {
      alert("Please fill all required fields.");
      return;
    }

    const jobOwnerId = localStorage.getItem('userId');
    const jobData = {
      ...this.jobForm.value,
      job_owner_id: jobOwnerId,
      experience: String(this.jobForm.value.experience),
      attempts: 0
    };

    if (this.isEditMode) {
      this.jobService.updateJob(this.jobId, jobData).subscribe({
        next: (response) => {
          console.log("Job updated successfully:", response);
          alert("Job updated successfully!");
        },
        error: (error: HttpErrorResponse) => {
          console.error("Error updating job:", error);
          alert("Failed to update job.");
        }
      });
    } else {
      this.jobService.postJob(jobData).subscribe({
        next: (response) => {
          console.log("Job created successfully:", response);
          alert("Job posted successfully!");
          this.jobForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          console.error("Error posting job:", error);
          alert("Failed to post job.");
        }
      });
    }
  }
  
confirmCancel() : void{
  this.router.navigate(['/jobOwner/OwnerJobs']);
}

  
}
