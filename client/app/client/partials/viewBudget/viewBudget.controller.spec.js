'use strict';

describe('Controller: viewBudgetCtrl', function () {

  // load the controller's module
  beforeEach(module('essenceEventsRepoApp'));

  var viewBudgetCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    viewBudgetCtrl = $controller('viewBudgetCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
