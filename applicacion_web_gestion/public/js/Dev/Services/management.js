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

    // add new patient
    managementFactory.addPatient = function (PatientData) {
      alert("hola");
      return $http.post("/api/patients/", PatientData);
    };
    // add new doctor
    managementFactory.addDoctor = function (DoctorData) {
      return $http.post("/api/doctors/", DoctorData);
    };
    // add new visit
    managementFactory.addVisit = function (VisitData) {
      return $http.post("/api/visits/", VisitData);
    };
    // return our entire userFactory object
    return managementFactory;
  });