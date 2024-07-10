import multer from 'multer';
import path from 'path';
import fs from 'fs';



// Create uploads directory if it doesn't exist
const uploadDir = path.join(process.cwd(), 'public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }),
});


// apiRoute.post((req, res) => {
//     const files = req.files.map(file => ({
//         path: `/uploads/${file.filename}`,
//         originalname: file.originalname,
//     }));

//     res.status(200).json({ data: req.body, files });
// });


const handler = async (req, res) => {
    upload.array('images')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const files = req.files.map(file => ({
            path: `/uploads/${file.filename}`,
            originalname: file.originalname,
        }));

        res.status(200).json({ files });
    }
    );
}

export  {handler as POST}