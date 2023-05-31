import amqp from 'amqplib';
import { EtherealMail } from './mail/index.js';

const QUEUE_NAME = 'SUPIMPA';

async function connectQueue() {
    try {
        const connection = await amqp.connect("amqp://rabbitmq");
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE_NAME);
        
        channel.consume(QUEUE_NAME, data => {
            const formattedData =  JSON.parse(Buffer.from(data.content));
            EtherealMail.sendMail({
                to: {
                    email: formattedData.email,
                    name: formattedData.name
                },
                subject: 'Epic Games - Novo Chat iniciado',
                templateData: formattedData
            })
            channel.ack(data);
        });
    } catch (error) {
        console.log(error);
    }
}

export default connectQueue;