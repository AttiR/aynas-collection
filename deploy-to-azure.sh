#!/bin/bash

echo "🚀 Aynas Collection - Azure Deployment Script"
echo "=============================================="

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed. Please install it first:"
    echo "   https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Check if user is logged in to Azure
if ! az account show &> /dev/null; then
    echo "❌ You are not logged in to Azure. Please run:"
    echo "   az login"
    exit 1
fi

echo "✅ Azure CLI is installed and you are logged in"

# Set variables
RESOURCE_GROUP="aynas-collection-rg"
LOCATION="eastus"
APP_SERVICE_PLAN="aynas-collection-plan"
WEB_APP_NAME="aynas-collection-api"
STATIC_WEB_APP_NAME="aynas-collection"

echo ""
echo "📋 Deployment Configuration:"
echo "   Resource Group: $RESOURCE_GROUP"
echo "   Location: $LOCATION"
echo "   App Service Plan: $APP_SERVICE_PLAN"
echo "   Web App (Backend): $WEB_APP_NAME"
echo "   Static Web App (Frontend): $STATIC_WEB_APP_NAME"
echo ""

read -p "Do you want to proceed with this configuration? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

echo ""
echo "🔧 Creating Azure resources..."

# Create resource group
echo "Creating resource group..."
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create App Service Plan (Free tier)
echo "Creating App Service Plan..."
az appservice plan create \
    --name $APP_SERVICE_PLAN \
    --resource-group $RESOURCE_GROUP \
    --location $LOCATION \
    --sku F1 \
    --is-linux

# Create Web App for backend
echo "Creating Web App for backend..."
az webapp create \
    --name $WEB_APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --plan $APP_SERVICE_PLAN \
    --runtime "DOTNETCORE:8.0"

# Configure Web App settings
echo "Configuring Web App settings..."
az webapp config set \
    --name $WEB_APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --startup-file "dotnet AynasCollection.API.dll"

# Create Static Web App for frontend
echo "Creating Static Web App for frontend..."
az staticwebapp create \
    --name $STATIC_WEB_APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --location $LOCATION \
    --source https://github.com/AttiR/aynas-collection \
    --branch main \
    --app-location "/frontend" \
    --api-location "/backend/AynasCollection.API" \
    --output-location "build"

echo ""
echo "✅ Azure resources created successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Get the publish profile for the Web App:"
echo "   az webapp deployment list-publishing-profiles --name $WEB_APP_NAME --resource-group $RESOURCE_GROUP --xml"
echo ""
echo "2. Add the publish profile as a GitHub secret named 'AZURE_WEBAPP_PUBLISH_PROFILE'"
echo ""
echo "3. Get the Static Web App deployment token:"
echo "   az staticwebapp secrets set --name $STATIC_WEB_APP_NAME --secret-name deployment-token --secret-value <token>"
echo ""
echo "4. Add the deployment token as a GitHub secret named 'AZURE_STATIC_WEB_APPS_API_TOKEN'"
echo ""
echo "5. Push your code to GitHub to trigger the deployment"
echo ""
echo "🌐 Your applications will be available at:"
echo "   Backend API: https://$WEB_APP_NAME.azurewebsites.net"
echo "   Frontend: https://$STATIC_WEB_APP_NAME.azurestaticapps.net"
