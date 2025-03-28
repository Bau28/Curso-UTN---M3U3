var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModel = require('../models/novedadesModel');
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', async function (req, res, next) {

  var novedades = await novedadesModel.getNovedades();

  novedades = novedades.splice(0,5);

  novedades = novedades.map(novedad => {
    if(novedad.img_id){
      const imagen = cloudinary.url(novedad.img_id,{
        width: 460,
        crop: 'fill'
      });
      return {
        ...novedad,
        imagen
      }
    } else {
      return {
        ...novedad,
        imagen: '/images/noimage.png'
      }
    }
  });

  res.render('index', {
    novedades
  });
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
