# assignment_4
This project is a full-stack web application that consists of two main parts: a frontend built with Next.js and a backend built with Express.js.

## Backend (Express.js)

The backend is a simple server built with Express.js that handles data storage and provides API endpoints for the frontend to interact with.
### Key Components:

1. __Express.js__: A web application framework for Node.js that simplifies the process of building web servers.

2. __Middleware__:

   - __CORS (Cross-Origin Resource Sharing)__: Allows the frontend to make requests to the backend even if they're hosted on different domains.
   - __body-parser__: Parses incoming request bodies (like JSON data from forms) so the server can understand them.

3. __Data Storage__:

   - The server uses an in-memory array (`submissions`) to store form data.
   - In a real production application, this would typically be replaced with a database like MongoDB or PostgreSQL.

4. __API Endpoints__:

   - __POST /api/submit__: Accepts form submissions and validates that all required fields are present.
   - __GET /api/data__: Returns all stored submissions.
   - __DELETE /api/data/:id__: Deletes a specific submission by ID.
   - __PUT /api/data/:id__: Updates a specific submission by ID.

### How It Works:

1. The server starts and listens on port 5000.
2. When a form is submitted from the frontend, the data is sent to the `/api/submit` endpoint.
3. The server validates the data and stores it in the submissions array.
4. The frontend can then retrieve, update, or delete this data using the other API endpoints.

## Frontend (Next.js)

The frontend is built with Next.js, a React framework that provides features like server-side rendering and routing.

### Key Technologies:

- __Next.js__: A React framework that provides features like routing, server-side rendering, and API routes.

- __React__: A JavaScript library for building user interfaces.

- __TypeScript__: A typed superset of JavaScript that helps catch errors during development.

- __TailwindCSS__: A utility-first CSS framework that makes styling easier and more consistent.

### Pages and Components:

1. __Form Page__ (`/form`):

   - Contains a form with fields for name, email, age, gender, and message.
   - Uses React's `useState` hook to manage form data.
   - Validates that all fields are filled before submission.
   - Sends the form data to the backend API when submitted.
   - Redirects to the success page on successful submission.

2. __Data Display Page__ (`/data`):

   - Fetches and displays all form submissions from the backend.
   - Allows users to edit or delete entries.
   - Uses React's `useEffect` hook to fetch data when the page loads.
   - Provides a table view of all submissions with edit and delete buttons.

3. __Success Page__ (`/success`):

   - Displays a confirmation message after a successful form submission.
   - Shows the submitted data for verification.
   - Uses URL query parameters to display the submitted information.

4. __Layout Component__:

   - Provides a consistent layout across all pages.
   - Includes a navigation bar with links to the form and data pages.
   - Wraps all pages with common styling and structure.
