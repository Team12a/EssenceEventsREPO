'use strict';

describe('Controller: ManagePaymentCtrl', function () {

  // load the controller's module
  beforeEach(module('essenceEventsRepoApp'));

  var ManagePaymentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManagePaymentCtrl = $controller('ManagePaymentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
