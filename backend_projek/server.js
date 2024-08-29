const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors'); // Tambahkan CORS
const path = require('path');
const { Op } = require('sequelize');
const Contact = require('./models/Contact'); // Import model Sequelize

const app = express();
app.use(cors()); // Menggunakan CORS

const upload = multer({ dest: 'uploads/' });

// Middleware untuk parsing JSON
app.use(express.json());

// Handle file upload and CSV parsing
app.post('/upload', upload.single('file'), (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            fs.unlinkSync(req.file.path); // Clean up the uploaded file
            res.json(results);
        });
});

// Handle data import
app.post('/import', async (req, res) => {
    try {
        const rows = req.body;
        for (let row of rows) {
            await Contact.create({
                nama: row.nama,
                email: row.email,
                telepon: row.telepon,
                alamat: row.alamat,
            });
        }
        res.status(200).send('Data imported successfully');
    } catch (error) {
        console.error('Error importing data:', error);
        res.status(500).send('Error importing data');
    }
});

// Export data to Excel
app.get('/export', async (req, res) => {
    const { Workbook } = require('exceljs');
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Contacts');

    try {
        const contacts = await Contact.findAll();
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Nama', key: 'nama', width: 30 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Telepon', key: 'telepon', width: 20 },
            { header: 'Alamat', key: 'alamat', width: 40 },
        ];

        contacts.forEach((contact) => {
            worksheet.addRow(contact.get({ plain: true }));
        });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=contacts.xlsx'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error exporting data:', error);
        res.status(500).send('Error exporting data');
    }
});


// Endpoint untuk mendapatkan semua data kontak
app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).send('Error fetching contacts');
    }
});

// Serve the React front-end
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
