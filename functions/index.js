const functions = require("firebase-functions");
const cors = require("cors")({
  origin: true,
});
const OpenPay = require("openpay");
const openpay = new OpenPay(
  "mgq9hsebo1sbdtf1ifpz",
  "sk_44cd2924074b4647ad3392eeb98106a2"
);
openpay;

exports.helloWorld = functions.https.onRequest(async (request, response) => {
  /*   functions.logger.info("Hello logs!", { structuredData: true });
   */ return cors(request, response, () => {
    if (request.method === "POST") {
      respuesta = { method: "POST", params: request.body };
    } else {
      respuesta = "Hello from Firebase! ";
    }
    response.send(respuesta);
  });
  /* } ) ) */
  //response.send(respuesta)
});

exports.anotherFunction = functions.https.onRequest((req, res) => {
  res.send({ message: "this is another function", apiKey });
});

exports.pagoReinscripcionToken = functions.https.onRequest( (request, response) => {
  return cors(request, response, () => {
    const { nombre, apellidos, monto, telefono, correo, concepto, token, device_session_id } = request.body;
    
    var cargo_reinscripcion = {
      source_id: token,
      method: "card",
      amount: monto,
      currency: "MXN",
      description: concepto,
      device_session_id: device_session_id,
      customer: {
        name: nombre,
        last_name: apellidos,
        phone_number: telefono,
        email: correo,
      },
    };

    console.log(request.body);
    console.log("\n");
    console.log(cargo_reinscripcion);
    openpay.charges.create(cargo_reinscripcion, function (error, charge) {
      if (error) {
        response.send(error);
      } else {
        response.send(charge);
      }
    });

  })
})

exports.pagoReinscripcionTienda = functions.https.onRequest((request, response) => {

      return cors(request, response, () => {
        const { nombre, apellidos, monto, telefono, correo, concepto } = request.body;
        var cargo_reinsrcipcion = {
          method: "store",
          //amount: monto,
          amount: "105.05",
          description: concepto,
          customer: {
            name: nombre,
            last_name: apellidos,
            phone_number: telefono,
            email: correo,
          },
        };

        openpay.charges.create(cargo_reinsrcipcion, function (error, charge) {
          if (error) {
            response.send(error);
          } else {
            response.send(charge);
          }
        });
      });
    
});

exports.pagoReinscripcionTarjeta = functions.https.onRequest((request, response) => {

  return cors(request, response, () => {
    const { nombre, apellidos, monto, telefono, correo, concepto } = request.body;
    var cargo_reinsrcipcion = {
      method: "card",
      amount: monto,
      description: concepto,
      customer: {
        name: nombre,
        last_name: apellidos,
        phone_number: telefono,
        email: correo,
      },
      send_email:false,
      confirm:false,
    };

    openpay.charges.create(cargo_reinsrcipcion, function (error, charge) {
      if (error) {
        response.send(error);
      } else {
        response.send(charge);
      }
    });
  });

});