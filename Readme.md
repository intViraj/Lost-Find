# 🌐 LostFind - The Lost and Found Service

**LostFind** is a full-stack web platform that makes it easy for **students and campus communities** to **report, track, and recover lost or found items**. Users can post items.

---

## 🚀 Core Features

* **Responsive & Modern UI** – smooth experience across devices.
* **Dynamic Post Feed** – filter by type, category, or search term.
* **User Profiles** – view stats, posts.
* **Post ** – create, update, and interact on posts.
* **Secure Authentication** – JWT-based sessions.

---



## 🏗 Technology Stack

* **Frontend:** React 18+, TailwindCSS, Axios, React Router, React Hot Toast, Icon Libraries.
* **Backend:** Node.js, Express, MongoDB, JWT Authentication, Cloudinary for images.

---

## 🔐 Security & Authorization

* JWT tokens stored in `localStorage` and automatically included in requests.
* Protected routes for authenticated users;

---

## 📖 Detailed Documentation


## 💻 Quick Installation & Start

1. **Clone the repository**

```bash
git clone 
cd LostFind-College-Mini-Project-01
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the **root** (or backend, if needed) with:

```
PORT=5000
NODE_ENV=development
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. **Build frontend and start the app**

```bash
npm run build
npm run start
```

5. **Access the app**
   Open your browser and go to:

```
http://localhost:5000
```
### Guidelines

* Follow existing code style and naming conventions.
* Test your changes locally before submitting.
* Keep commits small and focused.
* Respect the community and maintain a collaborative approach.

---