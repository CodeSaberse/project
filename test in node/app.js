const { readFile } = require('fs');
const fs=require('fs/promises');
const express = require('express');
var app = express();
app.use(express.json())
const port = 3333;

app.use(express.static('static'))

async function loadFromJson(){
    const data =await fs.readFile('data.json');
    let companies = JSON.parse(data);
    return companies;   
}
 app.get ('/company', async(req, res)=> {
    const data=await loadFromJson();
    res.send(data);
})
app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`)
})
