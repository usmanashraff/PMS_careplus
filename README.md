<div align="center">
  <br />
      <img src="https://github.com/adrianhajdin/healthcare/assets/151519281/a7dd73b6-93de-484d-84e0-e7f4e299167b" alt="Project Banner">

  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="appwrite" />
  </div>

  <h3 align="center">A HealthCare Management System</h3>

  
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets (Code to Copy)](#snippets)
6. 🔗 [Assets](#links)


## <a name="introduction">🤖 Introduction</a>

A healthcare patient management application that allows patients to easily register, book, and manage their appointments with doctors, featuring administrative tools for scheduling, confirming, and canceling appointments, along with SMS notifications, all built using Next.js.




## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- Appwrite
- Typescript
- TailwindCSS
- ShadCN
- Twilio

## <a name="features">🔋 Features</a>

👉 **Register as a Patient**: Users can sign up and create a personal profile as a patient.

👉 **Book a New Appointment with Doctor**: Patients can schedule appointments with doctors at their convenience and can book multiple appointments.

👉 **Manage Appointments on Admin Side**: Administrators can efficiently view and handle all scheduled appointments.

👉 **Confirm/Schedule Appointment from Admin Side**: Admins can confirm and set appointment times to ensure they are properly scheduled.

👉 **Cancel Appointment from Admin Side**: Administrators have the ability to cancel any appointment as needed.

👉 **Send SMS on Appointment Confirmation**: Patients receive SMS notifications to confirm their appointment details.

👉 **Complete Responsiveness**: The application works seamlessly on all device types and screen sizes.

👉 **File Upload Using Appwrite Storage**: Users can upload and store files securely within the app using Appwrite storage services.

👉 **Manage and Track Application Performance Using Sentry**: The application uses Sentry to monitor and track its performance and detect any errors.

and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/usmanashraff/PMS_careplus.git
cd PMS_careplus
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
#APPWRITE
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1

NEXT_PUBLIC_PROJECT_ID=6688e34d000c6f088247

NEXT_PUBLIC_API_KEY=1d2b348795e04ccb44651177ff2cd923b771d511cb47d0cf561ded5db49e4401d75449e3c88e353a3f2fb2bdd5a0da9bfb9f97691a8b93d03ebe714994a4e6f3e16432ff020ce4298335567cb5532100777974024a21174cd6ba01992af4436f50f5978f2771bdb6861c0e7dd77a594c279ff20e0c596f3180883957e90e8f43

NEXT_PUBLIC_DATABASE_ID=6688e3d6003aa3429334

NEXT_PUBLIC_PATIENT_COLLECTION_ID=

NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID=

NEXT_PUBLIC_DOCTOR_COLLECTION_ID=

NEXT_PUBLIC_BUCKET_ID=

NEXT_PUBLIC_ADMIN_PASSKEY=111111


SENTRY_AUTH_TOKEN=

TWILLO_RECOVERY_ID=
```

Replace the placeholder values with your actual Appwrite credentials. You can obtain these credentials by signing up on the [Appwrite website](https://appwrite.io/).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>tailwind.config.ts</code></summary>

```typescript
import type { Config } from "tailwindcss";

const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        green: {
          500: "#24AE7C",
          600: "#0D2A1F",
        },
        blue: {
          500: "#79B5EC",
          600: "#152432",
        },
        red: {
          500: "#F37877",
          600: "#3E1716",
          700: "#F24E43",
        },
        light: {
          200: "#E8E9E9",
        },
        dark: {
          200: "#0D0F10",
          300: "#131619",
          400: "#1A1D21",
          500: "#363A3D",
          600: "#76828D",
          700: "#ABB8C4",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      backgroundImage: {
        appointments: "url('/assets/images/appointments-bg.png')",
        pending: "url('/assets/images/pending-bg.png')",
        cancelled: "url('/assets/images/cancelled-bg.png')",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
```

</details>

<details>
<summary><code>app/globals.css</code></summary>

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ========================================== TAILWIND STYLES */
@layer base {
  /* Remove scrollbar */
  .remove-scrollbar::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    border-radius: 0px;
  }

  .remove-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .remove-scrollbar::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 0px;
  }

  .remove-scrollbar::-webkit-scrollbar-thumb:hover {
    /* background: #1e2238; */
    background: transparent;
  }
}

@layer utilities {
  /* ===== UTILITIES */
  .sidebar {
    @apply remove-scrollbar w-full max-w-72 flex-col overflow-auto bg-black-800 px-7 py-10;
  }

  .left-sidebar {
    @apply hidden lg:flex;
  }

  .right-sidebar {
    @apply hidden xl:flex;
  }

  .clip-text {
    @apply bg-clip-text text-transparent;
  }

  .bg-image {
    @apply bg-black-900 bg-light-rays bg-cover bg-no-repeat;
  }

  .header {
    @apply text-32-bold md:text-36-bold;
  }

  .sub-header {
    @apply text-18-bold md:text-24-bold;
  }

  .container {
    @apply relative flex-1 overflow-y-auto px-[5%];
  }

  .sub-container {
    @apply mx-auto flex size-full flex-col py-10;
  }

  .side-img {
    @apply hidden h-full object-cover md:block;
  }

  .copyright {
    @apply text-14-regular justify-items-end text-center text-dark-600 xl:text-left;
  }

  /* ==== SUCCESS */
  .success-img {
    @apply m-auto flex flex-1 flex-col items-center justify-between gap-10 py-10;
  }

  .request-details {
    @apply flex w-full flex-col items-center gap-8 border-y-2 border-dark-400 py-8 md:w-fit md:flex-row;
  }

  /* ===== ADMIN */
  .admin-header {
    @apply sticky top-3 z-20 mx-3 flex items-center justify-between rounded-2xl bg-dark-200 px-[5%] py-5 shadow-lg xl:px-12;
  }

  .admin-main {
    @apply flex flex-col items-center space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-12;
  }

  .admin-stat {
    @apply flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10;
  }

  /* ==== FORM */
  .radio-group {
    @apply flex h-full flex-1 items-center gap-2 rounded-md border border-dashed border-dark-500 bg-dark-400 p-3;
  }

  .checkbox-label {
    @apply cursor-pointer text-sm font-medium text-dark-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:leading-none;
  }

  /* ==== File Upload */
  .file-upload {
    @apply text-12-regular flex cursor-pointer  flex-col items-center justify-center gap-3 rounded-md border border-dashed border-dark-500 bg-dark-400 p-5;
  }

  .file-upload_label {
    @apply flex flex-col justify-center gap-2 text-center text-dark-600;
  }

  /* ==== Stat Card */
  .stat-card {
    @apply flex flex-1 flex-col gap-6 rounded-2xl bg-cover p-6 shadow-lg;
  }

  /* ==== Status Badge */
  .status-badge {
    @apply flex w-fit items-center gap-2 rounded-full px-4 py-2;
  }

  /* Data Table */
  .data-table {
    @apply z-10 w-full overflow-hidden rounded-lg border border-dark-400 shadow-lg;
  }

  .table-actions {
    @apply flex w-full items-center justify-between space-x-2 p-4;
  }

  /* ===== ALIGNMENTS */
  .flex-center {
    @apply flex items-center justify-center;
  }

  .flex-between {
    @apply flex items-center justify-between;
  }

  /* ===== TYPOGRAPHY */
  .text-36-bold {
    @apply text-[36px] leading-[40px] font-bold;
  }

  .text-24-bold {
    @apply text-[24px] leading-[28px] font-bold;
  }

  .text-32-bold {
    @apply text-[32px] leading-[36px] font-bold;
  }

  .text-18-bold {
    @apply text-[18px] leading-[24px] font-bold;
  }

  .text-16-semibold {
    @apply text-[16px] leading-[20px] font-semibold;
  }

  .text-16-regular {
    @apply text-[16px] leading-[20px] font-normal;
  }

  .text-14-medium {
    @apply text-[14px] leading-[18px] font-medium;
  }

  .text-14-regular {
    @apply text-[14px] leading-[18px] font-normal;
  }

  .text-12-regular {
    @apply text-[12px] leading-[16px] font-normal;
  }

  .text-12-semibold {
    @apply text-[12px] leading-[16px] font-semibold;
  }

  /* =====  SHADCN OVERRIDES */
  .shad-primary-btn {
    @apply bg-green-500 text-white !important;
  }

  .shad-danger-btn {
    @apply bg-red-700 text-white !important;
  }

  .shad-gray-btn {
    @apply border border-dark-500 cursor-pointer bg-dark-400 text-white !important;
  }

  .shad-input-label {
    @apply text-14-medium text-dark-700 !important;
  }

  .shad-input {
    @apply bg-dark-400 placeholder:text-dark-600 border-dark-500 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 !important;
  }

  .shad-input-icon {
    @apply bg-dark-400 placeholder:text-dark-600 border-dark-500 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 !important;
  }

  .shad-textArea {
    @apply bg-dark-400 placeholder:text-dark-600 border-dark-500 focus-visible:ring-0 focus-visible:ring-offset-0 !important;
  }

  .shad-combobox-item {
    @apply data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 !important;
  }

  .shad-combobox-trigger {
    @apply h-11 !important;
  }

  .shad-select-trigger {
    @apply bg-dark-400  placeholder:text-dark-600 border-dark-500 h-11 focus:ring-0 focus:ring-offset-0 !important;
  }

  .shad-select-content {
    @apply bg-dark-400 border-dark-500 !important;
  }

  .shad-dialog {
    @apply bg-dark-400 border-dark-500 !important;
  }

  .shad-dialog button {
    @apply focus:ring-0 focus:ring-offset-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 !important;
  }

  .shad-error {
    @apply text-red-400 !important;
  }

  .shad-table {
    @apply rounded-lg overflow-hidden !important;
  }

  .shad-table-row-header {
    @apply border-b border-dark-400 text-light-200 hover:bg-transparent !important;
  }

  .shad-table-row {
    @apply border-b border-dark-400 text-light-200 !important;
  }

  .shad-otp {
    @apply w-full flex justify-between !important;
  }

  .shad-otp-slot {
    @apply text-36-bold justify-center flex border border-dark-500 rounded-lg size-16 gap-4 !important;
  }

  .shad-alert-dialog {
    @apply space-y-5 bg-dark-400 border-dark-500 outline-none !important;
  }

  .shad-sheet-content button {
    @apply top-2 focus:ring-0 focus:ring-offset-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 !important;
  }

  /* =====  REACT PHONE NUMBER INPUT OVERRIDES */
  .input-phone {
    @apply mt-2 h-11 rounded-md px-3 text-sm border bg-dark-400 placeholder:text-dark-600 border-dark-500 !important;
  }

  /* =====  REACT DATE PICKER OVERRIDES */
  .date-picker {
    @apply overflow-hidden border-transparent w-full placeholder:text-dark-600  h-11 text-14-medium rounded-md px-3 outline-none !important;
  }
}

/* =====  REACT-DATEPICKER OVERRIDES */
.react-datepicker-wrapper.date-picker {
  display: flex;
  align-items: center;
}

.react-datepicker,
.react-datepicker__time,
.react-datepicker__header,
.react-datepicker__current-month,
.react-datepicker__day-name,
.react-datepicker__day,
.react-datepicker-time__header {
  background-color: #1a1d21 !important;
  border-color: #363a3d !important;
  color: #abb8c4 !important;
}

.react-datepicker__current-month,
.react-datepicker__day-name,
.react-datepicker-time__header {
  color: #ffffff !important;
}

.react-datepicker__triangle {
  fill: #1a1d21 !important;
  color: #1a1d21 !important;
  stroke: #1a1d21 !important;
}

.react-datepicker__time-list-item:hover {
  background-color: #363a3d !important;
}

.react-datepicker__input-container input {
  background-color: #1a1d21 !important;
  width: 100%;
  outline: none;
}

.react-datepicker__day--selected {
  background-color: #24ae7c !important;
  color: #ffffff !important;
  border-radius: 4px;
}

.react-datepicker__time-list-item--selected {
  background-color: #24ae7c !important;
}

.react-datepicker__time-container {
  border-left: 1px solid #363a3d !important;
}

.react-datepicker__time-list-item {
  display: flex !important;
  align-items: center !important;
}

/* =====  REACT PHONE NUMBER INPUT OVERRIDES */
.PhoneInputInput {
  outline: none;
  margin-left: 4px;
  background: #1a1d21;
  font-size: 14px;
  font-weight: 500;
}

.PhoneInputInput::placeholder {
  color: #1a1d21;
}
```

</details>

<details>
<summary><code>types/index.d.ts</code></summary>

```typescript
/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female" | "Other";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

declare type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};
```

</details>

<details>
<summary><code>types/appwrite.types.ts</code></summary>

```typescript
import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

export interface Appointment extends Models.Document {
  patient: Patient;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}
```

</details>

<details>
<summary><code>lib/utils.ts</code></summary>

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    year: "numeric", // numeric year (e.g., '2023')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}
```

</details>

<details>
<summary><code>lib/validation.ts</code></summary>

```typescript
import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(500, "Occupation must be at most 500 characters"),
  emergencyContactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(50, "Contact name must be at most 50 characters"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Invalid phone number"
    ),
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  insuranceProvider: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters"),
  insurancePolicyNumber: z
    .string()
    .min(2, "Policy number must be at least 2 characters")
    .max(50, "Policy number must be at most 50 characters"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to treatment in order to proceed",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
```

</details>

<details>
<summary><code>constants/index.ts</code></summary>

```typescript
export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
```

</details>

## <a name="links">🔗 Assets</a>

Public assets used in the project can be found [here](https://drive.google.com/file/d/1yGvWFeSaH1_-aiQ1gejT23lqz5979RKB/view?usp=sharing)


#Development process
##setup 
1.create app </br>
```
npx create-next-app@latest
```
2.remove all default stuff </br>
3.add custome stuff in rootlayout file </br>
```import { Plus_Jakarta_Sans } from "next/font/google";
//changing font setting
const fontSans = Plus_Jakarta_Sans({ subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans'
 });


 <!-- import new function(cn) from /lib/utils --> </br>
 import { cn } from "@/lib/utils";
//this cn is className and all classes added to that function will be applied by default

  <body className={===cn('min-h-screen text-white bg-dark-300 font-sans antialiased', fontSans.variable)===}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            {children}
          </ThemeProvider>
      </body>

      // antialiased is a tailwing class to make font look more good
      

      //theme provider wrapper is in context of the next-themes installed by the shad-cn libraray
      </br>
      refer this link to install next-themes
      [next-theme in shadcn](https://ui.shadcn.com/docs/dark-mode/next) </br>
```
now come to this /lib/utils.ts file from where cn function re imported, it will have the following function defined
```
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
need to install two package for this 
1.clsx </br>
2.twMerge </b>


###add custom tailwing.conf file (custom colors and all other stuff to extend things up)
###custom globels.css file (add custom classes and all thoses)

###install shadcn library: refer to this link for further guide [shad-install](https://ui.shadcn.com/docs/installation) </br>

with all setup! ready to get into development process

##Home page 
only important things will be discussed </br>
###reack hook form 
refer to this link for installation and usage of react hook form [react hook form](https://ui.shadcn.com/docs/components/form) </br>

install zod and make an saperate file for the zod validation in lib/validation.ts</br>
```
import { z } from "zod";

export const UserFormValidation = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  });
```

while using react hook form make a seperate component for rendering the formfield so not to have messy code 
</br>
space-y-4. tailwing class that space vertically all items in it  </br>
how to pass form.control to customformfield component ?</br>
it is a type "Control any" </br>
use enum to send form field types </br>
enums are used to avoid types 
```
export enum FormFieldType{
  INPUT = 'input',
  TEXTAREA= 'textarea',
  PHONE_INPUT= 'phoneInput',
  CHECKBOX='checkbox',
  DATE_PICKER='datePicker',
  SKELETON = 'skeleton',
  SELECT = 'select'
}
 
```
these are all the props that we are getting in the customFormField component and thats how we define the types of props in typescript 
```
interface customProps{
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    imgSrc?: string,
    altIcon?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any)=> React.ReactNode

}
```
in the field render function print field according to the input type
```
 const {fieldType, imgSrc, placeholder, altIcon} = props;
    switch (props.fieldType){
        case FormFieldType.INPUT: 
        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">
                {imgSrc && (
                    <Image src={imgSrc}
                    height={24}
                    width={24}
                    alt={altIcon || 'icon'}
                    className="mx-2" />
                )}

                <FormControl>
                    <input placeholder={placeholder} {...field} className="shad-input border-0 px-2 w-full outline-none" />
                </FormControl>
            </div>
        )
        break;
        }

```

special type of field (phone number type field)
```
 <FormControl>
                <PhoneInput
                        placeholder={placeholder}
                        withCountryCallingCode
                        international
                        defaultCountry='US'
                        value={field.value as undefined}
                        onChange={field.onChange}
                        className='input-phone'
                        />
            </FormControl>
```
for this to use install the following package 
```npm install react-phone-number-input --save```
or refer to this link for usage [link](https://www.npmjs.com/package/react-phone-number-input) </br>
###valiation </br>
use zod for make a validation schema 
and update default values of fields in the form resolver 
```
 const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: '',
      phone:''
    },
  })
 
```

###validation ts file in lib folder </br>
```
import { z } from "zod";

export const UserFormValidation = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  });
```
##appwrite setup </br>
1.make an organization and a project 
2.copy project id, api key, database id, tables id,and storage bucket in .env file </br>
```
#APPWRITE
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1

NEXT_PUBLIC_PROJECT_ID=

NEXT_PUBLIC_API_KEY=

NEXT_PUBLIC_DATABASE_ID=

NEXT_PUBLIC_PATIENT_COLLECTION_ID=

NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID=

NEXT_PUBLIC_DOCTOR_COLLECTION_ID=

NEXT_PUBLIC_BUCKET_ID=

NEXT_PUBLIC_ADMIN_PASSKEY=1111

```
use NEXT_PUBLIC as a prefix for env variables in nextjs <br>
##authentication in appwrite </br>
install `npm install node-appwrite --save`
</br>
setup sdk and configure app.conf.ts file
```
import * as sdk from "node-appwrite";

const client = new sdk.Client().setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!) // Your project ID
    .setKey(process.env.NEXT_PUBLIC_API_KEY!); // Your secret API key



export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
```
</br>
###thats how we create a new user and fetch users from appwrite auth </br>

```
import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"

export const createUser = async(user: CreateUserParams ): Promise<any> =>{
    try {
        const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name)
        console.log('from action file',newUser)
        return newUser
    } catch (error:any) {
        if(error && error?.code == 409){ // error code 409 means user exists
            const document = await users.list([
                Query.equal('email', [user.email])
            ])
            return { message: 'user_already_exists', content: document}
            
        }
        return {message: 'error in creating user', content: error}
        
        
    }

}
```
</br>
###error handling </br> 
returing an object from the action function and print error to user if exists


##registration page </br>
we will only discusse new form field types used </br>
###react-datepicker </br> 
[react-datePicker](https://www.npmjs.com/package/react-datepicker) </br>
```
<FormControl id='date-picker'>
                <DatePicker selected={field.value} onChange={(date) => field.onChange(date)} 
                    showTimeSelect={showTimeSelect ?? false}
                    dateFormat={dateFormat ?? 'MM/DD/YYYY'}
                    wrapperClassName="date-picker"
                    timeInputLabel="Time"
                    />
```

</br>
rendering skeleton in customformfield </br>

```
<CustomFormField 
             control={form.control}
             fieldType={FormFieldType.SKELETON}
             name='gender'
             label='Gender'
             renderSkeleton={(field)=>(
                <FormControl>
                <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onValueChange}
                    defaultValue={field.defaultValue}
                    >
                        {genderOptions.map((option)=>(
                            <div key={option} className="radio-group">
                                <RadioGroupItem
                                value={option}
                                id={option}
                                />
                                <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </FormControl>
             )}

        />
 ```
 </br>
 how to render select </br>
 sending children </br>
 
 ```
  <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.SELECT}
             name='primaryPhysician'
             label='Primary Physician'
             placeholder="Select a physician"

        >
            {Doctors.map((doctor)=>(
                <SelectItem key={doctor.name} value={doctor.name}>
                    <div className="cursor-pointer gap-2 flex items-center">
                        <Image 
                          src={doctor.image}
                          width={32}
                          height={32}
                          alt={`${doctor.name} image`}
                          className="rounded-full border border-dark-500"
                          />
                          <p>{doctor.name}</p>
                    </div>
                </SelectItem>
            ))}
        </CustomFormField>
 ```
 on rendering side </br> 
 ```
  <FormControl>
                <Select onValueChange={field.onChange}
                 defaultValue={field.value}
                >
                    <FormControl >
                        <SelectTrigger className="shad-select-trigger">
                        <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent className="shad-select-content">
                        {props.children}
                    </SelectContent>
                </Select>
            </FormControl>
 ```
 
 
 </br>
 this is how we will render file uploader install from this </br> [link](https://react-dropzone.js.org/)
 
 ```
 "use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="file-upload_label">
            <p className="text-14-regular ">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p className="text-12-regular">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </>
      )}
    </div>
  );
};
```

this is how we render checkbox </br>
```
  <FormControl>
                    <div className="flex gap-4 items-center">
                        <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} />
                        <label htmlFor={props.name} className="checkbox-label">{props.label}</label>
                    </div>
                </FormControl
```
</br>

###on submitting register form 
```
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    let formData;
   if(values.identificationDocument && values.identificationDocument.length > 0){
    const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type
    })
     formData = new FormData()
     formData.append('blobFile', blobFile)
     formData.append('fileName', values.identificationDocument[0].name)
   }

   try {
    const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,

    }
    //@ts-ignore
    const patient = await registerPatient(patientData)
    if(patient) router.push(`/patients/${user.$id}/new-appointment`)
   } catch (error) {
    console.log(error)
   }
  }
```

registerUser function explanation 
```
// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  console.log("subbmittes")
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBuffer(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("fileName") as string
        );

      file = await storage.createFile(process.env.NEXT_PUBLIC_BUCKET_ID!, ID.unique(), inputFile);
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file.$id}/view??project=${process.env.NEXT_PUBLIC_PROJECT_ID}`
          : null,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};
```
 


 ##appointment page 
