(function() {
    'use strict';

    var app = angular.module('memoryGame');

    app.controller('gameCtrl', ['$scope', 'cardsFactory', '$timeout', function($scope, cardsFactory, $timeout) {
        var t = this;

        setInitialParams();

        $scope.$watch('size', function(s) {
            t.pairsLeft = s;
        })

        t.startGame = startGame;
        t.flipTile = flipTile;


        ////////////////////////

        function startGame() {
            setInitialParams();

            cardsFactory.createGrid(t.size).then(function(response) {
                t.size = t.pairsLeft = response.size;
                t.grid = response.arr;
            });
        }

        function setInitialParams() {
            t.clickCounter = t.tries = 0;
            t.firstMatch = t.secondMatch = null;t
            t.preventClick = false;
        }

        function flipTile(g) {
            if (g.flipped) {
                return;
            }

            g.flip();

            !t.clickCounter ? firstMatch(g) : secondMatch(g);
        }

        function firstMatch(g) {
            t.firstMatch = g;
            t.clickCounter++;
        }

        function secondMatch(g) {
            t.secondMatch = g;
            t.preventClick = true;

            if (t.firstMatch.img === t.secondMatch.img) {
                t.pairsLeft--;
                t.preventClick = false;
                resetParams();
            } else {
                $timeout(function() {
                    t.firstMatch.flip();
                    t.secondMatch.flip();
                }, 800).then(function() {
                    t.preventClick = false;
                    resetParams();
                })
            }

            t.tries++;
        }

        function resetParams() {
            t.firstMatch = t.secondMatch = null;
            t.clickCounter = 0;
        }

    }]);
})();
