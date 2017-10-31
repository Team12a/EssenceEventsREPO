'use strict';

describe('Controller: ViewTestimonialsCtrl', function () {

  // load the controller's module
  beforeEach(module('essenceEventsRepoApp'));

  var ViewTestimonialsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewTestimonialsCtrl = $controller('ViewTestimonialsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
