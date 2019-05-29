const ws = require('ws').Server
const wss = new ws({port:3000,path:'/rabbitws'})
const consumer = require('./consumer')
const producer = require('./producer')

wss.on('connection', ws =>
{
    console.log('conectou')
    ws.on('message', id =>
    {
        console.log('mandou o id ' + id)
        consumer([id],ws,producer)
    })
})







