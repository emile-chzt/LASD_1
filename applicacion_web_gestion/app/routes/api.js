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

  return apiRouter;
};
