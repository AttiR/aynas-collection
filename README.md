# Aynas Collection - Premium E-commerce Platform

A modern, luxury e-commerce platform built with React, TypeScript, and ASP.NET Core, featuring professional authentication, email verification, and Stripe payment integration.

## 🚀 Features

- **Professional Authentication**: Email verification, password reset, account lockout protection
- **Luxury UI Design**: Premium white/gold theme with modern typography
- **Secure Payment Processing**: Stripe integration with proper error handling
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Product Management**: Categories, filtering, search, and pagination
- **Shopping Cart**: Persistent cart with checkout flow
- **Order Management**: Complete order tracking and history

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Hook Form** with Yup validation
- **Heroicons** for icons
- **Context API** for state management

### Backend
- **ASP.NET Core 8** Web API
- **Entity Framework Core** with SQLite
- **JWT Authentication** with refresh tokens
- **BCrypt** for password hashing
- **Stripe.net** for payment processing
- **SMTP** for email notifications

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **.NET 8 SDK**
- **Git**

## 🔧 Environment Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd AynasCollection
```

### 2. Quick Environment Setup (Recommended)

Run the interactive setup script:
```bash
./setup-env.sh
```

This script will guide you through setting up:
- Email configuration (Gmail)
- JWT secret key
- Stripe API keys
- Application base URL

### 3. Manual Environment Setup

If you prefer to set up manually, create a `.env` file in the `backend/AynasCollection.API/` directory:

```bash
# Copy the example file
cp backend/AynasCollection.API/env.example backend/AynasCollection.API/.env
```

Edit the `.env` file with your actual values:

```env
# Database Configuration
ConnectionStrings__DefaultConnection=Data Source=AynasCollection.db

# JWT Configuration
JwtSettings__SecretKey=your-super-secret-jwt-key-with-at-least-32-characters-for-development
JwtSettings__ExpirationHours=24

# Stripe Configuration
StripeSettings__SecretKey=sk_test_your_stripe_secret_key_here
StripeSettings__PublishableKey=pk_test_your_stripe_publishable_key_here

# Email Configuration
EmailSettings__SmtpServer=smtp.gmail.com
EmailSettings__SmtpPort=587
EmailSettings__SmtpUsername=your-email@gmail.com
EmailSettings__SmtpPassword=your-app-password
EmailSettings__FromEmail=noreply@aynascollection.com
EmailSettings__FromName=Aynas Collection
EmailSettings__BaseUrl=http://localhost:3000
```

### 4. Email Setup (Gmail Example)

For Gmail, you'll need to:

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `EmailSettings__SmtpPassword`

### 5. Stripe Setup

1. **Create a Stripe account** at [stripe.com](https://stripe.com)
2. **Get your API keys** from the Stripe Dashboard
3. **Update the environment variables** with your test keys

## 🚀 Quick Start

### Option 1: Use the Quick Start Script

```bash
# Make the script executable
chmod +x start-dev.sh

# Start both frontend and backend
./start-dev.sh
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend/AynasCollection.API
dotnet restore
dotnet run
```

The backend will be available at `http://localhost:5136`

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The frontend will be available at `http://localhost:3000`

## 🔐 Authentication Features

### Registration Flow
1. User fills registration form
2. System validates and creates account
3. Verification email sent automatically
4. User clicks email link to verify
5. Account activated and welcome email sent
6. User can now log in

### Login Features
- Email verification required before login
- Account lockout after 5 failed attempts (15 minutes)
- Secure password validation
- JWT + refresh token system

### Password Reset
- Secure token-based password reset
- 1-hour token expiration
- Professional email templates

## 🛒 Shopping Features

### Product Browsing
- Featured products on homepage
- Category-based filtering
- Search functionality
- Pagination support
- Product details with images

### Shopping Cart
- Add/remove items
- Quantity adjustment
- Persistent cart (local storage)
- Real-time total calculation

### Checkout Process
- Multi-step checkout form
- Shipping information collection
- Stripe payment integration
- Order confirmation emails

## 📧 Email Templates

The system includes professional HTML email templates for:
- **Email Verification**: Welcome email with verification link
- **Password Reset**: Secure password reset instructions
- **Welcome Email**: Post-verification welcome message
- **Order Confirmation**: Order details and tracking info

## 🔒 Security Features

- **BCrypt password hashing**
- **JWT token authentication**
- **Email verification required**
- **Account lockout protection**
- **Secure password requirements**
- **CORS configuration**
- **Input validation**
- **Environment variable protection**

## 🎨 Design System

### Color Palette
- **Primary**: Gold gradient (`#f59e0b` to `#d97706`)
- **Background**: Cream (`#fef7ed`)
- **Text**: Luxury dark (`#1f2937`)
- **Accents**: White and subtle shadows

### Typography
- **Serif**: Playfair Display (headings)
- **Sans**: Inter (body text)

### Components
- Rounded corners (`rounded-xl`)
- Luxury shadows (`shadow-premium`)
- Smooth animations (`transition-all duration-300`)
- Hover effects with scale transforms

## 📁 Project Structure

```
AynasCollection/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── services/       # API services
│   │   └── styles/         # CSS and Tailwind config
│   └── package.json
├── backend/                 # ASP.NET Core backend
│   ├── AynasCollection.API/        # Web API project
│   ├── AynasCollection.Application/ # Business logic
│   ├── AynasCollection.Core/       # Domain entities
│   └── AynasCollection.Infrastructure/ # Data access
├── setup-env.sh            # Environment setup script
├── start-dev.sh            # Development startup script
└── README.md
```

## 🧪 Testing

### Backend Testing
```bash
cd backend/AynasCollection.API
dotnet test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Update environment variables for production
2. Configure production database
3. Set up SSL certificates
4. Deploy to Azure/AWS/Heroku

### Frontend Deployment
1. Build the production bundle
2. Deploy to Vercel/Netlify/AWS S3

## 🔧 Development

### Environment Variables
- **Development**: Use `.env` file (automatically loaded)
- **Production**: Set environment variables on your hosting platform
- **Security**: `.env` files are automatically ignored by git

### Adding New Features
1. **Backend**: Add new entities in `Core`, services in `Application`, and controllers in `API`
2. **Frontend**: Add new components in `components/` and pages in `pages/`

### Database Migrations
```bash
cd backend/AynasCollection.API
dotnet ef migrations add MigrationName
dotnet ef database update
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@aynascollection.com or create an issue in the repository.

---

**Aynas Collection** - Premium Fashion & Lifestyle E-commerce Platform
