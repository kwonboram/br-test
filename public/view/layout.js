'use strict';

var layoutApp = angular.module('layoutApp',[]);

layoutApp.run(function($templateCache){
	$templateCache.put('plus2','<div><div ng-repeat="item in items"><input type="number", ng-model="config[$index]">'+
		'<button ng-click="items.push($index+1);setIndex($index); disabled">add</button></div><span ng-transclude></div> ');
});

layoutApp.controller('bodyCtrl', function ($scope){
	$scope.scopeTest = 'testing';
	$scope.scopeObj ={
		test:'objscope',
	};
	$scope.items= [0];
	$scope.config= [];

	$scope.setIndex= function (index){
		$scope.index = index;
		$scope.config.push(index);
		console.log($scope.config);
	};
});

layoutApp.directive('testDirective', function ($templateCache){
	return {
		restrict: 'E',
		priority: 6,
		replace: true, //html 디렉티브 교체.
		scope: {
			config: '=',
			items: '=',
			setIndex: '&'
		}, //true, primitive x / false primitive됨.
		transclude: true,
		templateUrl: 'plus2',
		controller: function ($scope,$element,$attrs,$transclude){
			this.show = function(){
				//console.log('request function');
				alert('3개이상 셍성');
			}
		},
		compile: function compile(tElement, tAttrs, transclude) { //prelink전에 호출
			console.log('compile');
			console.log(tAttrs);
			return {
        		pre: function preLink(scope, iElement, iAttrs, controller) {
        		},
        		post: function postLink(scope, iElement, iAttrs, controller) { //template이 로드된후 실행.-child element
        			
					scope.$watch('config',function (newValue){
						console.log('in watch');
						
						if(scope.config[scope.config.length-1] >= 3){
							transclude(scope,function (clone){
		        				clone.context.innerHTML = '<font color="red">max</font>';
								iElement.after(clone); //jquery속성
							});
						}
						console.log(scope.config.length);
						if(scope.config.length >= 3){
							controller.show();
						}
					},true);
        		}
      		}
    	}
	};
});

// layoutApp.directive('elementTest1',function (){

// });
// layoutApp.directive('elementTest2',function (){

// });
// layoutApp.directive('elementTest3',function (){
	
// });
