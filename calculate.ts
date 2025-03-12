import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/db';
import { verifyToken } from '../../utils/auth';
import { calculateDCF, calculateMultiples } from '../../utils/calculations';

export default async function calculate(req: NextApiRequest, res: NextApiResponse) {
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

    const { method, inputs } = req.body;

    let result;
    if (method === 'DCF') {
        result = calculateDCF(
            parseFloat(inputs.freeCashFlow),
            parseFloat(inputs.growthRate) / 100,
            parseFloat(inputs.discountRate) / 100,
            parseFloat(inputs.terminalMultiple),
            parseInt(inputs.years),
            parseFloat(inputs.marginOfSafety)
        );
    } else {
        result = calculateMultiples(
            parseFloat(inputs.earnings),
            parseFloat(inputs.terminalMultiple),
            parseFloat(inputs.marginOfSafety)
        );
    }

    try {
        const client = await pool.connect();
        await client.query(
            'INSERT INTO calculations (user_id, method, inputs, result) VALUES ($1, $2, $3, $4)',
            [user.id, method, inputs, result]
        );
        client.release();

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}