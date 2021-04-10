const express = require('express')
const app = express()
const fs = require('fs')
const cors = require("cors")
const set = JSON.parse(fs.readFileSync('config.json').toString())

console.log('Настройки конфига:'); console.log(set)
var list = [], competence = []

var corsOptions = {origin: '*'}

if (set.CORS) app.use(cors(corsOptions));

var data1 = fs.readFileSync('list.txt', 'utf-8').toString().split('\n')
var data2 = fs.readFileSync('competence.txt', 'utf-8').toString().split('\n')

for (i in data2) {
  let buffer = data2[i].split(', ')

  competence.push({
    Name: buffer[0],
    ID: buffer[1]
  })
}

for (i in data1) {
  let buffer = data1[i].split(', ')
  
  list.push ({
    FName: buffer[0],
    LName: buffer[1],
    ID: buffer[2],
    CompID: buffer[3],
    Result: buffer[4]
  })
}

console.log(list)
console.log(competence)
  
app.get('/studentList', (req, res) => {
    res.json(list)
})

app.get('/competence', (req, res) => {
  res.json(competence)
})

const PORT = set.PORT
const IP = set.IP

app.listen(PORT,IP, () => {
  console.log(`Список компетенций: http://${IP}:${PORT}/competence`)
  console.log(`Список участников: http://${IP}:${PORT}/studentList`)
})