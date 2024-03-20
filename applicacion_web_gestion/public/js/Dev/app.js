// name our angular app
var MyApp = angular.module("LabApp", ["ui.bootstrap", "managementService"]);

MyApp.controller("mainController", function ($scope, Management) {
  //Variables

  $scope.newPatient = 0;
  $scope.newDoctor = 0;
  $scope.newVisit = 0;
  $scope.editPatId;
  $scope.editDocId;
  $scope.editing=0;
  

  $scope.PatientData = {
    patientName: "",
    patientBirthdate: "",
    patientAddress: "",
    patientPhone: "",
  };
  //to be used later
  $scope.DoctorData = {
    doctorName: "",
    doctorSpecialty: "",
  };
  $scope.VisitData = {
    patientId: "",
    doctorId: "",
    visitDate: "",
    diagnosis: "",
  };
  $scope.patientList = {
    Patients: [],
  };

  $scope.doctorList = {
    Doctors: [],
  };
  $scope.editing = 0;

  //functions

  Management.allPatients().success(function (data) {
    $scope.patients = data;
  });
  Management.allDoctors().success(function (data) {
    $scope.doctors = data;
  });

  Management.allVisits().success(function (data) {
    $scope.visits = data;
  });
  $scope.getPatientById = function (patientId) {
    // Find and return the patient with the matching ID
    return $scope.patients.find(function (patient) {
      return patient.PAC_ID === patientId; // Assuming 'id' is the property holding the patient ID
    });
  };
});

$scope.addNewPatient = function () {
  $scope.newPatient = 1;
};
$scope.addNewDoctor = function () {
  $scope.newDoctor = 1;
};
$scope.addNewVisit = function () {
  $scope.newVisit = 1;
};

$scope.createNewPatient = function () {
  if (
    $scope.PatientData.patientName.length > 0 &&
    $scope.PatientData.patientBirthdate &&
    $scope.PatientData.patientAddress.length > 0 &&
    $scope.PatientData.patientPhone.toString().length > 0
  ) {
    $scope.newPatient = 0;
    alert("registrando paciente ");

    var date = new Date($scope.PatientData.patientBirthdate);
    date.setHours(date.getHours() + 1);

    var newPatientData = {
      NOMBRE: $scope.PatientData.patientName,
      FECHA_NAC: date,
      DIRECCION: $scope.PatientData.patientAddress,
      TELEFONO: $scope.PatientData.patientPhone,
    };
    Management.addPatient(newPatientData).success(function (data) {
      $scope.patients = data;
    });

    $scope.PatientData = {
      patientName: "",
      patientBirthdate: "",
      patientAddress: "",
      patientPhone: "",
    };
  } else {
    alert("Para guardar un nuevo usuario debes rellenar todos los campos");
  }
};

$scope.selectedPatient = function (patient) {
  var date = new Date(patient.FECHA_NAC);
  $scope.PatientData.patientName = patient.NOMBRE;
  $scope.PatientData.patientBirthdate = date;
  $scope.PatientData.patientAddress = patient.DIRECCION;
  $scope.PatientData.patientPhone = parseInt(patient.TELEFONO);
  $scope.editPatId = patient.PAC_ID;

  $scope.editing = 1;
  $scope.newPatient = 1;
};
$scope.editPatient = function () {
  var updatePatientData = {
    NOMBRE: $scope.PatientData.patientName,
    FECHA_NAC: $scope.PatientData.patientBirthdate,
    DIRECCION: $scope.PatientData.patientAddress,
    TELEFONO: $scope.PatientData.patientPhone,
  };
  Management.editPat($scope.editPatId, updatePatientData).success(function (
    data
  ) {
    $scope.patients = data;
    $scope.editing = 0;
    $scope.newPatient = 0;
  });
};
///////////////////////////// now doctors

$scope.createNewDoctor = function () {
  if (
    $scope.DoctorData.doctorName.length > 0 &&
    $scope.DoctorData.doctorSpecialty.length > 0
  ) {
    alert("registrando doctor ");
    $scope.newDoctor = 0;
    var newDoctorData = {
      MED_NOMBRE: $scope.DoctorData.doctorName,
      SERVICIO: $scope.DoctorData.doctorSpecialty,
    };
    Management.addDoctor(newDoctorData).success(function (data) {
      $scope.doctors = data;
    });
    $scope.DoctorData = {
      doctorName: "",
      doctorSpecialty: "",
    };
  } else {
    alert("Para guardar un nuevo doctor debes rellenar todos los campos");
  }
};
$scope.selectedDoctor = function (doctor) {
  $scope.DoctorData.doctorName = doctor.MED_NOMBRE;
  $scope.DoctorData.doctorSpecialty = doctor.SERVICIO;
  $scope.editDocId = doctor.MED_ID;

  $scope.editing = 1;
  $scope.newDoctor = 1;
};
$scope.editDoctor = function () {
  var updateDoctorData = {
    MED_NOMBRE: $scope.DoctorData.doctorName,
    SERVICIO: $scope.DoctorData.doctorSpecialty,
  };

  Management.editDoc($scope.editDocId, updateDoctorData).success(function (
    data
  ) {
    $scope.doctors = data;
    $scope.editing = 0;
    $scope.newDoctor = 0;
  });
};

