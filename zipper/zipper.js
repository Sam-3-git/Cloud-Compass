const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const output = fs.createWriteStream(path.join(__dirname, '../CloudCompass.zip')); // Output zip file in the root directory
const archive = archiver('zip', {
  zlib: { level: 9 } // Compression level
});

output.on('close', function() {
  console.log('Archive created successfully. Total bytes: ' + archive.pointer());
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// Specify the folder you want to zip
const folderToZip = path.join(__dirname, '../CloudCompass'); // Target directory (CloudCompass)
archive.directory(folderToZip, false);

archive.finalize();
