//====================================================================================================================================
//Limpiar campos formulario
//====================================================================================================================================
function limpiarCamposRefrescar() {
  //Se crea fecha actual como valor por defecto
  var horaActual = new Date();
  var horaFormateada = horaActual.getHours() + ":" + horaActual.getMinutes();

  document.getElementById("nombre").value = "";
  document.getElementById("apellidos").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("fecha").valueAsDate = new Date();
  bloquearFechasPasadas();
  document.getElementById("hora").value = horaFormateada;
  document.getElementById("comensales").value = "";
  document.getElementById("comentarios").value = "";

  //Limpiar posibles mensajes de error
  limpiarMensajesErrorFormulario();

  //Actualizamos la tabla
  consultarReservas();
}

//====================================================================================================================================
//Limpiar masajes error
//====================================================================================================================================
function limpiarMensajesErrorFormulario() {
  console.log("limpiarMensajesErrorFormulario()");
  $("#nombre + div").hide();
  $("#nombre").removeClass("errorInput");

  $("#apellidos + div").hide();
  $("#apellidos").removeClass("errorInput");

  $("#telefono + div").hide();
  $("#telefono").removeClass("errorInput");

  $("#fecha + div").hide();
  $("#fecha").removeClass("errorInput");

  $("#hora + div").hide();
  $("#hora").removeClass("errorInput");

  $("#comensales + div").hide();
  $("#comensales").removeClass("errorInput");

  $("#comentarios + div").hide();
  $("#comentarios").removeClass("errorInput");
}

//====================================================================================================================================
//Establecer fechas por defecto campos fecha y hora
//====================================================================================================================================
function horaActual() {
  var horaActual = new Date();
  var horaFormateada = horaActual.getHours() + ":" + horaActual.getMinutes();
  //document.getElementById('hora').value = horaFormateada;
  return horaFormateada;
}

function fechaActual() {
  var fechaActual = new Date();
  var dia = ("0" + fechaActual.getDate() + 1).slice(-2);
  var mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
  var fechaFormateada = dia + "/" + mes + "/" + fechaActual.getFullYear();
  //document.getElementById('fecha').valueAsDate = new Date();
  bloquearFechasPasadas();
}

function bloquearFechasPasadas() {
  var fechaActual = new Date();

  var mes = fechaActual.getMonth() + 1;
  var dia = fechaActual.getDate();
  var anno = fechaActual.getFullYear();
  if (mes < 10) mes = "0" + mes.toString();
  if (dia < 10) dia = "0" + dia.toString();

  var fechaLimite = anno + "-" + mes + "-" + dia;
  $("#fecha").attr("min", fechaLimite);
}

//====================================================================================================================================
//Filtrar tabla por campo busqueda
//====================================================================================================================================
function filtroCampoBusqueda() {
  $("#campoBusqueda").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#tablaReservas tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
}

//====================================================================================================================================
//Función contador caracteres campo text area
//====================================================================================================================================
function cantidadCaracteres(numeroLetrasActual) {
  $("#comentarios").keyup(function () {
    $("#contadorCaracteres").text($(this).val().length + "/300");
  });
}

//====================================================================================================================================
//Función manejo boton scroll en el pie de página
//====================================================================================================================================
function botonScroll() {
  //Aparecer boton de subir al bajar el scroll
  $(document).on("scroll", function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  });
}

//Función para la animación de scroll al pulsar el boton subir
function animacionScroll() {
  $(document).on("click", "a.scroll-to-top", function (e) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top,
        },
        1000,
        "easeInOutExpo"
      );
    e.preventDefault();
  });
}

//Función total reservas
function totalReservas() {
  var reservasTabla = $("#tablaReservas td").length;
  //console.log(reservasTabla);
  var campo = $("#registrosTabla");
  campo.text(" " + reservasTabla);
}

function totalReservas24horas(numero) {
  //var reservasTabla24horas = $('#tablaReservas td').length;
  //console.log(reservasTabla);
  var campo = $("#registrosTabla24h");
  if (numero) {
    campo.text("" + numero);
  } else {
    campo.text("0");
  }
}

//Mostrar alertas
function mostrarAlerta(mensaje) {
  var alerta = $(".alert");
  alerta.delay(2000);
  alerta.text(mensaje);
  alerta.removeClass("hide").addClass("show").show("face");
  alerta.delay(2000);
  alerta.hide("face");
}

//====================================================================================================================================
//Función para contar el número de resultados ofrecidos
//====================================================================================================================================
function actulizarContadorRegistros() {
  var $resultadosTabla = $("#tablaReservas tr").length - 1;
  $("#registrosTabla").text($resultadosTabla);
}
