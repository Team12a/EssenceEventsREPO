'use strict';

describe('Controller: manageGuestListCtrl', function () {

  // load the controller's module
  beforeEach(module('essenceEventsRepoApp'));

  var manageGuestListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    manageGuestListCtrl = $controller('manageGuestListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
