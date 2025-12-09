# Simple Email Campaign Manager

A minimal email campaign manager built with Laravel, React, InertiaJS, and shadcn/ui.

## 🎥 Demo

- **Live Demo**: [https://simple-campaign-manager.rakibmiah99.website](https://simple-campaign-manager.rakibmiah99.website)
- **Video Preview**: [Watch Demo Video](https://simple-campaign-manager.rakibmiah99.website/scm.mp4)

## Features

- 📧 **Contact Management**: Add, view, and manage email contacts
- 📨 **Campaign Creation**: Create email campaigns with custom subject and body
- 👥 **Recipient Selection**: Select single, multiple, or all contacts for campaigns
- 🚀 **Queued Email Sending**: Asynchronous email delivery using Laravel queues
- 📊 **Status Tracking**: Track email delivery status (pending, sent, failed)
- 📈 **Campaign Analytics**: View campaign statistics and success rates
- 🎨 **Modern UI**: Beautiful interface built with shadcn/ui components

## Tech Stack

### Backend
- **Laravel 12**: PHP framework
- **SQLite**: Database
- **Laravel Queue**: For background job processing

### Frontend
- **React 18**: UI library
- **TypeScript**: Type safety
- **InertiaJS**: Server-side routing with client-side rendering
- **shadcn/ui**: Beautiful, accessible UI components
- **Tailwind CSS**: Utility-first CSS framework

## Architecture

### Backend Structure

```
app/
├── Actions/
│   └── CreateCampaignAction.php       # Action class for campaign creation
├── DataObjects/
│   └── CampaignData.php               # Data transfer object for campaigns
├── Services/
│   └── CampaignService.php            # Service class for campaign logic
├── Jobs/
│   └── SendCampaignEmailJob.php       # Queue job for sending emails
├── Models/
│   ├── Contact.php                     # Contact model
│   ├── Campaign.php                    # Campaign model
│   └── CampaignRecipient.php          # Campaign recipient model
└── Http/Controllers/
    ├── ContactController.php           # Contact CRUD operations
    └── CampaignController.php          # Campaign CRUD operations
```

### Frontend Structure

```
resources/js/
├── components/
│   ├── ui/                            # shadcn/ui components
│   └── ...                            # Custom components
├── pages/
│   ├── dashboard.tsx                  # Dashboard page
│   ├── contacts/
│   │   └── index.tsx                  # Contacts listing page
│   └── campaigns/
│       ├── index.tsx                  # Campaigns listing page
│       ├── create.tsx                 # Create campaign page
│       └── show.tsx                   # Campaign details page
└── types/
    └── index.d.ts                     # TypeScript type definitions
```

## Installation & Setup

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js 18 or higher
- npm/pnpm

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/simple-campaign-manager.git
   cd simple-campaign-manager
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Database setup**
   ```bash
   # The project uses SQLite by default
   touch database/database.sqlite
   
   # Run migrations and seed data
   php artisan migrate:fresh --seed
   ```
   
   This will create:
   - 15 sample contacts

6. **Build assets**
   ```bash
   npm run build
   # or for development
   npm run dev
   ```

7. **Start the queue worker** (in a separate terminal)
   ```bash
   php artisan queue:work
   ```

8. **Start the development server**
   ```bash
   php artisan serve
   ```

9. **Access the application**
   - Open your browser and visit: `http://localhost:8000`

## Usage

### 1. Manage Contacts
- Navigate to **Contacts** from the sidebar
- Click **Add Contact** to create new contacts
- Select contacts using checkboxes
- Delete contacts as needed

### 2. Create a Campaign
- Navigate to **Campaigns** → **Create Campaign**
- Enter your email subject and message
- Select recipients from your contact list
- Click **Create Campaign**

### 3. Send Campaign
- Navigate to campaign details page
- Review campaign information and recipients
- Click **Send Campaign** button
- Monitor delivery status in real-time

### 4. Track Results
- View campaign statistics (sent, failed, success rate)
- Monitor individual recipient delivery status
- Review error messages for failed deliveries

## Architecture Decisions

### 1. **Service Layer Pattern**
- `CampaignService`: Encapsulates business logic for campaign operations
- Separates concerns from controllers
- Makes code more testable and maintainable

### 2. **Action Classes**
- `CreateCampaignAction`: Single-responsibility class for campaign creation
- Promotes code reusability
- Makes complex operations more readable

### 3. **Data Transfer Objects (DTOs)**
- `CampaignData`: Type-safe data containers
- Validates and transforms request data
- Provides clear contracts between layers

### 4. **Queue Jobs**
- `SendCampaignEmailJob`: Asynchronous email sending
- Prevents request timeouts
- Enables scalability and retry mechanisms
- Simulates email delivery with random success/failure (90% success rate)

### 5. **Eloquent Relationships**
- Clean, expressive relationship definitions
- Eager loading to prevent N+1 queries
- Pivot table for many-to-many relationships

### 6. **InertiaJS Integration**
- Server-side routing with SPA-like experience
- No API layer needed
- Type-safe props with TypeScript

### 7. **Component Organization**
- Reusable shadcn/ui components
- Consistent design system
- Accessible by default

## Key Features Implementation

### Email Sending Simulation
The `SendCampaignEmailJob` simulates email delivery:
- Random delay (1-3 seconds) per email
- 90% success rate
- Automatic status tracking
- Error message logging for failures

### Status Tracking
Three-tier status system:
1. **Campaign Status**: draft, sending, sent, failed
2. **Recipient Status**: pending, sent, failed
3. **Automatic Updates**: Jobs update statuses in real-time

### Validation & Error Handling
- Server-side validation in controllers
- Client-side form validation
- User-friendly error messages
- Transaction safety for data integrity

## Testing

Run the test suite:
```bash
php artisan test
```

## License

This project is open-sourced software licensed under the MIT license.

