import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function stock(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end(); // Method Not Allowed
    }

    const { symbol } = req.query;

    if (!symbol) {
        return res.status(400).json({ message: 'Stock symbol is required' });
    }

    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: 'TIME_SERIES_DAILY',
                symbol,
                apikey: process.env.ALPHA_VANTAGE_API_KEY,
            },
        });

        const data = response.data['Time Series (Daily)'];
        const latestDate = Object.keys(data)[0];
        const latestData = data[latestDate];

        res.status(200).json({
            symbol,
            date: latestDate,
            close: latestData['4. close'],
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}