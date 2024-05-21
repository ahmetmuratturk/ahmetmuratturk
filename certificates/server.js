const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const pdfFolder = path.join(__dirname, 'certificates');

app.use(express.static('public'));

app.get('/pdfs', (req, res) => {
    fs.readdir(pdfFolder, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to scan files' });
        }
        const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
        res.json(pdfFiles);
    });
});

app.get('/certificates/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(pdfFolder, filename);
    res.sendFile(filePath);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
