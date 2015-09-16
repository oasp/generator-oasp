describe('<%= directiveName %> directive specs', function () {
    'use strict';
    var $compile, $rootScope;

    beforeEach(module('<%= targetModuleName %>'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('renders a button', function () {
        // given
        var element = $compile('<<%= trainItemName %>></<%= trainItemName %>>')($rootScope);
        // when
        $rootScope.$digest();
        // then
        expect(element).toBeDefined();
    });
});
