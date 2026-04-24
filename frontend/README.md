#  LostFind - Lost and Found Service

## 📘 Overview
**LostFind** is a full-stack web platform that makes it easy for **students and campus communities** to **report, track, and recover lost or found items**. Users can post items.

---

## 🚀 Features 

### 🔹 General Features

* **Responsive Layout** with TailwindCSS.
* **Dynamic Navbar** with search functionality and post creation button.
* **Post Filtering**: filter by type, category, and search query.
* **Custom Scrollbars** for better UX on long post lists.
* **Modals**: Post creation and profile editing modals.

### 🔹 Pages

#### 1️⃣ Home Page

* Filter posts by:

  * **Type**: All, Found, Lost.
  * **Category**: Electronics, Books, Others, etc.
  * **Search query**: Title, description, or user name.
* Components:

  * `Navbar` – search and post creation.
  * `Sidebar` – filters and categories.
  * `RightPanel` – additional info or trending items.
  * `ItemCard` – each post preview.
  * `PostFormModal` – create a new post.

#### 2️⃣ Profile Page

* Shows **user information**:

  * Profile picture, name, college/year, department.
* Displays **user posts** with filtering:

  * All, Found, Lost.
* Actions:

  * **Edit profile** modal (`EditProfileModal`).
  * **Create post** modal (`PostFormModal`).
* Stats displayed: total posts.


## 🏗 Frontend Tech Stack

* **React 18+** with hooks (`useState`, `useEffect`).
* **TailwindCSS** for styling.
* **React Router DOM** for page navigation.
* **Axios** for API calls (frontend handles responses and state updates).
* **Icons**: Lucide & React Feather.
* **State Management**: Local component state and props.

---

## 📁 Frontend Structure

```
src/
├─ components/            # Reusable components
│  ├─ Navbar.jsx
│  ├─ Sidebar.jsx
│  ├─ RightPanel.jsx
│  ├─ ItemCard.jsx
│  ├─ PostFormModal.jsx
│  ├─ EditProfileModal.jsx
│  └─ ConfirmDialog.jsx
├─ pages/
│  ├─ Home.jsx
│  ├─ Profile.jsx
│  
├─ utils/
│  ├─ api.js             # Frontend API calls
│  └─ auth.js            # Authentication helpers
├─ App.jsx
└─ main.jsx
```



## 🎨 UI/UX Highlights

* Gradient headers on profile.
* Custom scrollbars for post lists.
* Interactive buttons with hover and transition effects.

---


## 🔐 Authentication Handling

* JWT stored in `localStorage` (`ll_token`).
* Token automatically included in Axios requests.
* Frontend redirects unauthenticated users to login if necessary.
* Profile and pages use token to fetch data securely.

---

## 📝 Notes

* Frontend fully manages **state, UI updates, modals, filters, and data display**.
* Backend implementation is abstracted; frontend only consumes API endpoints.