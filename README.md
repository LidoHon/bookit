# Room Booking Project

This project is a **Room Booking System** built with **Next.js** for server-side rendering and **Appwrite** as the backend for database and authentication. Users can check room availability, book rooms, and manage bookings.

## Features

- **Room Listing**: Browse and view details of available rooms.
- **Check Availability**: Verify room availability based on selected check-in and check-out dates.
- **Room Booking**: Book rooms for specific dates and times.
- **User Authentication**: Secure authentication and session management using Appwrite.
- **Responsive Design**: Optimized for both desktop and mobile users.
- **Real-Time Feedback**: Notifications for booking success and errors using React-Toastify.

## Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: Appwrite (Database, Authentication)
- **State Management**: `useFormState` for handling form submission and booking process
- **Date Manipulation**: Luxon for date and time handling
- **Notifications**: React-Toastify for user feedback
- **Styling**: Tailwind CSS for a modern, responsive UI

## Prerequisites

To run this project locally, you need:

- Node.js (v14 or higher)
- Appwrite server setup and configured
- Appwrite SDK for database and authentication

## Getting Started

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/LidoHon/bookit.git
   cd bookit
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env.local` file with your Appwrite and database configurations:
   \`\`\`
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=<your_project_id>
   NEXT_PUBLIC_APPWRITE_ENDPOINT=<your_appwrite_endpoint>
   NEXT_PUBLIC_APPWRITE_DATABASE=<your_database_id>
   NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS=<your_bookings_collection_id>
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Authentication**: Sign up or log in using Appwrite's secure authentication system.
2. **Browse Rooms**: Explore the rooms and select a room to book.
3. **Check Room Availability**: Before booking, ensure the room is available on the selected dates.
4. **Book a Room**: Submit your booking form and get real-time feedback.
5. **Manage Bookings**: After booking, you can view and manage your bookings on the booking page.

## Deployment

To deploy this project, make sure your Appwrite backend is set up correctly. You can deploy the frontend on platforms like **Vercel** or **Netlify**, which support Next.js applications.

## License

This project is licensed under the MIT License.

---

Feel free to expand and modify the project to suit your requirements!
