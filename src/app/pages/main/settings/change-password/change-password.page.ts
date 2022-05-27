import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.page.html',
    styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

    passwordType = 'password';
    passwordIcon = 'eye';
    currentPassword: any;
    newPassword: any;

    constructor() { }

    ngOnInit() {
    }

    showPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye' ? 'eye-off' : 'eye';
    }

    resetPassword() {

    }
}
