
# Technician Hiring Platform (Hirely) 

## Project Overview
Technician Hiring Platform (THP) is a web-based application that connects job owners with skilled artisans and technicians. The platform allows job owners to post service requests, artisans to browse and bid for jobs, and both parties to communicate and manage the progress of their engagements. The frontend is built with Angular, and the backend uses Laravel.

## Features

### Authentication & User Roles
- User registration and login using JWT-based authentication.
- Three user roles: Admin, Job Owners, and Artisans/Technicians.
- Password reset via email.

### Job Management
- Job Owners can create, edit, and delete job posts.
- Define job details including title, description, budget, location, and deadlines.
- Attach images or documents to job listings.
- Review bids and select artisans.
- Approve or reject submitted work.

### Job Search & Bidding
- Artisans can browse and filter available jobs by category, location, or budget.
- Submit bids with price and estimated duration.
- Communicate with job owners via integrated messaging.
- Update job status (pending, in progress, completed).

### Admin Dashboard
- Manage users and job posts.
- Approve or reject artisan registrations.
- Generate reports and monitor platform activity.
- Remove inappropriate content or users.

## Technologies Used

### Frontend
- Angular 19
- TypeScript
- Bootstrap 
- Angular Router
- Angular Forms

### Backend
- Laravel 12
- PHP 8
- MySQL / MariaDB
- Laravel Sanctum 
- RESTful API (Jwt)

---

## Getting Started

### Clone the Repositories

- Frontend Repo: `Technician-Hiring-Platform`
- Backend Repo: `THP-Backend`

### Setup Instructions

#### Frontend Setup

1. Clone the frontend repo:
   ```bash
   git clone <https://github.com/suhadshaheen/Technician-Hiring-Platform.git>
   cd Technician-Hiring-Platform
   ```

2. Run the following commands:
   ```bash
   git fetch
   git checkout setup-angular
   git pull origin setup-angular
   npm install
   ng serve
   ```

3. Open your browser and navigate to: `http://localhost:4200`

#### Backend Setup

1. Clone the backend repo:
   ```bash
   git clone <https://github.com/suhadshaheen/THP-Backend.git>
   cd THP-Backend
   ```

2. Run the following commands:
   ```bash
   git fetch
   git pull origin main
   composer install
   php artisan migrate
   php artisan storage:link
   php artisan serve
   ```

3. Open your browser and navigate to: `http://127.0.0.1:8000`

---
