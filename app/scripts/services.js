'use strict';
angular.module('confusionApp')
    .constant("baseURL","http://localhost:3000/")

    .factory('DishDAO', ['$resource', 'baseURL', function($resource, baseURL) {
        return $resource(baseURL+'dishes/:id', null, {
            // extra methods
            update: { method: 'PUT', params: { id: '@id' } }
        });
    }])

    .factory('LeaderDAO', ['$resource', 'baseURL', function($resource, baseURL) {
        return $resource(baseURL+'leadership/:id', null, {
            // extra methods
            getByRole: { params: {abbr:'@role'}, method: 'GET', isArray: true }
        });
    }])

    .factory('PromotionDAO', ['$resource', 'baseURL', function($resource, baseURL) {
        return $resource(baseURL+'promotions/:id', {
            // extra methods
        });
    }])


;