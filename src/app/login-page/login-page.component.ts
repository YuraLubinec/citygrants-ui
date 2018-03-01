import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [LoginService]
})
export class LoginPageComponent implements OnInit {

  private loginForm: FormGroup;
  private errorOccured: Boolean;
  private unexpectedErrorOccured: Boolean;
  private authenticationErrorMessage = 'Неправильний логін або пароль';
  private defaultErrorMessage = 'Сталася невідома помилка, спробуйте пізніше';

  constructor(private loginService: LoginService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createEmptyForm();
  }

  createEmptyForm() {

    this.loginForm = this.fb.group({
      login: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]]
    })
  }

  onSubmit() {

    this.errorOccured = false;
    this.unexpectedErrorOccured = false;
    this.loginService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe(resp => console.log(resp));
  }

  private authenticationErrorHandler(status: Number) {

    if (status === 401) { this.errorOccured = true }
    else { console.log('Error occured, status: ' + status), this.unexpectedErrorOccured = true }
  }


}
