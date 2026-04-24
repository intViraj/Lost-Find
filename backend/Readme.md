
#  LostFind - Lost and Found Service

## 📘 Overview

**LostFind** is a full-stack web application designed to help students and campus communities easily **report, track, and recover lost or found items**.
Users can post items with images, for quick communication

---

## ⚙️ Backend Implementation

The backend is built using **Node.js**, **Express**, and **MongoDB**, with a focus on **security**, **scalability**, and **clarity**.
It features RESTful APIs, **JWT authentication** and **Cloudinary** integration for image handling.

---

## 🧩 Technology Stack

* **Node.js** – Backend runtime
* **Express.js** – Server framework
* **MongoDB + Mongoose** – Database & schema modeling
* **JWT Authentication** – Secure user sessions
* **Cloudinary** – Image storage & optimization

---

## 🔐 Authentication & Authorization

* JSON Web Token (**JWT**) based authentication
* **Protected routes** with middleware verification
* Tokens are sent as **Bearer tokens** in the Authorization header

> 🔸 In Postman, select **Authorization → Type: Bearer Token**, and paste your token there.

---

## 🧱 Database Models

* **User** – Stores profile details, and profile picture info
* **Post** – Represents lost or found items, includes multiple images and metadata

## 🖼️ Image Management

* **Cloudinary integration** for fast, secure image storage
* **Profile picture upload** and management
* **Multiple image upload** for posts (max 3)
* **Automatic image cleanup** when a post or user is deleted
* **File validation and optimization** for secure uploads
* **Size and format restrictions** enforced via `multer` middleware

---

### 🔑 Auth Routes

| Method   | Endpoint             | Description                                             |
| -------- | -------------------- | ------------------------------------------------------- |
| **POST** | `/api/auth/register` | Register new user/      (with optional profile picture) |
| **POST** | `/api/auth/login`    | Login as user                                           |
| **POST** | `/api/auth/logout`   | Logout user                                             |

---

### 👤 User Routes

| Method     | Endpoint              | Description                    |
| ---------- | --------------------- | ------------------------------ |
| **GET**    | `/api/user/stats`     | Get user statistics            |
| **GET**    | `/api/user/users/:id` | Get details of a specific user |
| **PUT**    | `/api/user/edit/:id`  | Update a user profile          |
| **DELETE** | `/api/user/users/:id` | Delete a user profile          |

> 🔹Added GET `/user/users/:id` and PUT `/user/edit/:id` to support user details fetching and profile update.

---

### 🖼️ Upload Routes

| Method   | Endpoint              | Description                      |
| -------- | --------------------- | -------------------------------- |
| **POST** | `/api/upload/profile` | Upload a profile picture         |
| **POST** | `/api/upload/post`    | Upload up to 3 images for a post |

---

### 📦 Post Routes

| Method     | Endpoint             | Description                                          |
| ---------- | -------------------- | ---------------------------------------------------- |
| **GET**    | `/api/post`          | Get all posts                                        |
| **POST**   | `/api/post`          | Create a new post with images                        |
| **GET**    | `/api/post/user/:id` | Get all posts by a specific user                     |
| **GET**    | `/api/post/:id`      | Get a single post by ID                              |
| **PUT**    | `/api/post/:id`      | Update an existing post and images                   |
| **DELETE** | `/api/post/:id`      | Delete post                                          |

---

## 🧾 Notes for Postman Testing

* Always include your JWT in **Authorization → Bearer Token**.
* Example Header:

  ```
  Authorization: Bearer <your_token_here>
  ```
* Image uploads use **form-data**:

  * Key: `image` (for profile)
  * Key: `images` (for post images, max 3)

  ```json