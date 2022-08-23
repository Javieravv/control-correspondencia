const validarCamposCompletos = ( req, res, next) => {
    if ( !req.body.nombreorigen) {
        return res.status(400).json({ 
            msg: 'El campo nombre origen es obligatorio'
        })
    }

    next()
}

module.exports = {
    validarCamposCompletos
}