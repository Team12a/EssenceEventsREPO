'use strict';

describe('Directive: clientContent', function () {

  // load the directive's module
  beforeEach(module('essenceEventsRepoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<client-content></client-content>');
    element = $compile(element)(scope);
    expect(element.text()).to.equal('this is the clientContent directive');
  }));
});
