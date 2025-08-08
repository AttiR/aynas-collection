#!/bin/bash

echo "🚀 Aynas Collection - Environment Setup"
echo "======================================"
echo ""

# Check if .env file already exists
if [ -f "backend/AynasCollection.API/.env" ]; then
    echo "⚠️  .env file already exists. Do you want to overwrite it? (y/n)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 0
    fi
fi

echo "📧 Email Configuration"
echo "---------------------"
echo "Enter your Gmail address:"
read -r email

echo "Enter your Gmail app password (not your regular password):"
read -r password

echo ""
echo "🔑 JWT Configuration"
echo "-------------------"
echo "Enter a secret key for JWT tokens (at least 32 characters):"
read -r jwt_secret

echo ""
echo "💳 Stripe Configuration"
echo "----------------------"
echo "Enter your Stripe secret key (starts with sk_test_):"
read -r stripe_secret

echo "Enter your Stripe publishable key (starts with pk_test_):"
read -r stripe_publishable

echo ""
echo "🌐 Application Configuration"
echo "---------------------------"
echo "Enter your application base URL (default: http://localhost:3000):"
read -r base_url
base_url=${base_url:-http://localhost:3000}

# Create the .env file
cat > backend/AynasCollection.API/.env << EOF
# Database Configuration
ConnectionStrings__DefaultConnection=Data Source=AynasCollection.db

# JWT Configuration
JwtSettings__SecretKey=${jwt_secret}
JwtSettings__ExpirationHours=24

# Stripe Configuration
StripeSettings__SecretKey=${stripe_secret}
StripeSettings__PublishableKey=${stripe_publishable}

# Email Configuration
EmailSettings__SmtpServer=smtp.gmail.com
EmailSettings__SmtpPort=587
EmailSettings__SmtpUsername=${email}
EmailSettings__SmtpPassword=${password}
EmailSettings__FromEmail=noreply@aynascollection.com
EmailSettings__FromName=Aynas Collection
EmailSettings__BaseUrl=${base_url}
EOF

echo ""
echo "✅ Environment configuration completed!"
echo ""
echo "📝 Next steps:"
echo "1. Make sure your Gmail account has 2FA enabled"
echo "2. Generate an app password in your Google Account settings"
echo "3. Update the EmailSettings__SmtpPassword in the .env file with your app password"
echo "4. Run './start-dev.sh' to start the application"
echo ""
echo "🔒 Security Note: The .env file is automatically ignored by git"
echo "   to keep your credentials secure."
