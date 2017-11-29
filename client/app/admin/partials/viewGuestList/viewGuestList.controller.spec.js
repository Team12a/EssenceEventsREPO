'use strict';

describe('Controller: ViewGuestListCtrl', function () {

  // load the controller's module
  beforeEach(module('essenceEventsRepoApp'));

  var ViewGuestListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewGuestListCtrl = $controller('ViewGuestListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
