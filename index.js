import express from 'express';
import handlebars from 'handlebars';
import fs from 'fs';
import htmlToPdf from 'html-pdf-node';
import { randomUUID } from 'crypto';


const PORT = 3001;
const app = express();

app.use(express.json());


app.get('/:templateId', (req, res) => {
    const { templateId } = req.params;

    if (!fs.existsSync(`./templates/${templateId}.hbs`))
        return res.status(404).send('Template not found');

    const file = fs.readFileSync(`./templates/${templateId}.hbs`, 'utf8');

    return res.send(file);
})
app.post('/generate', async (req, res) => {
    const reports = req.body;
    let report = '';

    await Promise.all(reports.map((t) => {
        const template = handlebars.compile(t.template)
      report += template(t.properties)
    }))

    const options = { format: 'A4' };
    const pdf = await htmlToPdf.generatePdf({ content: report }, options);
    const reportStorageIndex = `./storage/${randomUUID()}-report.pdf`;

    // create file in storage
    fs.writeSync(1, reportStorageIndex);
    // write content to file
    fs.writeFileSync(reportStorageIndex, pdf);

    res.send(reportStorageIndex);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));