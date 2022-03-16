const { loadFiles } = require('../helpers')

const uploadFile = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.upload) {
        res.status(400).json({ msg: 'No hay archivos para subir.'});
        return;
    }

    //Imagenes
    const pathName = await loadFiles(req.files);

    res.json({
        pathName
    })
}

module.exports = {
    uploadFile
}