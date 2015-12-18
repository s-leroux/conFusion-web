'use strict';
angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuService', function($scope, menuService) {

            $scope.tab = 1;
            $scope.filtText = '';
            $scope.dishes = menuService.getDishes();

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

        .controller('DishDetailController', ['menuService', '$routeParams', function(menuService, $routeParams) {
            this.dish = menuService.getDish(parseInt($routeParams.id, 10));
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

        ;
