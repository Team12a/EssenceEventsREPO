'use strict';

describe('Controller:paypalCtrl', function () {

  // load the controller's module
  beforeEach(module('essenceEventsRepoApp'));

  var paypalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    paypalCtrl = $controller('paypalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
