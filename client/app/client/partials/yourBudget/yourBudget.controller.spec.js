'use strict';

describe('Controller: yourBudgetCtrl', function () {

  // load the controller's module
  beforeEach(module('essenceEventsRepoApp'));

  var yourBudgetCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    yourBudgetCtrl = $controller('yourBudgetCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
