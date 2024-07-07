import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads', // Change this to a persistent storage location if needed
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        },
    }),
    limits: { fileSize: 1000000 }, // 1MB limit (adjust as needed)
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await upload.single('avatar')(req, res, (err) => {
                if (err) {
                    return res.status(400).json({ message: 'File upload failed', error: err.message });
                }

                const filePath = path.join('/public/uploads/', req.file.filename); // Adjust path if needed

                res.status(200).json({ message: 'File uploaded successfully', filePath });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(); // Use .end() for a cleaner response
    }
}
