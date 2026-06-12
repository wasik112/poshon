// Firebase Authentication helpers.
//
// Email/password sign-in must be enabled in Firebase Console
// (Authentication → Sign-in method → Email/Password). The first admin's
// users/{uid} doc (role: "admin") is created manually in Firestore; every
// later admin is created from the admin panel via createAdminAccount.
import { initializeApp, deleteApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, db, firebaseConfig } from '../firebase/config.js';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ROLES, setUserProfile } from './users.js';

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

// Public self-registration. Only volunteer/activist roles are allowed here
// (Firestore rules reject anyone trying to self-assign 'admin').
export async function register({ name, email, password, role }) {
  if (role !== ROLES.VOLUNTEER && role !== ROLES.ACTIVIST) {
    throw new Error('Invalid role for self-registration.');
  }
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });
  // New members must be approved by an admin before they can post.
  await setUserProfile(cred.user.uid, { name, email, role, approved: false });
  return cred.user;
}

// Admin-only: create another admin account.
//
// createUserWithEmailAndPassword signs in as the new user on whatever app
// it runs against — so we run it on a throwaway *secondary* app to keep the
// current admin's session intact. The users/{uid} profile (role: admin) is
// then written from the PRIMARY app, i.e. as the signed-in admin, so the
// Firestore rules can authorize the privileged 'admin' role.
export async function createAdminAccount({ name, email, password }) {
  const secondary = initializeApp(firebaseConfig, `admin-creator-${Date.now()}`);
  try {
    const secondaryAuth = getAuth(secondary);
    const cred = await createUserWithEmailAndPassword(secondaryAuth, email, password);
    const { uid } = cred.user;
    await updateProfile(cred.user, { displayName: name });
    await signOut(secondaryAuth);
    // Written as the current admin (primary app) for rule authorization.
    await setDoc(doc(db, 'users', uid), {
      name,
      email,
      role: ROLES.ADMIN,
      approved: true,
      createdAt: serverTimestamp()
    });
    return uid;
  } finally {
    await deleteApp(secondary);
  }
}
