<div align="center">
  <img src="https://github.com/adrianhajdin/healthcare/assets/151519281/a7dd73b6-93de-484d-84e0-e7f4e299167b" alt="CarePlus Banner" width="100%">

  <br />
  
  <h1>🏥 CarePlus</h1>
  <p><strong>A Modern Healthcare Patient Management System</strong></p>

  <div>
    <img src="https://img.shields.io/badge/-Next.js_14-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="Next.js" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="Appwrite" />
  </div>
</div>

---

## 📖 Overview

**CarePlus** is a comprehensive healthcare patient management application designed to streamline the patient experience and simplify administrative processes. Patients can easily register, seamlessly book appointments with doctors, and manage their healthcare journey. For administrators, CarePlus provides robust tools to schedule, confirm, and cancel appointments, monitor patient data, and deliver automated SMS notifications.

---

## ✨ Features

- **🏥 Patient Registration:** Intuitive sign-up and professional profile creation for patients.
- **📅 Appointment Booking:** Clean interface for patients to schedule one or multiple appointments with specific doctors at their convenience.
- **🛡️ Admin Dashboard:** Complete control for administrators to view, handle, and manage all scheduled appointments.
- **✅ Status Management:** Admins can easily confirm, schedule, or cancel appointments.
- **💬 SMS Notifications:** Automated SMS alerts sent to patients to confirm appointment details.
- **📁 Secure File Uploads:** Upload and store necessary medical identification or documents securely via Appwrite Storage.
- **📱 Responsive Design:** A flawless user experience across all devices and screen sizes.
- **📈 Error Monitoring:** Application performance is actively tracked and logged using Sentry to ensure a reliable experience.

---

## 💻 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Backend & Database:** [Appwrite](https://appwrite.io/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Data Tables:** [TanStack Table](https://tanstack.com/table/v8)
- **Error Tracking:** [Sentry](https://sentry.io/)
- **SMS Services:** [Twilio](https://www.twilio.com/)

---

## 🚀 Quick Start

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (v18 or higher)
- [npm](https://www.npmjs.com/)

### 1. Clone the repository

```bash
git clone https://github.com/usmanashraff/PMS_careplus.git
cd PMS_careplus
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of your project and populate it with your specific API keys and credentials:

```env
# APPWRITE
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1

NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_API_KEY=
NEXT_PUBLIC_DATABASE_ID=
NEXT_PUBLIC_PATIENT_COLLECTION_ID=
NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID=
NEXT_PUBLIC_DOCTOR_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=

# ADMIN
NEXT_PUBLIC_ADMIN_PASSKEY=111111

# SENTRY
SENTRY_AUTH_TOKEN=

# TWILIO
TWILLO_RECOVERY_ID=
```

*(Note: Replace the blank placeholder values with your actual integration credentials.)*

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📂 Project Structure

```text
├── app/               # Next.js App Router pages and layouts
├── components/        # Reusable UI components (Shadcn UI)
├── constants/         # Static global constants and configurations
├── lib/               # Utility functions, Server Actions, and Data fetching
├── public/            # Static assets like images and icons
├── types/             # TypeScript interfaces and type definitions
└── ...                # Config files (Tailwind, Next.js, etc.)
```

---

<div align="center">
  <p>Built with ❤️ for modern healthcare management.</p>
</div>
