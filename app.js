const express = require('express')
const path = require('path')
const fs = require('fs')
const os = require('os')
const Busboy = require('busboy')
const app = express()

app.use(express.json())

app.post('/excel-upload', (req,res) => {
    const busboy = new Busboy({ headers: req.headers })

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        const saveTo = path.join('./public', filename)

        file.pipe(fs.createWriteStream(saveTo))
    })

    busboy.on('finish', function() {
        res.status(200).json({ success: true })
    })

    return req.pipe(busboy)  
})

app.listen(5000, () => {
    console.log("Server is started on PORT 5000")
})