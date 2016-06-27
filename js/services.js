(function() {
	var app = angular.module('memoryGame', []);

	app.factory('cardsFactory', function($http) {

		function createGrid(size) {
			
			var promise = $http.get('api/cards.json').then(function(response) { 
				var arr = [],
					i = 0;

				for(i; i < size; i++) {
					arr.push(new Tile(response.data[i].path));
					arr.push(new Tile(response.data[i].path));
				}

				arr = shuffle(arr);
				return arr;
			});

			return promise;
		}

		function shuffle(arr) {
			var counter = arr.length - 1, 
				i,
				temp;

			while(counter) {
				i = Math.floor(Math.random() * counter);

				temp = arr[counter];
				arr[counter] = arr[i];
				arr[i] = temp;

				counter--;
			}

			return arr;
		}

		return {
			createGrid: createGrid,
			shuffle: shuffle
		}
	});
})();
