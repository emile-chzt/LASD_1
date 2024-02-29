// name our angular app
angular
  .module("mi_primera_app_angular", [])

  .controller("mainController", function () {
    // bind this to vm (view-model)
    var vm = this;

    // define variables and objects on this
    // this lets them be available to our views
    // information that comes from our form
    vm.estadoData = {};
    vm.addEstado = function () {
      // add a new estado de ánimo to the list
      vm.estados.push({
        situacion: vm.estadoData.situacion,
        valoracion_aprendizaje: vm.estadoData.valoracion_aprendizaje,
        sentimiento: vm.estadoData.sentimiento,
      });
      //after our estado de ánimo has been added, clear the form
      vm.estadoData = {};
    };
    // define a basic variable
    vm.message =
      "Hola ¿Cómo estás? No te asustes, verás que todo es más fácil de lo que parece...";

    // define a list of items
    vm.estados = [
      {
        situacion: "Todo controlado",
        valoracion_aprendizaje: 10,
        sentimiento: "Satisfaccion",
      },
      {
        situacion: "Tengo algunas dudas",
        valoracion_aprendizaje: 5,
        sentimiento: "Incertidumbre",
      },
      {
        situacion: "Estoy entrando en pánico",
        valoracion_aprendizaje: 1,
        sentimiento: "Depresión",
      },
    ];
  });
