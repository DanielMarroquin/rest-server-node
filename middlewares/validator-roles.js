const role = require("../models/role");


const validationRole = (req, res, next) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Se quiere validar rol sin confirmar token'
        });
    }

    const { role, name } = req.user;
    
    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `El usuario ${ name } no tiene permisos de administrador`
        });
    }

    next();
}

const haveRole = ( ...roles ) => {

    return (req, res, next) => {
        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Se quiere validar rol sin confirmar token'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            });
        }
       
        next();
    }
}

module.exports = {
    validationRole,
    haveRole
}