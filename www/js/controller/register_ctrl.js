angular.module('RegisterModule', ['starter', 'ui.bootstrap','angularSpinners'])
.controller( 'Register_ctrl', RegisterCtrl );

RegisterCtrl.$inject = ['$scope', '$state', 'crud', '$ionicPopup', 'spinnerService'];
function RegisterCtrl( $scope, $state, crud, $ionicPopup, spinnerService ) {

    $scope.showlocation = false;

	$scope.doRegister = function ( user ) {
        spinnerService.show('booksSpinner');
        var postData, category, formData;

        if ( user.category === 'doctor' ) {

        	category = 'docs';
        	formData = {
        		doc_name : user.name,
        		doc_ic : user.ic,
        		doc_gender : user.gender,
        		doc_email : user.email,
                doc_address : user.address
        	}
        }
        else {

        	category = 'patients';
        	formData = {
        		patient_name : user.name,
        		patient_ic : user.ic,
        		patient_gender : user.gender,
        		patient_address : user.address,
                patient_email : user.email
        	}
        }

        postData = {                             
            type : category, 
            formData : formData
        };

        crud.add( postData )
    	.success( function ( data1 ) {

    		var postData, id;
    		id = data1.id;

    		postData = {
    			type : 'users',
    			formData : {
    				id : id,
    				user_username : user.username,
    				user_password : user.password,
    				user_category : user.category
    			}
    		}

    		crud.add( postData )
    		.success( function ( data2 ) {
                // untuk location
                if ( user.category == 'doctor' ) {

                    var postData;

                    if ( user.location.indexOf(',') !== -1 ) {

                        var splitLocation = user.location.split(','),
                            type = '',
                            tempArr = [];

                        for ( var i = 0, length = splitLocation.length; i < length; i++ ) {

                            if ( i == 0 ) {
                                type += 'locations';
                            }
                            else {
                                type += '-locations';
                            }

                            tempArr[i] = {
                                doc_id : id,
                                location_name : splitLocation[i]
                            }
                            
                        }

                        postData = {
                            type : type,
                            formData : tempArr
                        }

                        
                    }
                    else {
                        postData = {
                            type : 'locations',
                            formData : {
                                doc_id : id,
                                location_name : user.location.trim()
                            }
                        }

                    }

                   crud.add( postData )
                    .success( function () {
                        spinnerService.hide('booksSpinner');
                        var alertPopup = $ionicPopup.alert({
                             title: 'Notification',
                             template: 'Successfull Register \n as ' + angular.uppercase( user.category ) + '. You may login now.'
                        });

                        alertPopup.then( function( res ) {
                            $state.go( 'login' );
                        });
                    })
                }
                else {

                    spinnerService.hide('booksSpinner');
        			var alertPopup = $ionicPopup.alert({
    				     title: 'Notification',
    				     template: 'Successfull Register \n as ' + angular.uppercase( user.category ) + '. You may login now.'
    			   	});

    				alertPopup.then( function( res ) {
    				    $state.go( 'login' );
    				});
                }
				
    		});

    	}); 
	}

    $scope.showLocation = function ( typeUser ) {

        if ( typeUser == 'doctor' ) {
            $scope.showlocation = true;
        }
    }

	$scope.backToPage = function () {

		$state.go( 'login' );
	}
}


