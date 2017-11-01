'use strict';

class CreateAccountCtrl{
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  register(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        role: this.user.role,
        password: this.user.password,
        phoneNumber: this.user.phoneNumber
      })
      .then(() => {
        // Account created, redirect to admin basic
        //todo - redirect to create event
        this.$state.go('superAdmin.manageAccounts');
      })
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }
}

angular.module('essenceEventsRepoApp.superAdmin')
  .controller('CreateAccountCtrl', CreateAccountCtrl);
