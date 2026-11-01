# React Project Management App

A simple project management application built with React. It allows users to manage users, teams, projects, and tasks, with relationships between these entities.

## Live Demo

[Open Live Demo](<https://app-team-flow.netlify.app/>)

## Features

- Manage Users, Teams, Projects, and Tasks.
- Connect users to teams, teams to projects, and tasks to projects and assignees.
- Reusable Form Builder that generates forms from an array of field configurations.
- Form validation using Zod when needed.
- Mock API integration using MSW.

## Technologies

- React
- React Router
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Axios
- Tailwind CSS
- MSW (for faking the api calls to get fake data)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Salem-Tarek/team-flow.git
   ```

2. Navigate to the project directory:

   ```bash
   cd team-flow
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Login

For testing purposes:

- **Email:** salem@teamflow.com (Use any existing user email from the application with the same password below.)
- **Password:** `admin@123`