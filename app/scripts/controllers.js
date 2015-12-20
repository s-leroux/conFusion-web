'use strict';
angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'DishDAO', function($scope, DishDAO) {

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

        }])

        .controller('ContactController', ['$scope', function($scope) {
            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
                        $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                                }])

        .controller('DishDetailController', ['$scope', 'DishDAO', '$stateParams', function($scope, DishDAO, $stateParams) {
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message = "Loading...";

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
        .controller('FeedbackController', function() {
            /*
              I didn't use $scope to solve this problem as they will not be supported
              in Angular 2 according to this discution on the forum:

              https://www.coursera.org/learn/angular-js/module/J5XIt/discussions/YSZJ6p6LEeWGxBJdkUHhbw
            */
            this.comment = { comment: "", rating: 5, author: "", date: null };

            this.sendComment = function(dish) {
              this.comment.date = new Date();
              dish.comments.push(this.comment);
              dish.$save();
              this.comment = { comment: "", rating: 5, author: "", date: null };
            };

            this.reset = function(form) {
              form.$setPristine();
            };
        })

        .controller('IndexController', ['LeaderDAO', 'DishDAO', 'PromotionDAO', '$scope',
            function(LeaderDAO, DishDAO, PromotionDAO, $scope) {

                $scope.featured = 
                $scope.promotion = 
                $scope.ec = {};
                $scope.showLeaders = 
                $scope.showPromotion = 
                $scope.showEC = false;
                $scope.messageFeatured = 
                $scope.messagePromition = 
                $scope.messageEC = "Loading...";

                DishDAO.get({id:0},
                    function(data){
                        $scope.featured = data;
                        $scope.showFeatured = true;
                    },
                    function(response) {
                        $scope.messageFeatured = "Error: "+response.status + " " + response.statusText;
                    }
                );
                PromotionDAO.get({id:0},
                    function(data){
                        $scope.promotion = data;
                        $scope.showPromotion = true;
                    },
                    function(response) {
                        $scope.messagePromotion = "Error: "+response.status + " " + response.statusText;
                    }
                );
                LeaderDAO.getByRole({role:'EC'}, 
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


        .controller('AboutController', ['LeaderDAO', '$scope', 
            function(LeaderDAO, $scope) {
                $scope.leaders = {};
                $scope.showLeaders = false;
                $scope.message = "Loading...";

                LeaderDAO.query(null, 
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
