'use strict';

describe('Controller: WelcomeModalCtrl', function () {

  // load the controller's module
  beforeEach(module('essenceEventsRepoApp'));

  var WelcomeModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WelcomeModalCtrl = $controller('WelcomeModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
