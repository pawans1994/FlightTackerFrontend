# FlightTackerFrontend

This is the frontend application for tracking flight prices. Users can input their travel details, set a threshold price, and receive email notifications when flight prices fall below the set threshold.

## Features

- **Flight Search**: Input source, destination, travel dates, and trip type (one-way or round-trip) to search for flight prices.
- **Price Alerts**: Set a price threshold and receive email notifications if the flight price drops below the threshold.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Axios**: A promise-based HTTP client for making API requests.
- **Cloudscape Design System**: Components for building responsive and accessible web applications, used for forms and tables.
- **Bootstrap**: A CSS framework for responsive design.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or above)
- npm (v6 or above) or yarn (v1.22 or above)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/pawans1994/FlightTackerFrontend.git
   cd FlightTackerFrontend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**

   ```sh
   npm start
   # or
   yarn start
   ```

   The application will run on `http://localhost:3000`.

### Configuration

Configure the backend URL in `constants.ts`. Currently it's configured to backend running on localhost.

```env
BACKEND_URL=http://your-backend-api-url.com
```

Replace `http://your-backend-api-url.com` with the URL of your backend API.

## Usage

1. **Search Flights:**
   - Enter source and destination airports.
   - Select travel dates.
   - Choose trip type (one-way or round-trip).
   - Click "Search" to fetch flight prices.

2. **Set Price Threshold:**
   - After searching, input your desired price threshold.
   - Enter your email address.
   - Click "Set Alert" to track prices and receive notifications.

3. **Receive Notifications:**
   - You'll get an email if the flight price goes below your set threshold.

## Contributing

We welcome contributions to improve the project. To contribute, follow these steps:

1. **Fork the repository.**
2. **Create a new branch:**

   ```sh
   git checkout -b feature-branch
   ```

3. **Make your changes.**
4. **Commit your changes:**

   ```sh
   git commit -m 'Add feature'
   ```

5. **Push to the branch:**

   ```sh
   git push origin feature-branch
   ```

6. **Open a pull request.**


## Contact

For questions or support, contact:

- **Pawandeep Singh Mendiratta**
- **Email**: pawan.p.121@gmail.com
