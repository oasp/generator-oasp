describe('\'app\' module', function () {
    'use strict';
    var locationProvider;

    beforeEach(function () {
        module('ng', function ($locationProvider) {
            locationProvider = $locationProvider;
            spyOn(locationProvider, 'html5Mode').and.callThrough();
        });
        module('app');
    });

    // This is necessary to trigger loading the modules above; use it to inject services once they are needed
    beforeEach(inject());

    it('sets the \'Hashbang\' mode', function () {
        expect(locationProvider.html5Mode).toHaveBeenCalledWith(false);
    });
});
