const fs = require('fs');
const pdf = require('pdf-parse');
let dataBuffer = fs.readFileSync('main (1) (1).pdf');
pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('parsed_pdf.txt', data.text);
}).catch(function(error){
    console.error("PDF Parsing error:", error);
});
