import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/db';
import { verifyToken } from '../../utils/auth';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' });

export default async function subscribe(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = verifyToken(token);
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { paymentMethodId } = req.body;

    if (!paymentMethodId) {
        return res.status(400).json({ message: 'Payment method is required' });
    }

    try {
        const customer = await stripe.customers.create({
            email: user.email,
            payment_method: paymentMethodId,
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: 'price_12345' }], // Replace with your Stripe price ID
            expand: ['latest_invoice.payment_intent'],
        });

        const client = await pool.connect();
        await client.query(
            'UPDATE users SET stripe_customer_id = $1, subscription_status = $2 WHERE id = $3',
            [customer.id, 'active', user.id]
        );
        client.release();

        res.status(200).json({ subscription });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}