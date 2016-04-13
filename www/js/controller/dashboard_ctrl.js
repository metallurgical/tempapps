angular.module('starter')
.controller( 'Dashboard_ctrl', Dashboard_ctrl );

Dashboard_ctrl.$inject = ['$scope', '$state', 'crud', '$ionicPopup', 'globalVariable'];
function Dashboard_ctrl( $scope, $state, crud, $ionicPopup, gVar) {
    //console.log(gVar.getVar())
    //var dataGlobal = gVar.getVar(); 
    //console.log(dataGlobal)
    /*$scope.doctor       = ( dataGlobal.userFlag == 'true' || dataGlobal.userFlag == true) ? true : false;
    $scope.patient      = ( dataGlobal.userFlag == 'true' || dataGlobal.userFlag == true ) ? false : true;
    $scope.categoryUser = dataGlobal.category;*/
    /*$scope.doctor = true;
    console.log($scope.doctor)
	$scope.backToPage = function () {

		$state.go( 'login' );
	}*/
}


