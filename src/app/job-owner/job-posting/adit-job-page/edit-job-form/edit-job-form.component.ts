import {AfterViewInit, Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-edit-job-form',
  imports: [ReactiveFormsModule,RouterModule ],
  templateUrl: './edit-job-form.component.html',
  styleUrl: './edit-job-form.component.css'
})
export class EditJobFormComponent {
  jobForm: FormGroup;

  constructor(private formBuild: FormBuilder, private router: Router) {
    this.jobForm = this.formBuild.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(1000)]],
      overview: ['', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]],
      Location: ['', [Validators.required]],
      minBudget: ['', [Validators.min(1)]],
      maxBudget: ['', [Validators.required, Validators.min(1)]],
      endDate: ['', Validators.required],
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
  onSubmit() {

  }
  
  confirmCancel() {
    this.router.navigate(['/jobOwner/OwnerJobs']);
  }
  
}
