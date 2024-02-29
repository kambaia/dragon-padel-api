import fs from 'fs';
import path from 'path';

const deleteFileInDataBase = (folder: string, fileName: string): Promise<boolean> => {
    const filepath: string = path.resolve(__dirname, '..', '..', 'public', 'img', folder, fileName);
    return new Promise<boolean>((resolve, reject) => {
        fs.unlink(filepath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
};

export {
    deleteFileInDataBase
};