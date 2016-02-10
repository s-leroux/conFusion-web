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
angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'DishDAO', 'URLResolver',
                    function($scope, DishDAO, URLResolver) {

            $scope.tab = 1;
            $scope.filtText = '';
            $scope.message = "Loading...";

            $scope.dishes= {};
            $scope.showMenu = false;

            DishDAO.query(null, 
                function(data) {
                    $scope.dishes = data;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
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

            $scope.urlResolve = URLResolver;
        }])

        .controller('ContactController', ['$scope', function($scope) {
            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
                        $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                                }])

        .controller('FeedbackController', ['$scope', 'FeedbackDAO', function($scope, FeedbackDAO) {
            $scope.sendFeedback = function() {
                console.log($scope.feedback);
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    // Valid feedback

                    /*
                        Save a *new* feedback on the server using a POST request.
                    */
                    FeedbackDAO.save($scope.feedback, 
                        function(){
                            $scope.message = "Feedback sent";
                            $scope.sent = true;

                            // Reset form (only in case of success)
                            $scope.invalidChannelSelection = false;
                            $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                               agree:false, email:"" };
                            $scope.feedback.mychannel="";

                            $scope.feedbackForm.$setPristine();
                            console.log($scope.feedback);
                        },
                        function(response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                            $scope.sent = false;

                        }
                    );

                }
            };
        }])

        .controller('DishDetailController', ['$scope', 'DishDAO',
                 '$stateParams', 'URLResolver',
                 function($scope, DishDAO, $stateParams, URLResolver) {
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message = "Loading...";
            $scope.urlResolve = URLResolver;

            DishDAO.get({id: parseInt($stateParams.id,10)},
                function(data){
                    console.log(data);
                    $scope.dish = data;
                    $scope.showDish=true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
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
              /*
                push back the changes on the serve using a PUT request.
              */
              dish.$update(function() {
              //    this.comment = { comment: "", rating: 5, author: "", date: null };                
              });
            };

            this.reset = function(form) {
              this.comment = { comment: "", rating: 5, author: "", date: null };                
              form.$setPristine();
            };
        })

        .controller('IndexController', ['LeaderDAO', 'DishDAO', 'PromotionDAO', '$scope', 'URLResolver',
            function(LeaderDAO, DishDAO, PromotionDAO, $scope, URLResolver) {

                $scope.featured = 
                $scope.promotion = 
                $scope.ec = {};
                $scope.showLeaders = 
                $scope.showPromotion = 
                $scope.showEC = false;
                $scope.messageFeatured = 
                $scope.messagePromition = 
                $scope.messageEC = "Loading...";
                $scope.urlResolve = URLResolver;

                DishDAO.get({id:0},
                    function(data){
                        $scope.featured = data;
                        $scope.showFeatured = true;
                    },
                    function(response) {
                        $scope.messageFeatured = "Error: "+response.status + " " + response.statusText;
                    }
                );
                PromotionDAO.getPromotion({id:0},
                    function(data){
                        $scope.promotion = data;
                        $scope.showPromotion = true;
                    },
                    function(response) {
                        $scope.messagePromotion = "Error: "+response.status + " " + response.statusText;
                    }
                );
                LeaderDAO.getByRole({abbr:'WD'}, 
                    function(data){
                        // As I query by an attribute (abbr) instead
                        // of by id, the response is an array
                        $scope.ec = data[0];
                        $scope.showEC = true;
                    },
                    function(response) {
                        $scope.messageEC = "Error: "+response.status + " " + response.statusText;
                    }
                );
            }])


        .controller('AboutController', ['LeaderDAO', '$scope', 'URLResolver',
            function(LeaderDAO, $scope, URLResolver) {
                $scope.leaders = {};
                $scope.showLeaders = false;
                $scope.message = "Loading...";
                $scope.urlResolve = URLResolver;

                LeaderDAO.query({_sort: "id"}, 
                    function(data){
                        $scope.leaders = data;
                        $scope.showLeaders = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );
            }])

        ;
