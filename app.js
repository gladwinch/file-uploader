const express = require('express')
const fileupload = require('express-fileupload')
const app = express()

app.use(express.json())
app.use(fileupload())

app.post('/excel-upload', (req,res) => {
    if (req.files == undefined) {
        return res.status(400).send("Please upload an excel file!");
    }

    const file = req.files.file

    file.mv(`./public/${file.name}`, async err => {
        if(err) {
            console.log(err)
            return res.status(500).json({ success: false })
        }

        res.status(200).json({
            success: true,
            data: file.name
        })
    })
})

app.listen(5000, () => {
    console.log("Server is started on PORT 5000")
})