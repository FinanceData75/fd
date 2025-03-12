# Stock Intrinsic Value Calculator

This web application calculates the intrinsic value of a stock based on Warren Buffett’s value investing principles, emphasizing a margin of safety.

## Features
- Discounted Cash Flow (DCF) calculation
- Multiples Approach calculation
- Margin of safety
- User authentication
- Usage limits and subscription
- Save calculation results

## Setup Instructions

### Prerequisites
- Node.js
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/stock-intrinsic-value-calculator.git
   cd stock-intrinsic-value-calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   NEXT_PUBLIC_API_URL=your_api_url
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

### Running the App
```bash
npm run dev
```

The app should now be running on [http://localhost:3000](http://localhost:3000).

### Deployment
1. Choose a hosting platform (e.g., Vercel, Heroku, AWS).
2. Follow the platform-specific instructions to deploy the app.

## Dependencies
- React.js
- Next.js
- Node.js
- Express
- PostgreSQL or Firebase
- Stripe or PayPal

## License
This project is licensed under the MIT License.