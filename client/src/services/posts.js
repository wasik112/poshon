// Blog posts stored as their OWN Firestore collection (one document per
// post) — not inside the single content doc. This avoids the 1 MB
// per-document limit and scales to thousands of posts on the free tier.
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config.js';

const postsCol = collection(db, 'posts');

// Live list of all posts, newest first. Returns an unsubscribe function.
export function subscribePosts(onData, onError) {
  const q = query(postsCol, orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    (err) => { if (onError) onError(err); }
  );
}

export function createPost(data) {
  return addDoc(postsCol, { ...data, createdAt: serverTimestamp() });
}

export function updatePost(id, data) {
  return updateDoc(doc(db, 'posts', id), data);
}

export function deletePost(id) {
  return deleteDoc(doc(db, 'posts', id));
}
