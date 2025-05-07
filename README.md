# FlexDesk Admin

`FlexTest` provides a secure, scalable, and AI-enhanced e-testing solution that runs on a local and online server, ensuring full control over data privacy. It enables institutions to conduct exams efficiently with real-time monitoring and secure test environments.

---

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v16 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/flexdesk-admin.git
   cd flexdesk-admin
   ```
2. Install dependencies
    ```bash
    npm install
    ```
3. Set up environment variables (see below).
4. Start the development server:
    ```bash
    npm run dev
    ```
5. Open your browser and navigate to 
    - Local Development http://localhost:3000

### Installation
The application requires the following environment variables to function correctly.
```bash
    NEXT_PUBLIC_MOCKARO_KEY=?
    NEXT_PUBLIC_API_URL=?
    NEXT_PUBLIC_APP_NAME=?
    NEXT_PUBLIC_REMOTEURL=?
```

### Test Data
Login Credentials
Use the following credentials to log in to the application:

 - Email: ``johndoe@example.com``
 - Password: ``123456789``

Forgot Password
To test the forgot password functionality:

Use the email: ``johndoe@example.com.``

A verification code will be sent to the email. For demo purposes, use the following test data:
 - Verification Code: ``00000``

### Running Tests
The application includes unit and integration tests. To run test
1. Run all unit test:
```bash
    npm run test
```

2. Run test in watch mode:
```bash
    npm run test:watch
```