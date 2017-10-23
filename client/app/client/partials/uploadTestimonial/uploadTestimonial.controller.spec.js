'use strict';

describe('Controller: UploadTestimonialCtrl', function () {

  // load the controller's module
  beforeEach(module('essenceEventsRepoApp'));

  var ReservationsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UploadTestimonialCtrl = $controller('UploadTestimonialCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
