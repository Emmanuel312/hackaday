const exchange = 'direct_logs'
const lineReader = require('line-reader')
const amqp = require('amqplib/callback_api')
const handleData = require('./handleData')

module.exports = () =>
{
    amqp.connect('amqp://localhost', (error0, connection) =>
    {
        if (error0) throw error0

        connection.createChannel((error1, channel) =>
        {
            if (error1) throw error1;

            channel.assertExchange(exchange, 'direct', { durable: false })

            lineReader.eachLine('dados.csv', linha =>
            {
                const data = handleData(linha)
                const rounting_key = data.split(',')[0]
                channel.publish(exchange, rounting_key, Buffer.from(data))
                //console.log(" [x] Sent %s: '%s'", rounting_key, linha)
                if(!linha) return false
            })
        
        })
        
        setTimeout(() =>
        {
            connection.close()
            process.exit(0)
        }, 3000)
        
    })
}
