import { extname } from 'path';

export const formatFileName = (req, { originalname }, callback) => {
    const fileExtName = extname(originalname);

    callback(null, `${new Date().getTime()}${fileExtName}`);
};