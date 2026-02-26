#!/bin/bash

echo "🚀 Starting setup for TodoPlanner..."

# Check if Homebrew is installed
if ! command -v brew &> /dev/null
then
    echo "❌ Homebrew not found. Please install it from https://brew.sh/"
    exit
fi

# Install Java 17
echo "☕ Installing Java 17..."
brew install openjdk@17
# Symlink for system to find it
sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk

# Install MySQL
echo "🐬 Installing MySQL..."
brew install mysql
brew services start mysql

# Install Maven
echo "📦 Installing Maven..."
brew install maven

echo "✅ Setup complete! You may need to restart your terminal."
echo "👉 Create the database: mysql -u root -e 'CREATE DATABASE todo_db;'"
echo "👉 Run the app: mvn spring-boot:run"
