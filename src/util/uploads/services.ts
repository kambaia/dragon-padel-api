import path from 'path';
import { diskStorage, FileFilterCallback } from 'multer';
import { randomBytes } from 'crypto';
export const configureStorage = (customPath: string) => {
  console.log(customPath);
  return {
    dest: path.resolve(__dirname, customPath),
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, customPath));
      },
      filename: (req, file, cb) => {
        randomBytes(16, (err, hash) => {
          const fileName = `${hash.toString('hex')}-${file.originalname}`;
          cb(null, fileName);
        });
      },
    }),
    limits: {
      fieldSize: 2 * 1024 * 1024,
    },
    fileFilter: (req: any, file: any, cb: any) => {
      const formato = [
        'image/jpeg',
        'image/jpg',
        'image/pjpeg',
        'image/png',
        'image/gif',
        'image/svg',
      ];
      if (formato.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Erro no fromato da imagem'));
      }
    },
  };
};
    