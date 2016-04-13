angular.module('starter')
.controller( 'Appointment_ctrl', Appointment_ctrl );

Appointment_ctrl.$inject = ['$scope', '$state', 'crud', '$ionicPopup', 'globalVariable', 'msg', 'spinnerService'];
function Appointment_ctrl( $scope, $state, crud, $ionicPopup, gVar, msg, spinnerService) {
    
    $scope.goToPage = function ( state ) { 
        $state.go( state );
    }

    $scope.doRefresh = function () {
      fetchAppointment();
    }

    function fetchDoc () {

      var userId = gVar.getVar().user_id;
      var params;

      params = 'dataALl/type/sesi/joinid/doc_id/jointo/docs';
      crud.get( params )
      .success( function ( data ) {

        var idArr = [], filteredArr;
        $scope.results = [];

        
        filteredArr = data.sesi.filter( function( e, i ) {
          return e.sesi_no_patient != 0;
        });
        
        $scope.dataAll = filteredArr;

        angular.forEach( data.sesi, function ( val, key ) {
          if ( idArr.indexOf( val.doc_id ) === -1 ) {
            idArr.push( val.doc_id );
            $scope.results.push( data.sesi[key] );
          }
        });
        
      });

    }

    function fetchAppointment () {

      var userId = gVar.getVar().user_id;
      var params;

      params = 'dataALl/type/appointment/joinid/sesi_id-doc_id-location_id/jointo/sesi-docs-locations/key/patient_id/val/' + userId;
      crud.get( params )
      .success( function ( data ) {
        $scope.appointment = data.appointment;
      })
      .finally(function () {
        $scope.$broadcast('scroll.refreshComplete');
      });;
    }

    $scope.checkingDate = function ( docId ) {
      
      $scope.resultsDate = [];
      var dateArr = [];

      angular.forEach( $scope.dataAll, function ( val, key ) {
        if ( val.doc_id == docId ) {
          if ( dateArr.indexOf( val.sesi_date ) === -1 ) {
            dateArr.push( val.sesi_date );
            $scope.resultsDate.push( $scope.dataAll[key] );
          }
        }
      });

    }

    $scope.checkingSession = function ( appoint ) {

      $scope.resultsSession = []

      angular.forEach( $scope.dataAll, function ( val, key ) {
        if ( appoint.doc_id == val.doc_id && appoint.sesi_date == val.sesi_date ) {
          $scope.resultsSession.push( $scope.dataAll[key] );
        }
      });

    }

    $scope.checkingPerson = function ( appoint ) {

      angular.forEach( $scope.dataAll, function ( val, key ) {

        if ( 
            appoint.doc_id == val.doc_id
            &&
            appoint.sesi_date == val.sesi_date
            &&
            appoint.sesi_session == val.sesi_session 
          ) {

          appoint.sesi_no_patient = val.sesi_no_patient;
          return;

        }

      });

      params = 'dataALl/type/locations/key/doc_id/val/'+ appoint.doc_id;
        crud.get( params )
        .success( function ( data ) {            
            $scope.locations = data.locations;
        });

    }

    $scope.setAppointment = function ( appoint ) {
      spinnerService.show('booksSpinner1');
      var tempVal, userId;

      angular.forEach( $scope.dataAll, function ( val, key ) {

        if ( 
            appoint.doc_id == val.doc_id
            &&
            appoint.sesi_date == val.sesi_date
            &&
            appoint.sesi_session == val.sesi_session 
          ) {

          tempVal = $scope.dataAll[key];
          return;

        }

      });

      tempVal['sesi_no_patient'] -= 1;
      userId = gVar.getVar().user_id;
      
      postData = {
          type : 'appointment',
          formData : {
              patient_id : userId,
              sesi_id : tempVal.sesi_id,
              doc_id : tempVal.doc_id,
              appointment_disease : appoint.disease,
              appointment_status : 0,
              location_id : appoint.location_id
          }
      }

      crud.add( postData )
      .success( function ( data ) {

        // sending email into doc
        var par = 'SendingEmail/docId/'+tempVal.doc_id+'/sesiId/'+tempVal.sesi_id+'/patientId/'+userId;
        crud.sendEmail( par );

        var params, dataUpdate, data = '/dataAll';

        params = 'dataAll';
        dataUpdate = {                             
                sesi_no_patient : tempVal.sesi_no_patient
            };
        data  = {                             
              type : "sesi",
              primaryKey : 'sesi_id', 
              primaryKeyVal : tempVal.sesi_id,
              formData : dataUpdate
          };
        
        crud.update( params, data )
        .success( function () {
          spinnerService.hide('booksSpinner1');
          msg.getInsert( 'app.pAppointment' );
        });
          
      });

    }

    $scope.deleteApointment = function ( appoint ) {

      var params = 'dataAll/type/appointment/key/appointment_id/val/' + appoint.appointment_id;
        crud.delete( params )
        .then( function ( data ) {
            if ( data ){
                msg.getDelete( 'app.pAppointment' );
            }
        });

    }

    $scope.$on( '$ionicView.enter', function( e ) {
        fetchDoc();
        fetchAppointment();
    });

    
}


