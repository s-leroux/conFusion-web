/*
   Copyright 2015-2016 Sylvain Leroux, Jogesh Muppala

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
'use strict';

angular.module('confusionApp', ['ui.router', 'ngResource', 'ui.bootstrap'])

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
                    // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'jumbotron': {
                        templateUrl : 'views/jumbotron.html',
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            // route for the aboutus page
            .state('app.aboutus', {
                url:'aboutus',
                views: {
                    'jumbotron@': {},
                    'content@': {
                        templateUrl : 'views/aboutus.html',
                        controller  : 'AboutController'                  
                    }
                }
            })
        
            // route for the contactus page
            .state('app.contactus', {
                url:'contactus',
                views: {
                    'jumbotron@': {},
                    'content@': {
                        templateUrl : 'views/contactus.html',
                        controller  : 'ContactController'                  
                    }
                }
            })

            // route for the menu page
            .state('app.menu', {
                url: 'menu',
                views: {
                    'jumbotron@': {},
                    'content@': {
                        templateUrl : 'views/menu.html',
                        controller  : 'MenuController'
                    }
                }
            })
            
            // route for the dishdetail page
            .state('app.dishdetails', {
                url: 'menu/:id',
                views: {
                    'jumbotron@': {},
                    'content@': {
                        templateUrl : 'views/dishdetail.html',
                        controller  : 'DishDetailController',
                   }
                }
            });
            $urlRouterProvider.otherwise('/');
    })


;