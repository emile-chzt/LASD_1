var bodyParser = require("body-parser"); // get body-parser
var jwt = require("jsonwebtoken"); // para trabajar el token
var fs = require("fs");
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
module.exports = function (app, express) {
  var apiRouter = express.Router();

  // Route for /patients
  apiRouter.route("/patients").get(function (req, res, next) {
    req.getConnection(function (err, conn) {
      if (err) return next("Cannot Connect");

      //Obtain patient data
      var query = conn.query(
        "SELECT * FROM tbpacientes",
        function (err, patients) {
          if (err) {
            console.log(err);
            return next("Mysql error, check your query");
          }
          res.json(patients);
        }
      );
    });
  });
  apiRouter.route("/patients").post(function (req, res) {
    req.getConnection(function (err, conn) {
      if (err) return next("Cannot Connect");

      // Guardamos los datos del nuevo paciente
      var query = conn.query(
        "INSERT INTO tbpacientes set ?",
        req.body,
        function (err, newPatient) {
          if (err) {
            console.log(err);
            return next("Mysql error, check your query");
          }

          var query = conn.query(
            "SELECT * FROM tbpacientes",
            function (err, patients) {
              if (err) {
                console.log(err);
                return next("Mysql error, check your query");
              }

              res.json(patients);
            }
          );
        }
      );
    });
  });
  apiRouter
    .route("/patients/:patientId")

    .delete(function (req, res) {
      var patientId = req.params.patientId;

      req.getConnection(function (err, conn) {
        if (err) return next("Cannot Connect");

        var query = conn.query(
          "DELETE FROM tbpacientes  WHERE PAC_ID = ? ",
          patientId,
          function (err, patientDeleted) {
            if (err) {
              console.log(err);
              return next("Mysql error, check your query");
            }

            var query = conn.query(
              "SELECT * FROM tbpacientes",
              function (err, patientList) {
                if (err) {
                  console.log(err);
                  return next("Mysql error, check your query");
                }

                res.json(patientList);
              }
            );
          }
        );
      });
    })
    .put(function (req, res) {
      var patientId = req.params.patientId;

      req.getConnection(function (err, conn) {
        if (err) return next("Cannot Connect");

        var query = conn.query(
          "UPDATE tbpacientes set ? WHERE PAC_ID = ? ",
          [req.body, patientId],
          function (err, rows) {
            if (err) {
              console.log(err);
              return next("Mysql error, check your query");
            }

            var query = conn.query(
              "SELECT * FROM tbpacientes",
              function (err, patientsList) {
                if (err) {
                  console.log(err);
                  return next("Mysql error, check your query");
                }
                res.json(patientsList);
              }
            );
          }
        );
      });
    });

  // Route for /doctors
  apiRouter.route("/doctors").get(function (req, res, next) {
    req.getConnection(function (err, conn) {
      if (err) return next("Cannot Connect");

      //Obtain doctor data
      var query = conn.query(
        "SELECT * FROM tbmedicos",
        function (err, doctors) {
          if (err) {
            console.log(err);
            return next("Mysql error, check your query");
          }
          res.json(doctors);
        }
      );
    });
  });
  apiRouter.route("/doctors").post(function (req, res) {
    req.getConnection(function (err, conn) {
      if (err) return next("Cannot Connect");

      // Guardamos los datos del nuevo doctor
      var query = conn.query(
        "INSERT INTO tbmedicos set ?",
        req.body,
        function (err, newDoctor) {
          if (err) {
            console.log(err);
            return next("Mysql error, check your query");
          }

          var query = conn.query(
            "SELECT * FROM tbmedicos",
            function (err, doctors) {
              if (err) {
                console.log(err);
                return next("Mysql error, check your query");
              }

              res.json(doctors);
            }
          );
        }
      );
    });
  });
  apiRouter
    .route("/doctors/:doctorId")

    .delete(function (req, res) {
      var doctorId = req.params.doctorId;

      req.getConnection(function (err, conn) {
        if (err) return next("Cannot Connect");

        var query = conn.query(
          "DELETE FROM tbmedicos  WHERE MED_ID = ? ",
          doctorId,
          function (err, doctorDeleted) {
            if (err) {
              console.log(err);
              return next("Mysql error, check your query");
            }

            var query = conn.query(
              "SELECT * FROM tbmedicos",
              function (err, doctorList) {
                if (err) {
                  console.log(err);
                  return next("Mysql error, check your query");
                }

                res.json(doctorList);
              }
            );
          }
        );
      });
    })
    .put(function (req, res) {
      var doctorId = req.params.doctorId;

      req.getConnection(function (err, conn) {
        if (err) return next("Cannot Connect");

        var query = conn.query(
          "UPDATE tbmedicos set ? WHERE MED_ID = ? ",
          [req.body, doctorId],
          function (err, rows) {
            if (err) {
              console.log(err);
              return next("Mysql error, check your query");
            }

            var query = conn.query(
              "SELECT * FROM tbmedicos",
              function (err, doctorsList) {
                if (err) {
                  console.log(err);
                  return next("Mysql error, check your query");
                }
                res.json(doctorsList);
              }
            );
          }
        );
      });
    });
  //route for /visits
  apiRouter.route("/visits").get(function (req, res, next) {
    req.getConnection(function (err, conn) {
      if (err) return next("Cannot Connect");

      //Obtain visit data
      var query = conn.query("SELECT * FROM tbvisitas", function (err, visits) {
        if (err) {
          console.log(err);
          return next("Mysql error, check your query");
        }
        res.json(visits);
      });
    });
  });
  apiRouter.route("/visits").post(function (req, res) {
    req.getConnection(function (err, conn) {
      if (err) return next("Cannot Connect");

      // Guardamos los datos de la nueva visita
      var query = conn.query(
        "INSERT INTO tbvisitas set ?",
        req.body,
        function (err, newVisit) {
          if (err) {
            console.log(err);
            return next("Mysql error, check your query");
          }

          var query = conn.query(
            "SELECT * FROM tbvisitas",
            function (err, visits) {
              if (err) {
                console.log(err);
                return next("Mysql error, check your query");
              }

              res.json(visits);
            }
          );
        }
      );
    });
  });
  apiRouter
    .route("/visits/:visitId")

    .delete(function (req, res) {
      var visitId = req.params.visitId;

      req.getConnection(function (err, conn) {
        if (err) return next("Cannot Connect");

        var query = conn.query(
          "DELETE FROM tbvisitas  WHERE VISITA_ID = ? ",
          visitId,
          function (err, visitDeleted) {
            if (err) {
              console.log(err);
              return next("Mysql error, check your query");
            }

            var query = conn.query(
              "SELECT * FROM tbvisitas",
              function (err, visitList) {
                if (err) {
                  console.log(err);
                  return next("Mysql error, check your query");
                }

                res.json(visitList);
              }
            );
          }
        );
      });
    })
    .put(function (req, res) {
      var visitId = req.params.visitId;

      req.getConnection(function (err, conn) {
        if (err) return next("Cannot Connect");

        var query = conn.query(
          "UPDATE tbvisitas set ? WHERE VISITA_ID = ? ",
          [req.body, visitId],
          function (err, rows) {
            if (err) {
              console.log(err);
              return next("Mysql error, check your query");
            }

            var query = conn.query(
              "SELECT * FROM tbvisitas",
              function (err, visitList) {
                if (err) {
                  console.log(err);
                  return next("Mysql error, check your query");
                }
                res.json(visitList);
              }
            );
          }
        );
      });
    });

  return apiRouter;
};
