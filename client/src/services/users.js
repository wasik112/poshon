// Firestore-backed user profiles.
//
// Each authenticated person has a doc at users/{uid} holding their
// display name, role and an `approved` flag. `role` and `approved` are the
// source of truth for access control and are enforced by Firestore rules —
// never trust them from the client alone.
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config.js';

export const ROLES = { VOLUNTEER: 'volunteer', ACTIVIST: 'activist', ADMIN: 'admin' };

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? { uid, ...snap.data() } : null;
}

// Create/overwrite a profile doc. New volunteer/activist accounts start
// unapproved; admins are created already approved.
export async function setUserProfile(uid, { name, email, role, approved = false }) {
  await setDoc(doc(db, 'users', uid), {
    name,
    email,
    role,
    approved,
    createdAt: serverTimestamp()
  });
  return { uid, name, email, role, approved };
}

// Admin-only: live list of all user profiles.
export function subscribeUsers(onData, onError) {
  return onSnapshot(
    collection(db, 'users'),
    (snap) => onData(snap.docs.map((d) => ({ uid: d.id, ...d.data() }))),
    (err) => { if (onError) onError(err); }
  );
}

// Admin-only: approve or revoke a member.
export async function setUserApproval(uid, approved) {
  await updateDoc(doc(db, 'users', uid), { approved });
}

// Admin-only: remove a member's profile (strips their role/approval). Their
// Firebase Auth login still exists and must be deleted from the console.
export async function deleteUserProfile(uid) {
  await deleteDoc(doc(db, 'users', uid));
}
