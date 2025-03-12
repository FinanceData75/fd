import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/db';
import { comparePassword, generateToken } from '../../utils/auth';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT id, password FROM users WHERE email = $1', [email]);

        client.release();

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isValidPassword = await comparePassword(password, result.rows[0].password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken({ id: result.rows[0].id, email });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}