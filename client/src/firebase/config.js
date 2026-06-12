// Firebase client SDK initialization.
// Config values come from VITE_FIREBASE_* env vars (see .env).
// Web API keys are safe to ship — security comes from Firestore Security Rules,
// not from hiding the key.

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Exported so the admin panel can spin up a short-lived secondary app
// to create new accounts without disturbing the current admin session.
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Re-use existing app instance during HMR to avoid duplicate-app errors.
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Lazy-init these so importing this module is cheap.
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Analytics is browser-only and not available in SSR or during build —
// load it dynamically and tolerate failure (ad blockers, unsupported envs).
export async function initAnalytics() {
  if (typeof window === 'undefined') return null;
  try {
    const { isSupported, getAnalytics } = await import('firebase/analytics');
    if (await isSupported()) return getAnalytics(app);
  } catch {
    /* no-op */
  }
  return null;
}
