describe('<%= controllerName %> tests', function () {
    'use strict';

    beforeEach(module('<%= targetModuleName %>'));
    beforeEach(inject(function ($controller) {
        $controller('<%= controllerName %>', {$scope: {}});
    }));

    describe('tests', function () {
        it('single spec', function () {
            // put spec code here
        });
    });
});
