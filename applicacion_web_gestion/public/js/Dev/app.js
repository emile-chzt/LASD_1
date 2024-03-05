// name our angular app
var MyApp = angular.module("LabApp", ["ui.bootstrap", "managementService"]);

MyApp.controller("mainController", function ($scope, Management) {
  Management.allPatients().success(function (data) {
    //alert(JSON.stringify(data));
    $scope.patients = data;
  });
  Management.allDoctors().success(function (data) {
    alert(JSON.stringify(data));
    $scope.doctors = data;
  });
  //get all visits
  Management.allVisits().success(function (data) {
    //alert(JSON.stringify(data));
    $scope.visits = data;
  });
});
