#!/bin/bash

echo "🚀 Starting Aynas Collection Development Environment..."

# Function to check if a port is in use
check_port() {
    lsof -i :$1 > /dev/null 2>&1
}

# Start backend if not already running
if ! check_port 5000 && ! check_port 7000; then
    echo "📦 Starting Backend (ASP.NET Core API)..."
    cd backend
    dotnet run --project AynasCollection.API &
    BACKEND_PID=$!
    cd ..
    echo "✅ Backend started with PID: $BACKEND_PID"
else
    echo "⚠️  Backend already running on port 5000 or 7000"
fi

# Wait a moment for backend to start
sleep 3

# Start frontend if not already running
if ! check_port 3000; then
    echo "⚛️  Starting Frontend (React App)..."
    cd frontend
    npm start &
    FRONTEND_PID=$!
    cd ..
    echo "✅ Frontend started with PID: $FRONTEND_PID"
else
    echo "⚠️  Frontend already running on port 3000"
fi

echo ""
echo "🎉 Development environment is starting up!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000 or https://localhost:7000"
echo "📚 Swagger Docs: http://localhost:5000/swagger or https://localhost:7000/swagger"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user to stop
wait
