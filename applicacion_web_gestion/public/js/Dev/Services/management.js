angular
  .module("managementService", [])

  .factory("Management", function ($http) {
    // create a new object
    var managementFactory = {};
    //get all patients
    managementFactory.allPatients = function () {
      return $http.get("/api/patients/");
    };
    //get all doctors
    managementFactory.allDoctors = function () {
      return $http.get("/api/doctors/");
    };
    //get all visits
    managementFactory.allVisits = function () {
      return $http.get("/api/visits/");
    };

    // return our entire userFactory object
    return managementFactory;
  });
