export class FileHelper {
  static customUserFileName(req, file, cb) {
    const clientId = req.query._clientId;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    let fileExtension = '';
    if (file.mimetype.indexOf('jpeg') > -1) {
      fileExtension = 'jpg';
    } else if (file.mimetype.indexOf('png') > -1) {
      fileExtension = 'png';
    }
    const name = clientId + '-' + uniqueSuffix + '.' + fileExtension;
    req.body = {
      __filename: name,
    };
    cb(null, name);
  }

  static customPersonaFileName(req, file, cb) {
    const personaId = req.query._personaId;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    let fileExtension = '';
    if (file.mimetype.indexOf('jpeg') > -1) {
      fileExtension = 'jpg';
    } else if (file.mimetype.indexOf('png') > -1) {
      fileExtension = 'png';
    }
    const name = personaId + '-' + uniqueSuffix + '.' + fileExtension;
    req.body = {
      __filename: name,
    };
    cb(null, name);
  }

  static destinationUserPath(req, file, cb) {
    cb(null, './images/userPhotos');
  }
  static destinationPersonaPath(req, file, cb) {
    cb(null, './images/personas');
  }
  static destinationFieldsPath(req, file, cb) {
    cb(null, './images/fieldsPhoto');
  }
}
