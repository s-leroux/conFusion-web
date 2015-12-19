'use strict';
angular.module('confusionApp')
    .constant("baseURL","http://localhost:3000/")

    .factory('menuService', ['$http', 'baseURL', function($http, baseURL) {

            var menuService = {};
            menuService.getDishes = function() {
                return $http.get(baseURL + "dishes");
            };
            menuService.getDish = function(id) {
                return $http.get(baseURL + "dishes/" + id);
            };


            // implement a function named getPromotion
            // that returns a selected promotion.

            // Please, see on the forum why I didn't use "promotions[index]":
            // https://www.coursera.org/learn/angular-js/discussions/EEgRdaXaEeW2dA51rBQ9Ew
            menuService.getPromotion = function(id) {
                return $http.get(baseURL + "promotions/" + id);
            };

            return menuService;
    }])

    .factory('corporateFactory', ['$http', 'baseURL', function($http, baseURL) {
    
            var corpfac = {};
    
    
            corpfac.getLeaders = function() {
                return $http.get(baseURL + "leadership");
            };

            // Please, see on the forum why I didn't use "leadership[index]":
            // https://www.coursera.org/learn/angular-js/discussions/EEgRdaXaEeW2dA51rBQ9Ew
            // Assuming here that abbr is a *key* for leadership positions
            corpfac.getLeader = function(abbr) {
                return $http.get(baseURL + "leadership?abbr="+abbr);
            };


            return corpfac;
        }])


;