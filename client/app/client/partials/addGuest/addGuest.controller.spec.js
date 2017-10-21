'use strict';

describe('Controller: AddGuestCtrl', function () {

  // load the controller's module
  beforeEach(module('essenceEventsRepoApp'));

  var AddGuestCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddGuestCtrl = $controller('AddGuestCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
