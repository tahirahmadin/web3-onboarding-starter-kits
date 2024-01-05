## Overview
Simple1inchProxy is a Node.js server designed to forward requests to the 1inch API, adding an authorization header. It's useful for integrating 1inch API calls into applications that require server-side request management.

## Installation

This project requires Node version 20 or higher due to the use of `fetch`

Once the correct version of Node is set for the environment, simply run:
   ```
   npm install
   ```

## Configuration
1. Create a `.env` file in the root directory.
2. Add your authorization token:
   ```
   AUTHORIZATION=Bearer replace_with_dev_portal_api_token
   ```

## Running the Server
Execute the command `node index.js`. The server will start on `http://localhost:3000`.

## Usage
To make a request, use the following structure:
```
http://localhost:3000/?url=https://api.1inch.dev/fusion/orders/v1.0/1/order/active
```
Replace the URL parameter with your desired 1inch API endpoint.
