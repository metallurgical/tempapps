angular.module('starter')
.controller( 'DocAppointment_ctrl', DocAppointment_ctrl );

DocAppointment_ctrl.$inject = ['$scope', '$state', 'crud', '$ionicPopup', 'globalVariable', 'msg'];
function DocAppointment_ctrl( $scope, $state, crud, $ionicPopup, gVar, msg) {
    
    $scope.goToPage = function ( state ) { 
        $state.go( state );
    }

    $scope.$on( '$ionicView.enter', function( e ) {
        fetchAppointment();
    });

    $scope.doRefresh = function () {
      fetchAppointment();
    }

    function fetchAppointment () {

      var userId = gVar.getVar().user_id;
      var params;

      params = 'dataALl/type/appointment/joinid/sesi_id-patient_id-location_id/jointo/sesi-patients-locations/key/doc_id/val/' + userId;
      crud.get( params )
      .success( function ( data ) {
        $scope.appointment = data.appointment;
      })
      .finally(function () {
        $scope.$broadcast('scroll.refreshComplete');
      });

    }

    $scope.deleteApointment = function ( appoint ) {

      var params = 'dataAll/type/appointment/key/appointment_id/val/' + appoint.appointment_id;
        crud.delete( params )
        .then( function ( data ) {
            if ( data ){
                msg.getDelete( 'app.docAppointment' );
            }
        });

    }

    $scope.setApprove = function ( appoint ) {
      //console.log(appoint)
      var confirmPopup  = $ionicPopup.confirm({
                          title: 'Alert',
                          template: 'Are you sure you want to approve??'
                        });
            
      confirmPopup.then( function( res ) {

        if ( res ) {

          var params, dataUpdate, data;

          params = 'dataAll';
          dataUpdate = {                             
                  appointment_status : 1
              };
          data  = {                             
                type : "appointment",
                primaryKey : 'appointment_id', 
                primaryKeyVal : appoint.appointment_id,
                formData : dataUpdate
            };
          
          crud.update( params, data )
          .success( function () {
            msg.getUpdate( 'app.docAppointment', true );
          });
        }

      });

    }

    

    
}


