# Picky: File Structure and Dependencies

## Project Structure

/
├── client/ # Frontend React application
│ ├── public/
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── app/ # Next.js pages
│ │ ├── styles/ # CSS and Tailwind styles
│ │ ├── utils/ # Utility functions
│ │ └── api/ # API calls to backend
│ ├── package.json
│ └── next.config.js
├── server/ # Backend Node.js application
│ ├── src/
│ │ ├── controllers/ # Request handlers
│ │ ├── models/ # Data models
│ │ ├── routes/ # API routes
│ │ ├── services/ # Business logic
│ │ ├── utils/ # Utility functions
│ │ └── app.js # Express app setup
│ ├── package.json
│ └── .env
├── docs/ # Project documentation
└── README.md