var express = require('express');
var router = express.Router();
var usuariosModel = require('../../models/usuariosModel');
var novedadesModel = require('../../models/novedadesModel');

/* Listar novedades. */
router.get('/', async function (req, res, next) {

    var novedades = await novedadesModel.getNovedades();

    res.render('admin/novedades',{
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades
    });
});

/*Borrar novedades.*/
router.get('/eliminar/:id', async (req,res,next) => {
    var id = req.params.id;
    await novedadesModel.deleteNovedadByID(id);
    res.redirect('/admin/novedades')
});


module.exports = router;
