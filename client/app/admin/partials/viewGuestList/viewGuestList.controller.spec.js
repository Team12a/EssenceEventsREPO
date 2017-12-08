'use strict';

describe('Controller: viewGuestListCtrl', function () {

  // load the controller's module
  beforeEach(module('essenceEventsRepoApp'));

  var viewGuestListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    viewGuestListCtrl = $controller('viewGuestListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
