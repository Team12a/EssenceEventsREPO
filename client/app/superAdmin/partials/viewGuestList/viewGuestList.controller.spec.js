'use strict';

describe('Controller: ViewGuestListCtrlSuper', function () {

  // load the controller's module
  beforeEach(module('essenceEventsRepoApp'));

  var ViewGuestListCtrlSuper, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewGuestListCtrl = $controller('ViewGuestListCtrlSuper', {

      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
