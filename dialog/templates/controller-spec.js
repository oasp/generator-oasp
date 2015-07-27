describe('<%= controllerName %> tests', function () {
    'use strict';

    beforeEach(module('<%= moduleName %>'));
    beforeEach(inject(function ($controller) {
        $controller('<%= controllerName %>', {});
    }));

    describe('tests', function () {
        it('single spec', function () {
            // put spec code here
        });
    });
});