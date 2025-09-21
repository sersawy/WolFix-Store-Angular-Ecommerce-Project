import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
})
export class ContactUs implements OnInit {
  status = true;
  sendForm!: FormGroup;
  fb = inject(FormBuilder);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.sendForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.status = !this.status;
    this.sendForm.reset();
    this.toastr.success(
      "Thank you for contacting us. We'll get back to you within 24 hours.",
      'Message Sent Successfully! 🎉',
    );
  }
  sendAgain() {
    this.status = !this.status;
  }
}
