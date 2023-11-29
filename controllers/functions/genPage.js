const renderFile = require('pug').renderFile
const fs = require('fs')
const parse = require('csv-parse').parse

const genPage = (templatePath, dataPath, destinationPath) => {
  //get csvData
  const csvData = fs.readFileSync(dataPath).toString()

  parse(csvData, { columns: true }, (e, records) => {

    const headers = Object.keys(records[0])

    const options = { 'fields': records, 'headers': headers }
    const res = renderFile(templatePath, options)

    fs.writeFileSync(destinationPath, res)
  })
}

module.exports = {
  genPage: genPage
}