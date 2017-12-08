'use strict';

describe('Controller: CreatePaymentCtrl', function () {

  // load the controller's module
  beforeEach(module('essenceEventsRepoApp'));

  var CreatePaymentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreatePaymentCtrl = $controller('CreatePaymentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
