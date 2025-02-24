var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/', async (req, res, next) => {
  var email = req.body.email;
  var mensaje = req.body.mensaje;


  var obj = {
    to: 'bau241006@gmail.com',
    subjet: 'CONTACTO WEB',
    html: email + "se contacto a traves de la web y quiere mas informacion. <br> Ademas, dejo este mensaje: " + mensaje
  }

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })


  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente!',
  })
});




module.exports = router;
