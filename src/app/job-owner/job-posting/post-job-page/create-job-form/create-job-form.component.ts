import {AfterViewInit, Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { JobService } from '../../../../../services/Jobservice.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-job-form',
  imports: [ ReactiveFormsModule],
  templateUrl: './create-job-form.component.html',
  styleUrl: './create-job-form.component.css'
})
export class CreateJobFormComponent {
  jobForm: FormGroup;
  constructor(private formBuild: FormBuilder, private jobService: JobService) {
    this.jobForm = this.formBuild.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
      job_requirements: ['', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]],
      location: ['', [Validators.required]],
      budget: ['', [ Validators.min(10)]],
      experience: ['', [Validators.required]],
      deadline: ['', Validators.required],
      workLevel: ['', Validators.required]
    });
  }

  onImageSelected(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
   
    const reader = new FileReader();
    reader.onload = () => {
      const imagePreview = reader.result;
      console.log('Preview Image: ', imagePreview);
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

  this.jobService.postJob(jobData).subscribe({
  next: (response: any) => {
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