///////////////////////////// now visits

$scope.displayer_Visits = function () {
  $scope.newVisit = 1;

  Management.allPatients().success(function (data) {
    for (i = 0; i < data.length; i++) {
      var dataPat = {
        name: data[i].NOMBRE,
        id: data[i].PAC_ID,
      };
      $scope.patientList.Patients.push(dataPat);
      s;
    }
  });

  Management.allDoctors().success(function (data) {
    for (i = 0; i < data.length; i++) {
      var dataDoc = {
        name: data[i].MED_NOMBRE,
        id: data[i].MED_ID,
      };
      $scope.doctorList.Doctors.push(dataDoc);
    }
  });
};

$scope.createNewVisit = function () {
  if (
    $scope.VisitData.patientName.name.length > 0 && //due to the box, we get a dictionnary
    $scope.VisitData.doctorName.name.length > 0 && // ex : {"name":"JOSE SANCHEZ ALVAREZ","id":5}
    $scope.VisitData.diagnosis.length > 0 &&
    $scope.VisitData.visitDate
  ) {
    alert("registrando visita ");
    $scope.newVisit = 0;
    var date = new Date($scope.VisitData.visitDate);
    date.setHours(date.getHours() + 1);
    var newVisitData = {
      PAC_ID: $scope.VisitData.patientName.id,
      MED_ID: $scope.VisitData.doctorName.id,
      DIAGNOSTICO: $scope.VisitData.diagnosis,
      FECHA_VIS: date,
    };
    Management.addVisit(newVisitData).success(function (data) {
      $scope.visits = data;
    });
    $scope.VisitData = {
      patientName: "",
      doctorName: "",
      diagnosis: "",
      visitDate: "",
    };
  } else {
    alert("Para guardar una nueva visita debes rellenar todos los campos");
  }
};

$scope.selectedVisit = function (visit) {
  for (i = 0; i < $scope.patients.length; i++) {
    var dataPat = {
      name: $scope.patients[i].NOMBRE,
      id: $scope.patients[i].PAC_ID,
    };
    $scope.patientList.Patients.push(dataPat);
  }

  for (i = 0; i < $scope.doctors.length; i++) {
    var dataDoc = {
      name: $scope.doctors[i].MED_NOMBRE,
      id: $scope.doctors[i].MED_ID,
    };
    $scope.doctorList.Doctors.push(dataDoc);
  }
  for (i = 0; i < $scope.patientList.Patients.length; i++) {
    if ($scope.patientList.Patients[i].id == visit.PAC_ID) {
      $scope.VisitData.patientName = $scope.patientList.Patients[i];
    }
  }
  for (i = 0; i < $scope.doctorList.Doctors.length; i++) {
    if ($scope.doctorList.Doctors[i].id == visit.MED_ID) {
      $scope.VisitData.doctorName = $scope.doctorList.Doctors[i];
    }
  }

  var date = new Date(visit.FECHA_VIS);
  $scope.VisitData.patientName = {
    name: visit.NOMBRE,
    id: visit.PAC_ID,
  };
  $scope.VisitData.doctorName = {
    name: visit.MED_NOMBRE,
    id: visit.MED_ID,
  };
  $scope.VisitData.diagnosis = visit.DIAGNOSTICO;
  $scope.VisitData.visitDate = date;
  $scope.editVisitId = visit.VISITA_ID;

  $scope.editing = 1;
  $scope.newVisit = 1;
};

$scope.editVisit = function () {
  var updateVisitData = {
    PAC_ID: $scope.VisitData.patientName.id,
    MED_ID: $scope.VisitData.doctorName.id,
    DIAGNOSTICO: $scope.VisitData.diagnosis,
    FECHA_VIS: $scope.VisitData.visitDate,
  };

  Management.editVisit($scope.editVisitId, updateVisitData).success(function (
    data
  ) {
    $scope.visits = data;
    $scope.editing = 0;
    $scope.newVisit = 0;
    $scope.patientList = {
      Patients: [],
    };

    $scope.doctorList = {
      Doctors: [],
    };
  });
};

$scope.cancelNewPatient = function () {
  $scope.newPatient = 0;
  $scope.PatientData = {
    patientName: "",
    patientBirthdate: "",
    patientAddress: "",
    patientPhone: "",
  };
};
$scope.deletePatient = function (id) {
  Management.deletePat(id).success(function (data) {
    $scope.patients = data;
  });
};

$scope.cancelNewDoctor = function () {
  $scope.newDoctor = 0;
  $scope.DoctorData = {
    doctorName: "",
    doctorSpecialty: "",
  };
};
$scope.deleteDoctor = function (id) {
  Management.deleteDoc(id).success(function (data) {
    $scope.doctors = data;
  });
};

$scope.cancelNewVisit = function () {
  $scope.newVisit = 0;
  $scope.VisitData = {
    patientName: "",
    doctorName: "",
    diagnosis: "",
    visitDate: "",
  };
  $scope.patientList = {
    Patients: [],
  };

  $scope.doctorList = {
    Doctors: [],
  };
};
$scope.deleteVisit = function (id) {
  Management.deleteVisit(id).success(function (data) {
    $scope.visits = data;
  });
};
