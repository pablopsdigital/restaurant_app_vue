//Función para comprobar que la fecha indicada por el usuario entra dentro
//del rango de 24 horas de antelación
function validarFecha(fecha, hora) {
  var fechaHora = fecha + " " + hora;
  var fechaParse = Date.parse(fechaHora);
  var fechaReserva = new Date(fechaParse);

  //Si la fecha indicada es superior a la fecha actual +1 día(24 horas)
  if (fechaReserva.getDate() >= fechaActual.getDate() + 1) {
    alert("La fecha introducida correcta");
    resultado = true;
  } else {
    alert("No se puede reservar con menos de 24 horas de antelación");
  }
}

//====================================================================================================================================
//Función comprobar campos
//====================================================================================================================================
function mensajeError(selector, mensaje) {
  $(selector).after('<div class="errorText">' + mensaje + "</div>");
  $(selector).addClass("errorInput");
}

function comprobarNombre(idElemento) {
  var resultado = false;
  var nombre = $(idElemento);
  if (nombre.val() == null || nombre.val() == "") {
    mensajeError(nombre, "Introduce un nombre");
  } else {
    resultado = true;
  }
  return resultado;
}

function comprobarApellidos(idElemento) {
  var resultado = false;
  var apellidos = $(idElemento);
  if (apellidos.val() == null || apellidos.val() == "") {
    mensajeError(apellidos, "Introduce los apellidos");
  } else {
    resultado = true;
  }
  return resultado;
}

function comprobarTelefono(idElemento) {
  var regTelefono = "/^[d]{3}[-]*([d]{2}[-]*){2}[d]{2}$/";
  var resultado = false;
  var telefono = $(idElemento);
  if (telefono.val() == null || telefono.val() == "") {
    mensajeError(telefono, "Introduce un teléfono");
  } else {
    if (telefono.val().match(regTelefono)) {
      mensajeError(telefono, "Introduce un teléfono válido");
    } else {
      resultado = true;
    }
  }
  return resultado;
}

function comprobarFecha(idFecha, idHora) {
  var resultado = false;

  //Se crea la fecha actual
  var fechaActual = new Date();

  //Se crea la fecha con los valores de los campos
  var fecha = $(idFecha); //0000-00-00
  var hora = $(idHora); //00:00
  var fechaHora = fecha.val() + " " + hora.val();
  var fechaParse = Date.parse(fechaHora);
  var fechaReserva = new Date(fechaParse);

  //Si la fecha indicada es superior a la fecha actual +1 día(24 horas)
  if (fechaReserva.getDate() >= fechaActual.getDate() + 1) {
    resultado = true;
  } else {
    //alert ("No se puede reservar con menos de 24 horas de antelación");
    mensajeError(fecha, "Recuerda reservar con 24 hoas de antelación");
    mensajeError(hora, "");
  }
  return resultado;
}

function comprobarComensales(idElemento) {
  var resultado = false;
  var comensales = $(idElemento);
  if ($(comensales).val() <= 10 && $(comensales).val() > 0) {
    resultado = true;
  } else {
    mensajeError(comensales, "El número de comensales debe estar entre 1 y 10");
  }
  return resultado;
}

function validarFormulario() {
  alert("dentor");
  var resultado = false;

  var nombreOk = false;
  var apellidosOK = false;
  var telefonoOK = false;
  var fechaOK = false;
  var comensalesOK = false;

  if (comprobarNombre("#nombre") == true) {
    nombreOk = true;
  }
  if (comprobarApellidos("#apellidos") == true) {
    apellidosOK = true;
  }
  if (comprobarTelefono("#telefono") == true) {
    telefonoOK = true;
  }
  if (comprobarFecha("#fecha", "#hora") == true) {
    fechaOK = true;
  }
  if (comprobarComensales("#comensales") == true) {
    comensalesOK = true;
  }

  if (nombreOk && apellidosOK && telefonoOK && fechaOK && comensalesOK) {
    resultado = true;
  }

  return resultado;
}

//====================================================================================================================================
//Función limpiar errores y estilos campos
//====================================================================================================================================
function limpiarErrores() {
  $("#nombre").keyup(function () {
    $("#nombre + div").hide();
    $("#nombre").removeClass("errorInput");
  });

  $("#apellidos").keyup(function () {
    $("#apellidos + div").hide();
    $("#apellidos").removeClass("errorInput");
  });

  $("#telefono").keyup(function () {
    $("#telefono + div").hide();
    $("#telefono").removeClass("errorInput");
  });

  $("#fecha").keyup(function () {
    $("#fecha + div").hide();
    $("#fecha").removeClass("errorInput");
  });

  $("#hora").keyup(function () {
    $("#hora + div").hide();
    $("#hora").removeClass("errorInput");
  });

  $("#comensales").keyup(function () {
    $("#comensales + div").hide();
    $("#comensales").removeClass("errorInput");
  });
}
