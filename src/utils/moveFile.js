const fs = require('fs');

exports.moveFile = (oldDir, newDir, fileName) => {    
    let desDir = __basedir + "/public/uploads/" + newDir;

    if (!fs.existsSync(desDir)){
        fs.mkdirSync(desDir, { recursive: true });
    }

    fs.rename(oldDir, desDir + fileName, function (err) {
        if (err) throw err
        console.log('Successfully moved file!');
      })

    return desDir;
}