const express = require('express');
const bodyParser = require('body-parser');
const XLSX = require('xlsx');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/rsvp', (req, res) => {
    const { name, attendance } = req.body;

    if (!name || !attendance) {
        return res.status(400).send('Имя и статус обязательны.');
    }

    const filePath = 'rsvp.xlsx';
    let workbook;
    let worksheet;

    if (fs.existsSync(filePath)) {
        workbook = XLSX.readFile(filePath);
        worksheet = workbook.Sheets[workbook.SheetNames[0]];
    } else {
        workbook = XLSX.utils.book_new();
        worksheet = XLSX.utils.aoa_to_sheet([['Имя', 'Придет']]);
    }

    XLSX.utils.sheet_add_aoa(worksheet, [[name, attendance]], { origin: -1 });

    XLSX.utils.book_append_sheet(workbook, worksheet, 'RSVP');
    XLSX.writeFile(workbook, filePath);

    res.send('Ответ сохранен.');//sdsdsd
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
