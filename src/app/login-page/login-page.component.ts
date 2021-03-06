import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [LoginService]
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  public errorOccured: Boolean;
  public authenticationErrorMessage = 'Неправильний логін або пароль';
  public defaultErrorMessage = 'Сталася невідома помилка, спробуйте пізніше';

  constructor(public loginService: LoginService, public fb: FormBuilder) {
  }

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
    this.loginService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe(resp => this.errorOccured = !resp);
  }

}
