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
    managementFactory.deletePat = function (id) {
      return $http.delete("/api/patients/" + id);
    };
    managementFactory.deleteDoc = function (id) {
      return $http.delete("/api/doctors/" + id);
    };
    managementFactory.deleteVisit = function (id) {
      return $http.delete("/api/visits/" + id);
    };
    // update a patient
    managementFactory.editPat = function (id, Data) {
      return $http.put("/api/patients/" + id, Data);
    };

    // update a doctor
    managementFactory.editDoc = function (id, Data) {
      return $http.put("/api/doctors/" + id, Data);
    };
    // update a visit
    managementFactory.editVisit = function (id, Data) {
      return $http.put("/api/visits/" + id, Data);
    };

    // return our entire userFactory object
    return managementFactory;
  });
