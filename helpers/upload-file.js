const { Promise } = require("mongoose");
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const loadFiles = ( files, validateExtension = ['png', 'jpg', 'jpeg', 'gif'], folder = '' ) => {

    return new Promise( (resolve, reject) => {
        const { upload } = files;
        const separateName = upload.name.split('.');
        const extensionFile = separateName[separateName.length - 1];

        //Validar la extension
        if (!validateExtension.includes(extensionFile)) {
            return reject(`La extensión ${extensionFile} no es permitida solo:  ${validateExtension}`)
        }

        const nameTemp = uuidv4() + '.' + extensionFile;
        const uploadPath = path.join(__dirname, '../uploads', folder, nameTemp);

        upload.mv(uploadPath, (err) => {
            if (err) {
                reject(err)
            }

            resolve(nameTemp);
        });

    });


}


module.exports = {
    loadFiles
}