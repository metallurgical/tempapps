angular
.module('serviceModule',['starter'])
.factory('lclStorage', function () {
	var fn = {};

	fn.setItem = function ( bool, category, user_id ) {

		localStorage.setItem( 'userFlag', bool );
		localStorage.setItem( 'category', category );
		localStorage.setItem( 'user_id', user_id );

	}

	fn.getItem = function  () {

		return [

				localStorage.getItem( 'userFlag' ), 
				localStorage.getItem( 'category' ),
				localStorage.getItem( 'user_id' )
		];

	}

	return fn
})
.factory('globalVariable', function ( lclStorage ) {

	var fn = {}, globalVar = {}, flagUser = false;

	fn.setVar = function ( bool, category, user_id ) {

		lclStorage.setItem( ( bool == true ) ? true : false , category || '', user_id );
		globalVar.flagUser = ( bool == true ) ? true : false ;
		globalVar.category = category || '';
		globalVar.user_id  = user_id;

	}

	fn.getVar = function () {

		var data = lclStorage.getItem();
		return {
			userFlag : data[0],
			category : data[1],
			user_id : data[2]
		}

		/*var data = globalVar;
		return {
			userFlag : globalVar.flagUser,
			category : globalVar.category
		}*/
	}

	return fn;
})
.factory('Auth', function (){ 
   
   	var authVal = {};

    authVal.doAuth = function( method ){ 
      
        if( !method ){ 
          	method = "GET_n_POST";
        }

     	switch( method ) {

        	case 'DELETE' : 

            	var config = {

            			headers: {

		                  	'Accept': 'application/json;odata=verbose',
		                  	"X-Testing" : "testing",
		                  	'X-HTTP-Method-Override' : 'DELETE'
              			}
          		};
        	return config;
        	break;

        	case 'GET_n_POST' : 

          		var config = {
          				headers: {
                  	
                  			'Accept': 'application/json;odata=verbose',
                  			"X-Testing" : "testing"
              			}
          		};
          	return config;
        	break;

        	case 'PUT' : 
          		var config = {
          				headers: {
                  	
                  			'Accept': 'application/json;odata=verbose',
                  			"X-Testing" : "testing",
                  			'X-HTTP-Method-Override' : 'PUT'
              			}
          		};
        	return config;
        	break;
                   
      	}
              
    }

    return authVal;
})
.factory( 'msg', function ( $ionicPopup, $state ) {

	var fn = {};

	fn.msgDelete = function () {

		return alertPopup = $ionicPopup.alert({
             title: 'Notification',
             template: 'Successfull Delete Data.'
        });

	}

	fn.msgInsert = function () {

		return alertPopup = $ionicPopup.alert({
             title: 'Notification',
             template: 'Successfull Insert Data.'
        });

	}

	fn.msgUpdate = function () {

		return alertPopup = $ionicPopup.alert({
             title: 'Notification',
             template: 'Successfull Update Record.'
        });

	}

	fn.getDelete = function ( state ) {
		fn.msgDelete()
		.then( function () {

			if ( state ) {
				$state.go( state, {}, { reload : true } );
			}
			
		});
	}

	fn.getInsert = function ( state ) {
		fn.msgInsert()
		.then( function () {

			if ( state ) {
				$state.go( state );
			}
			
		});
	}

	fn.getUpdate = function ( state, reload ) {
		fn.msgUpdate()
		.then( function () {

			if ( state ) {

				if ( reload ) {
					$state.go( state, {}, { reload : true } );
				}
				else {
					$state.go( state );
				}
				
			}
			
		});
	}

	return {
		getUpdate : fn.getUpdate,
		getDelete : fn.getDelete,
		getInsert : fn.getInsert
	}

})
.factory( 'crud', function ( $http, myConfig, $ionicPopup, Auth ) {

	var url, fn = {}, setUrl;

	setUrl = function ( params ) {
		
		return myConfig.url + ( params  || 'dataAll' );

	}

	fn.sendEmail = function ( params ) {
		return $http.get( setUrl( params ) );
	}

	fn.getData = function( params ) {

        return $http.get( setUrl( params ) );
                
    }

    fn.addData = function( data ) {
        
        return $http.post( setUrl(), data );

    }

    fn.deleteData = function( params ) {
      
        url = myConfig.url + params;          
        var confirmPopup  = $ionicPopup.confirm({
                             	title: 'Delete Confirmation',
                             	template: 'Are you sure you want to delete this data?'
                           	});
            
     	 return confirmPopup.then( function( res ) {
      		
      		if( res ) {
          		return $http.get( setUrl( params ), Auth.doAuth( 'DELETE' ) )        
         	} 
         	else {
         		console.log('You are not sure dihhh');
         	}

    	});
    }

    fn.updateData = function( params, data ) {

    	return $http.post( setUrl( params ), data, Auth.doAuth( 'PUT' ) );

    }

    return {
    	get 	: fn.getData,
    	add 	: fn.addData,
    	delete 	: fn.deleteData,
    	update 	: fn.updateData,
    	sendEmail : fn.sendEmail // custom -- remove this for comercial used
    }
})