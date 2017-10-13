'use strict';

describe('Directive: clientNav', function () {

  // load the directive's module and view
  beforeEach(module('essenceEventsRepoApp.client'));
  beforeEach(module('app/client/partials/clientNav/clientNav.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<client-nav></client-nav>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the clientNav directive');
  }));
});
