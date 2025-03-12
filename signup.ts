import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/db';
import { hashPassword, generateToken } from '../../utils/auth';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const client = await pool.connect();
        const hashedPassword = await hashPassword(password);

        const result = await client.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id', [email, hashedPassword]);

        client.release();

        const token = generateToken({ id: result.rows[0].id, email });

        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}