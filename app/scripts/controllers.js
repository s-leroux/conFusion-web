'use strict';
angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuService', function($scope, menuService) {

            $scope.tab = 1;
            $scope.filtText = '';

            $scope.dishes= {};
            menuService.getDishes()
            .then(
                function(response) {
                    $scope.dishes = response.data;
                }
            );

            $scope.select = function(setTab) {
                $scope.tab = setTab;

                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";   
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };


            $scope.showDetails = false;
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };

        }])

        .controller('ContactController', ['$scope', function($scope) {
            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
                        $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                                }])
        .controller('FeedbackController', ['$scope', function($scope) {
                        $scope.sendFeedback = function() {
                                console.log($scope.feedback);
                                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                       agree:false, email:"" };
                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', 'menuService', '$stateParams', function($scope, menuService, $stateParams) {
            $scope.dish = {};
            menuService.getDish(parseInt($stateParams.id,10))
            .then(
                function(response){
                    $scope.dish = response.data;
                    $scope.showDish=true;
                }
            );
        }])
        
        // ASSIGNMENT 3
        .controller('CommentFormController', function() {
            /*
              I didn't use $scope to solve this problem as they will not be supported
              in Angular 2 according to this discution on the forum:

              https://www.coursera.org/learn/angular-js/module/J5XIt/discussions/YSZJ6p6LEeWGxBJdkUHhbw
            */
            this.comment = { comment: "", rating: 5, author: "", date: null };

            this.sendComment = function(dish) {
              this.comment.date = new Date();
              dish.comments.push(this.comment);
              this.comment = { comment: "", rating: 5, author: "", date: null };
            };

            this.reset = function(form) {
              form.$setPristine();
            };
        })

        .controller('IndexController', ['corporateFactory', 'menuService', '$scope',
            function(corporateFactory, menuService, $scope) {

                $scope.dish = {};

                menuService.getDish(0)
                .then(
                    function(response){
                        $scope.featured = response.data;
                        $scope.showFeatured = true;
                    }
                );
                menuService.getPromotion(0)
                .then(
                    function(response){
                        $scope.promotion = response.data;
                        $scope.showPromotion = true;
                    }
                );
                corporateFactory.getLeader('EC')
                .then(
                    function(response){
                        // As I query by an attribute (abbr) instead
                        // of by id, the response is an array
                        $scope.ec = response.data[0];
                        $scope.showEC = true;
                    }
                );
            }])


        .controller('AboutController', ['corporateFactory', '$scope', 
            function(corporateFactory, $scope) {
                corporateFactory.getLeaders()
                .then(
                    function(response){
                        $scope.leaders = response.data;
                    }
                );
            }])

        ;
