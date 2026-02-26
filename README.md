# Professional To-Do Planner 🚀

A high-performance, sleek To-Do List application built with **Java Spring Boot**, **MySQL**, and a modern Glassmorphic frontend.

## ✨ Features
- **Task Management**: Full CRUD (Create, Read, Update, Delete).
- **Organization**: Categories and visual Priority levels.
- **Due Dates**: Track deadlines effortlessly.
- **Modern UI**: Dark mode with glassmorphism and subtle animations.
- **Search**: Instant filtering of tasks.

## 🛠️ Tech Stack
- **Backend**: Spring Boot 3, Spring Data JPA, Hibernate.
- **Database**: MySQL.
- **Frontend**: HTML5, Vanilla CSS3 (Custom Design), Javascript.
- **Icons**: Lucide Icons.

## 🚀 Getting Started

### 1. Prerequisites 🛠️

#### Quick Setup (macOS only) 🍎
If you are on a Mac, you can install everything (JDK 17, Maven, MySQL) using the included `setup.sh` script:
```bash
chmod +x setup.sh
./setup.sh
```

#### Manual Installation
To run this project, you will need the following tools:

- **Java Development Kit (JDK) 17**: This project targets Java 17.
  - [Download JDK 17 (Adoptium/Eclipse Temurin)](https://adoptium.net/temurin/releases/?version=17)
  - [Download JDK 17 (Oracle)](https://www.oracle.com/java/technologies/downloads/#java17)
- **Apache Maven 3.6+**: Required for dependency management and building the project.
  - [Download Maven](https://maven.apache.org/download.cgi)
  - *Note: You can also use the included `./mvnw` (Maven Wrapper) to run the project without installing Maven globally.*
- **MySQL 8.0+**: Used for persistent data storage.
  - [Download MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- **An IDE (Optional but recommended)**:
  - [IntelliJ IDEA](https://www.jetbrains.com/idea/download/)
  - [Visual Studio Code](https://code.visualstudio.com/) with Java Extension Pack.


#### How to verify your setup:
Check your current versions by running these commands in your terminal:
- `java -version` (Should show `17.x.x`)
- `mvn -version` (Should show `3.x.x`)
- `mysql --version` (Should show `8.x.x`)



### 2. Configuration
Update `src/main/resources/application.properties` with your MySQL credentials:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Database Setup
Create a database named `todo_db` in your MySQL instance:
```sql
CREATE DATABASE todo_db;
```

### 4. Run the Application
Open your terminal in the project root and run:
```bash
./mvnw spring-boot:run
```
The app will be available at `http://localhost:8080`.

## 📚 Learning Spring Boot through this App
This app follows the **Layered Architecture**:
1.  **Model (`com.todoapp.todoplanner.model`)**: Defines the data structure.
2.  **Repository (`com.todoapp.todoplanner.repository`)**: Handles database operations using JPA (No SQL writing needed!).
3.  **Service (`com.todoapp.todoplanner.service`)**: Contains the business logic.
4.  **Controller (`com.todoapp.todoplanner.controller`)**: Manages HTTP requests (REST API).

---
Developed with ❤️ by Chaitanya using the help of Antigravity
