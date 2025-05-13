import {AfterViewInit, Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-job-form',
  imports: [ ReactiveFormsModule],
  templateUrl: './create-job-form.component.html',
  styleUrl: './create-job-form.component.css'
})
export class CreateJobFormComponent {
  jobForm: FormGroup;

  constructor(private formBuild: FormBuilder) {
    this.jobForm = this.formBuild.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(1000)]],
      overview: ['', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]],
      Location: ['', [Validators.required]],
      minBudget: ['', [ Validators.min(1)]],
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
}


