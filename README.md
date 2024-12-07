# Job Search Application

This is a **full-stack job search application** that allows users to search for job listings based on various preferences like job title, location, salary, and job type. It consists of a **React frontend** and a **Flask backend** integrated with the Adzuna Job Search API.

---

## Features

- **Frontend:** A sleek, responsive UI with glassmorphic effects built using React and Vite.
- **Backend:** A Flask API that handles job search requests and interacts with the Adzuna API.
- **Job Preferences:** Users can filter jobs by title, location, salary, job type, and remote options.
- **Real-Time Updates:** Results dynamically update based on user inputs.

---

## Technologies Used

- **Frontend:**
  - React (Vite)
  - TailwindCSS
  - Framer Motion (animations)
  - Lucide Icons
- **Backend:**
  - Flask
  - Flask-CORS
  - Adzuna API

---

## How to Run the Application

### Prerequisites

- **Frontend:**
  - Node.js and npm installed on your system.
- **Backend:**
  - Python 3.9 or later.
  - pip for managing Python packages.

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/job-search-app.git
   cd job-search-app/backend
   ```
2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```
3. Create a `.env` file in the `backend` directory:

   ```env
   ADZUNA_APP_ID=your-adzuna-app-id
   ADZUNA_API_KEY=your-adzuna-api-key
   ```
4. Start the Flask server:

   ```bash
   python app.py
   ```

   - The backend will run on `http://localhost:5000`.

---

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd ../frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm run dev
   ```

   - The frontend will run on `http://localhost:5173`.

## Future Improvements

- Add user authentication for personalized job searches.
- Implement pagination for job results.
- Provide job bookmarking and sharing features.

Enjoy your job search journey! 🚀
