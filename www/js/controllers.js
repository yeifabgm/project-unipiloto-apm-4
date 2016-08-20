angular.module('app.controllers', ['app.services', 'ngCordova'])
  
.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('ingresoCtrl', ['$scope', '$stateParams','productService', '$state', '$cordovaDialogs', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, productService, $state, $cordovaDialogs) {
	$scope.login = function(){
		var data = {
			'email': $scope.email,
			'pass': $scope.pass
		};
		productService.user_login.login(data,function(data){
			if(data.$status == 201 || data.$status == 200){
			   console.log(data);
				localStorage.setItem('email', data.email);
				localStorage.setItem('firstname', data.firstname);
				localStorage.setItem('lastname', data.lastname);
				localStorage.setItem('phone', data.phone);
				localStorage.setItem('cookie', data.cookie);
				$state.go('menu.home');
			} else {
				$cordovaDialogs.alert('Algo salio mal ' + data.firstname , '¡Ups! ' + data.firstname , 'OK');
			}
		});
	}
}])
   
.controller('registroCtrl', ['$scope', '$stateParams', 'productService', '$cordovaDialogs',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, productService, $cordovaDialogs) {
   $scope.registro = function(){
      var data = {
         'email': $scope.email,
         'firstname': $scope.firstName,
         'lastname': $scope.lastName,
         'phone': $scope.phone,
         'pass': $scope.pass
      };
      productService.user_create.save(data,function(data){
         console.log(data.$status);
         if(data.$status == 201 || data.$status == 200){

            $cordovaDialogs.alert('Bienvenido ' + data.firstname , '¡Hola! ' + data.firstname , 'OK');
            localStorage.setItem('email', data.email);
         }else{
            $cordovaDialogs.alert('Algo salio mal ' + data.firstname , '¡Ups! ' + data.firstname , 'OK');
         }
         console.log('Click en el boton',data);
          });
   }
}])
   

.controller('productCtrl', ['$scope', '$stateParams', 'productService', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, productService, $state) {
	if (localStorage.getItem('cookie') == null) {
		console.log('No hay localStorage');
		$state.go('ingreso');
	} else {
		productService.item_list.query(function(data){
			$scope.list = data;
        	console.log($scope.list);
    	});
	}
}])  


  .controller('cambiarPasswordCtrl', ['$scope', '$stateParams', 'productService','$cordovaDialogs', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, productService, $cordovaDialogs) {


  $scope.cambiar = function(){


    $cordovaDialogs.confirm('Confirmar cambio de Contraseña', 'Contraseña', ['Aceptar','Cancelar'])
        .then(function(buttonIndex) {
          // no button = 0, 'OK' = 1, 'Cancel' = 2
          var btnIndex = buttonIndex;
          //console.log(btnIndex);
          if(btnIndex == 1){ //Aceptar
             var data = {
                  'email': $scope.email,
                  'password': $scope.pass
                };

                console.log(data);
                var iduser = 1;//localStorage.getItem('email');

                if (typeof iduser !== 'undefined' && iduser !== null){

                  productService.forgot_password.update({'id': iduser}, data, function(data){
                    console.log(data);

                      if(data.$status == 201 || data.$status == 200){

                        $cordovaDialogs.alert('La Contraseña del usuario '+ $scope.email +' fue actualizada correctamente ', '¿Olvidó la Contraseña?' , 'OK');
                        
                     }else{
                        $cordovaDialogs.alert('Algo salio mal, intente más tarde ' , '¿Olvidó la Contraseña?' + data.firstname , 'OK');
                     }

                  });

                }else{
                   $cordovaDialogs.alert('El usuario debe autenticarse o ser creado' , '¡Ups! ', 'Aceptar');
                }
          }

        if(btnIndex == 2){ //Cancelar
          console.log("Clic en Cancelar");
        }          
  
    });     
    }
}])


.controller('optionsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    localStorage.clear();
}])