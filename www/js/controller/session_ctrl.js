angular.module('starter')
.controller( 'Session_ctrl', Session_ctrl );

Session_ctrl.$inject = ['$scope', '$state', 'crud', '$ionicPopup', 'globalVariable', 'msg'];
function Session_ctrl( $scope, $state, crud, $ionicPopup, gVar, msg ) {

    $scope.$on('$ionicView.enter', function(e) {
        init();
    });

    function init() {

        var userId = gVar.getVar().user_id;
        var params;
        params = 'dataALl/type/sesi/key/doc_id/val/'+ userId;
        crud.get( params )
        .success( function ( data ) {
            console.log(data)
            $scope.session = data.sesi;
        });
        // untuk location
        /*params = 'dataALl/type/locations/key/doc_id/val/'+ userId;
        crud.get( params )
        .success( function ( data ) {            
            $scope.locations = data.locations;
        });*/

    }
    
    
    $scope.goToPage = function ( state ) {
        $state.go( state );
    }

    $scope.setSession = function ( session ) {        
        
        var userId = gVar.getVar().user_id,
            convertDate = new Date( session.sesi_date ),
            sessionDate = convertDate.getFullYear()  + '-' + (convertDate.getMonth()+1 ) + '-' + convertDate.getDate();
            
        postData = {
            type : 'sesi',
            formData : {
                doc_id : userId,
                sesi_date : sessionDate,
                sesi_session : session.sesi_session,
                sesi_no_patient : session.sesi_no_patient
            }
        }

        crud.add( postData )
        .success( function ( data ) {
            msg.getInsert( 'app.session' );
        });
    }

    $scope.deleteSession = function ( session ) {

        var params = 'dataAll/type/sesi/key/sesi_id/val/' + session.sesi_id;
        crud.delete( params )
        .then( function ( data ) {
            if ( data ){
                msg.getDelete( 'app.session' );
            }
        });
        
    }

    /*$scope.datepickerObject = {
      titleLabel: 'Title',  //Optional
      todayLabel: 'Today',  //Optional
      closeLabel: 'Close',  //Optional
      setLabel: 'Set',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),  //Optional
      mondayFirst: true,  //Optional
      //disabledDates: disabledDates, //Optional
      //weekDaysList: weekDaysList, //Optional
      //monthList: monthList, //Optional
      templateType: 'popup', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 8, 2), //Optional
      to: new Date(2018, 8, 25),  //Optional
      callback: function (val) {  //Mandatory
       if (typeof(val) === 'undefined') {
    console.log('No date selected');
  } else {
    console.log('Selected date is : ', val)
  }
      },
      dateFormat: 'dd-MM-yyyy', //Optional
      closeOnSelect: false, //Optional
    };*/
}


