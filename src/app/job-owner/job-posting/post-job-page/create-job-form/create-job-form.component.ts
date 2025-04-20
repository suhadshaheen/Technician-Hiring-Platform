import {AfterViewInit, Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import Dropzone from 'dropzone';
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
      skills: ['', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]],
      experience: ['', [Validators.required, Validators.min(0)]],
      minBudget: ['', [Validators.required, Validators.min(1)]],
      maxBudget: ['', [Validators.required, Validators.min(1)]],
      endDate: ['', Validators.required],
      employeeType: ['', Validators.required]
    });

  }
  ngAfterViewInit(): void {
    Dropzone.autoDiscover = false;

    new Dropzone('#myDropzone', {
      paramName: 'file',
      maxFilesize: 2,
      acceptedFiles: '.png,.jpg,.jpeg,.pdf',
      dictDefaultMessage: 'اسحبي الملفات هنا أو اضغطي للرفع',
    });
  }



  onSubmit() {
   

}
}