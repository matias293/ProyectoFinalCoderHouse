const fs = require('fs');

export const deleteFile = (filePath: string) => {
  fs.unlink(filePath, (err: any) => {
    if (err) {
      throw err;
    }
  });
};
