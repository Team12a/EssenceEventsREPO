'use strict';

describe('Controller: makePaymentCtrl', function () {

  // load the controller's module
  beforeEach(module('essenceEventsRepoApp'));

  var makePaymentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateContractorCtrl = $controller('makePaymentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
