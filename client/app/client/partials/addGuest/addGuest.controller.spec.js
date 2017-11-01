'use strict';

describe('Controller: addGuestCtrl', function () {

  // load the controller's module
  beforeEach(module('essenceEventsRepoApp'));

  var addGuestCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    addGuestCtrl = $controller('addGuestCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
