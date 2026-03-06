# Project Diagrams

## ER Diagram
```mermaid
erDiagram
    USER ||--o{ PERIOD : logs
    USER ||--o{ SYMPTOM_LOG : records

    USER {
        ObjectId _id PK
        String name
        String email
        String password
        Number cycleLength
        Number periodDuration
        String resetToken
        Date resetTokenExpiry
        Boolean isPremium
        String role
        Date createdAt
        Date updatedAt
    }

    PERIOD {
        ObjectId _id PK
        ObjectId userId FK
        Date startDate
        Date endDate
        Date createdAt
        Date updatedAt
    }

    SYMPTOM_LOG {
        ObjectId _id PK
        ObjectId userId FK
        String date
        String[] symptoms
        String notes
        Date createdAt
        Date updatedAt
    }
```

## Class Diagram
```mermaid
classDiagram
    class User {
        +ObjectId _id
        +String name
        +String email
        +String password
        +Number cycleLength
        +Number periodDuration
        +String resetToken
        +Date resetTokenExpiry
        +Boolean isPremium
        +String role
        +Date createdAt
        +Date updatedAt
        +save()
        +comparePassword(enteredPassword)
    }

    class Period {
        +ObjectId _id
        +ObjectId userId
        +Date startDate
        +Date endDate
        +Date createdAt
        +Date updatedAt
    }

    class SymptomLog {
        +ObjectId _id
        +ObjectId userId
        +String date
        +String[] symptoms
        +String notes
        +Date createdAt
        +Date updatedAt
    }

    User "1" --> "*" Period : logs
    User "1" --> "*" SymptomLog : logs
```

## Use Case Diagram
```mermaid
usecaseDiagram
    actor User
    
    usecase "Register / Login" as UC1
    usecase "Log Period" as UC2
    usecase "View Period History" as UC3
    usecase "Predict Next Period" as UC4
    usecase "Log Symptoms" as UC5
    usecase "View Symptoms" as UC6
    usecase "Get Insights" as UC7
    
    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
    User --> UC6
    User --> UC7
```

## Sequence Diagram (Login & Data Fetch)
```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Enter Login Credentials
    Frontend->>Backend: POST /api/auth/login
    Backend->>Database: Find User by Email
    Database-->>Backend: User Data
    Backend->>Backend: Verify Password
    Backend-->>Frontend: Return JWT Token
    Frontend-->>User: Login Success

    User->>Frontend: Request Insights
    Frontend->>Backend: GET /api/period/insights (JWT)
    Backend->>Database: Fetch Period & Symptom Logs
    Database-->>Backend: Logs Data
    Backend->>Backend: Calculate Insights
    Backend-->>Frontend: Return Insights JSON
    Frontend-->>User: Display Insights Dashboard
```
