# ⚙️ CodexSnip Backend API

This repository houses the server-side application (API) that powers the **CodexSnip** web application. It handles user authentication, data persistence, and provides the necessary endpoints for managing folders and code snippets.

## ✨ Core Functionality

- **API Endpoints:** Provides RESTful endpoints for CRUD operations on code snippets and folders.
- **Data Persistence:** Uses **MongoDB** to reliably store and manage all user-created data.
- **Authentication:** Integrates with **Firebase Admin SDK** for secure user management and request authorization.
- **Scalability:** Built on the robust **Express** framework for high performance and minimal overhead.

---

## 🛠️ Tech Stack

The backend is built on the **Node.js** ecosystem, focusing on security, speed, and reliable data handling.

| Category                    | Key Technologies         | Purpose/Use                                                                       |
| :-------------------------- | :----------------------- | :-------------------------------------------------------------------------------- |
| **Core Framework**          | **Node.js**, **Express** | Runtime environment and minimal web application framework.                        |
| **Database**                | **mongodb**              | The official driver for interacting with the MongoDB database.                    |
| **Authentication/Security** | **firebase-admin**       | Server-side integration for verifying Firebase user tokens and managing users.    |
| **Middleware**              | **cors**                 | Enables secure Cross-Origin Resource Sharing for communication with the frontend. |
| **Configuration**           | **dotenv**               | Loads environment variables (like the MongoDB URI) from a `.env` file.            |
