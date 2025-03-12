import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/db';
import { verifyToken } from '../../utils/auth';

export default async function usage(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
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

    try {
        const client = await pool.connect();
        const result = await client.query(
            'SELECT COUNT(*) FROM calculations WHERE user_id = $1 AND created_at >= NOW() - INTERVAL \'1 week\'',
            [user.id]
        );
        client.release();

        const count = parseInt(result.rows[0].count, 10);
        res.status(200).json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}