'use strict';

//functions that will be included in our Super Admin Panel
//These functions are almost identical to those in Admin Panel, as client wants same functionality included here
angular.module('essenceEventsRepoApp.superAdmin')
  .controller('SuperAdminController',['$scope',function($scope)
{
    $scope.Functions = [
      {
        'title': 'New Account',
        'description': 'Create an account for a new client',
        'state': 'superAdmin.createAccount',
      },
      {
        'title': 'Manage Accounts',
        'description': 'Manage existing clients',
        'state': 'superAdmin.manageAccounts',
      },
      {
        'title': 'Manage Events',
        'description': 'Manage an event for a existing client',
        'state': 'superAdmin.manageEvent',
      },
      {
        'title': 'Create Contractor',
        'description': 'Create a contractor entry',
        'state': 'superAdmin.createContractor',
      },
      {
        'title': 'Manage Contractors',
        'description': 'Manage existing contractors',
        'state': 'superAdmin.manageContractors',
      },
      {
        'title': 'Manage Vendors',
        'description': 'Manage Public Links Page',
        'state': 'superAdmin.manageLinks',
      },
      {
        'title': 'View Testimonials',
        'description': 'View Testimonials Uploaded by Clients',
        'state': 'superAdmin.viewTestimonials',
      },
      {
        'title':'Manage Payments',
        'description':'Manage payments as a super admin',
        'state':'superAdmin.managePayment'
      }
    ];


}]);
