const amqp = require('amqplib/callback_api')
const exchange = 'direct_logs'

module.exports = (ids,ws,cb) =>
{
    amqp.connect('amqp://localhost', (error0, connection) =>
    {
        if (error0) throw error0

        connection.createChannel((error1, channel) =>
        {
            if (error1) throw error1

            channel.assertExchange(exchange, 'direct', {durable: false})
            
            ids.forEach(id => 
            {
                channel.assertQueue(id,{exclusive: false},(error2, q) => 
                {
                    
                    if (error2) throw error2;

                    console.log(' [*] Waiting for logs. To exit press CTRL+C')
                    channel.prefetch(1)
                    channel.bindQueue(q.queue, exchange, id)
                    
                    
                    channel.consume(q.queue, (msg) => 
                    {   
                        
                        
                        setTimeout(() =>
                        {
                            //console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString())
                            ws.send(msg.content.toString())
                            channel.ack(msg) 
                        },1000)
                        
                        
                        
                        //console.log(channel)
                        //console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString())
                    })
                })
            })
            
        })
        cb()
    })
    
}



