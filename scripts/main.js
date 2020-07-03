var app = new Vue({
  el: "#app",
  data: {
    mensajeError: "",
    mensajeAlerta: "",
    erroresValidacion: [],
    verModalCrear: false,
    verModalEditar: false,
    verModalEliminar: false,
    listaReservas: [],
    listaReservas24horas: [],
    nuevaReserva: {
      nombre: "",
      apellidos: "",
      telefono: "",
      fecha: moment(new Date()).format("YYYY-MM-DD"),
      hora: moment(new Date()).format("hh:mm"),
      comensales: "",
      comentarios: "",
    },
    reservaActual: {},
    datosReservaActual: {
      fecha: "",
      hora: "",
    },

    valorCampoBusqueda: "",
    columnas: [
      { nombre: "Nombre", codigo: "nombre" },
      { nombre: "Apellidos", codigo: "apellidos" },
      { nombre: "Fecha y hora", codigo: "fecha" },
      { nombre: "Comensales", codigo: "comensales" },
    ],

    columnaActual: "nombre",
    columnaDireccionOrden: "asc",

    filtroFechaDesde: null,
    filtroFechaHasta: null,

    activarPestana24horas: false,
  },
  mounted() {
    this.consultarReservas();
    this.consultarReservas24horas();
  },
  filters: {
    formatoFecha: function (fecha) {
      return moment(fecha).format("DD/MM/YYYY");
    },
    formatoHora: function (fecha) {
      return moment(fecha).format("hh:mm");
    },
  },
  watch: {
    filtroFechaDesdeViaja(fechaVieja, fechaNueva) {
      listarReservasFiltradasOrdenadas();
      listarReservas24horasFiltradasOrdenadas();
    },
  },
  computed: {
    //===========================================================================================
    //Filtro ordenar resultados para la tabla general de reservas
    //===========================================================================================
    listarReservasFiltradasOrdenadas() {
      return this.listaReservas
        .sort((a, b) => {
          let modificador = 1;
          if (this.columnaDireccionOrden === "desc") modificador = -1;
          if (a[this.columnaActual] < b[this.columnaActual])
            return -1 * modificador;
          if (a[this.columnaActual] > b[this.columnaActual])
            return 1 * modificador;
          return 0;
        })
        .filter(
          (reserva) =>
            reserva.nombre
              .toLowerCase()
              .includes(this.valorCampoBusqueda.toLowerCase()) ||
            reserva.apellidos
              .toLowerCase()
              .includes(this.valorCampoBusqueda.toLowerCase())
        )
        .filter((reserva) => {
          if (this.filtroFechaDesde == null && this.filtroFechaHasta == null) {
            return true;
          } else {
            return (
              reserva.fecha >= this.filtroFechaDesde &&
              reserva.fecha <= this.filtroFechaHasta
            );
          }
        });
    },
    //===========================================================================================
    //Filtro ordenar resultados para la tabla de 24 horas
    //===========================================================================================
    listarReservas24horasFiltradasOrdenadas() {
      return this.listaReservas24horas
        .sort((a, b) => {
          let modificador = 1;
          if (this.columnaDireccionOrden === "desc") modificador = -1;
          if (a[this.columnaActual] < b[this.columnaActual])
            return -1 * modificador;
          if (a[this.columnaActual] > b[this.columnaActual])
            return 1 * modificador;
          return 0;
        })
        .filter(
          (reserva) =>
            reserva.nombre
              .toLowerCase()
              .includes(this.valorCampoBusqueda.toLowerCase()) ||
            reserva.apellidos
              .toLowerCase()
              .includes(this.valorCampoBusqueda.toLowerCase())
        )
        .filter((reserva) => {
          if (this.filtroFechaDesde == null && this.filtroFechaHasta == null) {
            return true;
          } else {
            return (
              reserva.fecha >= this.filtroFechaDesde &&
              reserva.fecha <= this.filtroFechaHasta
            );
          }
        });
    },
  },
  methods: {
    //===========================================================================================
    //Consultar al servidor el total de reservas desde hoy en adelante
    //===========================================================================================
    consultarReservas() {
      axios
        .get(
          "http://localhost/uoc/programacion_web_avanzada/restaurant_app_vue/controllers/reservaController.php?tarea=consultarReservas"
        )
        .then(function (response) {
          app.listaReservas = response.data;
        })
        .catch(function (error) {
          app.mensajeAlerta = response.data.message;
        });
    },
    //===========================================================================================
    //Consultar al servidor las reservas de las próximas 24 horas
    //===========================================================================================
    consultarReservas24horas() {
      axios
        .get(
          "http://localhost/uoc/programacion_web_avanzada/restaurant_app_vue/controllers/reservaController.php?tarea=consultarReservas24horas"
        )
        .then(function (response) {
          console.log(response);
          app.listaReservas24horas = response.data;
        })
        .catch(function (error) {
          app.mensajeAlerta = response.data.message;
        });
    },
    //===========================================================================================
    //Enviar al servidor los datos de la reserva para almacenar en la base de datos
    //===========================================================================================
    guardarReserva() {
      var datosFormulario = app.validacionDatos(app.nuevaReserva);
      axios
        .post(
          "http://localhost/uoc/programacion_web_avanzada/restaurant_app_vue/controllers/reservaController.php?tarea=guardarReserva",
          datosFormulario
        )
        .then(function (response) {
          //Limpiar campos formulario
          app.nuevaReserva = {
            nombre: "",
            apellidos: "",
            telefono: "",
            fecha: "",
            hora: "",
            comensales: "",
            comentarios: "",
          };
          app.mensajeAlerta = "Reserva guardada";
          app.listaReservas = response.data;
          app.consultarReservas();
        })
        .catch(function (error) {
          app.mensajeAlerta = response.data.message;
        });
    },
    //===========================================================================================
    //Actualziar en la base de datos los datos de una reserva
    //===========================================================================================
    modificarReserva() {
      var datosFormulario = app.validacionDatos(app.reservaActual);
      axios
        .post(
          "http://localhost/uoc/programacion_web_avanzada/restaurant_app_vue/controllers/reservaController.php?tarea=modificarReserva",
          datosFormulario
        )
        .then(function (response) {
          //Limpiar campos formulario
          app.reservaActual = {};
          app.mensajeAlerta = "Reserva modificada";
          app.listaReservas = response.data;
          app.consultarReservas();
        })
        .catch(function (error) {
          app.mensajeAlerta = response.data.message;
        });
    },
    //===========================================================================================
    //Eliminar de la base de datos una reserva
    //===========================================================================================
    eliminarReserva() {
      var datosFormulario = app.validacionDatos(app.reservaActual);
      axios
        .post(
          "http://localhost/uoc/programacion_web_avanzada/restaurant_app_vue/controllers/reservaController.php?tarea=eliminarReserva",
          datosFormulario
        )
        .then(function (response) {
          //Limpiar campos formulario
          app.reservaActual = {};
          app.mensajeAlerta = "Reserva Eliminada";
          app.listaReservas = response.data;
          app.consultarReservas();
        })
        .catch(function (error) {
          app.mensajeAlerta = response.data.message;
        });
    },
    //===========================================================================================
    //Grupación datos de los campos del formulario
    //===========================================================================================
    validacionDatos(elemento) {
      var datosCamposFormulario = new FormData();
      for (var i in elemento) {
        datosCamposFormulario.append(i, elemento[i]);
      }
      return datosCamposFormulario;
    },

    //===========================================================================================
    //Recuperar los datos de una reserva de la tabla para mostrarla o eliminarla
    //===========================================================================================
    seleccionarReservaActual(reserva) {
      this.reservaActual = reserva;

      //ActualizarFechas
      var fechaR = new Date(reserva.fecha);

      this.datosReservaActual.fecha = moment(fechaR).format("YYYY-MM-DD");
      this.datosReservaActual.hora = moment(reserva.fecha).format("hh:mm");
    },

    //===========================================================================================
    //Método para resetear todos los mensajes de alerta
    //===========================================================================================
    limpiarAlertas() {
      app.mensajeAlerta = "";
    },
    //===========================================================================================
    //Función para modificar el atributo de la dicción de la columna
    //ordenada ASC - DESC
    //===========================================================================================
    ordenar(columna) {
      if (columna === this.columnaActual) {
        this.columnaDireccionOrden =
          this.columnaDireccionOrden === "asc" ? "desc" : "asc";
      }
      this.columnaActual = columna;
    },
    //===========================================================================================
    //Comprobar reservas 24 horas cada minuto
    //===========================================================================================
    comporbarCadaMinuto() {
      setInterval(() => {
        this.consultarReservas24horas();
      }, 1000);
    },
    //===========================================================================================
    //Validar formulario
    //===========================================================================================
    validarFormulario(e) {

      this.erroresValidacion = [];

      //Validar nombre
      if (this.nuevaReserva.nombre == null || this.nuevaReserva.nombre == "") {
        this.erroresValidacion.push("El nombre es obligatorio.");
      }

      //Validar apellidos
      if (
        this.nuevaReserva.apellidos == null ||
        this.nuevaReserva.apellidos == ""
      ) {
        this.erroresValidacion.push("Los apellidos son obligatorios.");
      }

      //Validar Telefono
      if (
        this.nuevaReserva.telefono == null ||
        this.nuevaReserva.telefono == ""
      ) {
        this.erroresValidacion.push("El telefono es obligatorio.");
      } else if (!this.validarTelefono(this.nuevaReserva.telefono)) {
        this.erroresValidacion.push("El telefono debe ser un número válido.");
      }

      // //Validar Fecha
      // if (this.validarFechaHora(this.nuevaReserva) == false) {
      //   this.erroresValidacion.push(
      //     "Recuerda reservar con 24 hoas de antelación."
      //   );
      // }

      //Validar Comensales
      if (
        this.nuevaReserva.comensales >= 10 ||
        this.nuevaReserva.comensales < 0
      ) {
        this.erroresValidacion.push(
          "El número de comensales debe estar entre 1 y 10."
        );
      }

      if(!this.erroresValidacion.length) {
        this.verModalCrear=false;
        this.guardarReserva();
        return true;
      }
     
    },
    //===========================================================================================
    //Funciones de apoyo a la validación de datos
    //===========================================================================================
    validarTelefono(telefono) {
      var regTelefono = "(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}";
      //return telefono.match(regTelefono);
      return true;
    },
    // validarFechaHora(reserva) {

    //   // var resultado = false;

    //   // //ActualizarFechas
    //   // var fechaInput = moment(reservaActual.fecha).format("YYYY-MM-DD hh:mm:ss");
    //   // var fechaFutura = moment().add(1, 'days');

    //   // //Si la fecha indicada es superior a la fecha actual +1 día(24 horas)
    //   // if (fechaInput >= fechaFutura) {
    //   //   resultado = true;
    //   // }

    //   return true;
    // },
  },
});
