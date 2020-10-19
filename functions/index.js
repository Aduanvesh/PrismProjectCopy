const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_51HXhlkFstnSXI8cOfpGmHawCQZfdfzGCVjKMIxkTIibREqV1IXxRdqZpAs7AkeGdNH4kI3VQjPnuYS2INHkDH0s300e9dLUpd5')
const cors = require('cors')({origin: true})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello from Firebase!" + request.query.name);
 });

 exports.CheckoutSession = functions.https.onRequest(async (request, response) => {

    cors(request, response, async () => {
        const session = await stripe.checkout.sessions.create({
            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
            payment_method_types: ['card'],
            line_items: [
              {amount: 1500, quantity: 2, currency: 'AUD', name: 'ticket'},
            ],
            mode: 'payment',
          });
          response.send(session)
    })


    
 })