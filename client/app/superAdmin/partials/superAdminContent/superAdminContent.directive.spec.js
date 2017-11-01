'use strict';

describe('Directive: superAdminContent', function () {

  // load the directive's module
  beforeEach(module('essenceEventsRepoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<superAdmin-content></superAdmin-content>');
    element = $compile(element)(scope);
    expect(element.text()).to.equal('this is the superAdminContent directive');
  }));
});
