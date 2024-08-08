# Eventshuffle Backend

## Requirements

- Node.js
- MongoDB
- OpenSSL

## Setup

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd eventshuffle-backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set Up MongoDB:

   ```sh
   brew services start mongodb-community@7.0
   ```

4. Create a .env file in the root directory with the following content:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/eventshuffle
   ```

5. Generate SSL Certificates:

   ```sh
   openssl genrsa -out key.pem 2048
   openssl req -new -key key.pem -out cert.csr
   openssl x509 -req -days 365 -in cert.csr -signkey key.pem -out cert.pem
   ```

6. Start the development server:

   ```sh
   npm run dev
   ```
