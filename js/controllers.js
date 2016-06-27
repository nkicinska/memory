(function() {
    var app = angular.module('memoryGame');

    app.controller('game', ['$scope', 'cardsFactory', '$timeout', function($scope, cardsFactory, $timeout) {
        var t = $scope;

        t.clickCounter = 0;
        t.firstMatch = t.secondMatch = null;
        t.size = 2;
        t.pairsLeft = t.size;

        t.$watch('size', function(s) {
        	t.pairsLeft = s;
        })

        t.startGame = function() {
            cardsFactory.createGrid(t.size).then(function(response) {
                t.grid = response;
            });
        }

        t.flipTile = function(g) {
        	console.log(t.pairsLeft);
            if (g.flipped) {
                return;
            }

            g.flip();

            if (!t.clickCounter) {
                t.firstMatch = g;
                t.clickCounter++;
            } else {
                t.secondMatch = g;

                if (t.firstMatch.img === t.secondMatch.img) {
                    t.pairsLeft--;
                    resetParams();
                } else {
                	$timeout(function() {
                		t.firstMatch.flip();
                		t.secondMatch.flip();
                	}, 250).then(function() {
                		resetParams();
                	})
                }
            }
        }

        function resetParams() {
        	t.firstMatch = t.secondMatch = null;
            t.clickCounter = 0;
        }

    }]);
})();
