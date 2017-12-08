'use strict';

describe('Controller: ManagePaymentModalCtrl', function () {

  // load the controller's module
  beforeEach(module('essenceEventsRepoApp'));

  var ManagePaymentModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManagePaymentModalCtrl = $controller('ManagePaymentModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
