// payment.js
const amqp = require('amqplib');

async function paymentService() {
  const conn = await amqp.connect('amqp://localhost');
  const ch = await conn.createChannel();
  const exchange = 'order_exchange';

  await ch.assertExchange(exchange, 'fanout', { durable: false });
  const q = await ch.assertQueue('', { exclusive: true });
  ch.bindQueue(q.queue, exchange, '');

  console.log("⏳ Waiting for orders...",);
  ch.consume(q.queue, msg => {
    const order = JSON.parse(msg.content.toString());
    console.log("💳 Processing payment for:", order);

    // Simulate success/fail
    const success = Math.random() > 0.5;
    const result = {
      orderId: order.orderId,
      status: success ? 'Payment Success' : 'Payment Fail'
    };

    // Publish result
    ch.publish('payment_exchange', '', Buffer.from(JSON.stringify(result)));
    console.log("📤 Payment Result:", result);
  }, { noAck: true });
}

paymentService();
