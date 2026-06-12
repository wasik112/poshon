// Site content store backed by Firestore.
//
// The whole content tree ({ site, locations }) lives in a single Firestore
// document so it can be read and written atomically — which matches the
// admin panel's raw-JSON editing model.
//
// Read path: try Firestore first. If the doc doesn't exist yet (fresh
// project) or Firestore is unreachable / unconfigured, fall back to the
// bundled /api data so the public site always renders. The first admin
// save seeds the Firestore document from there on.
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { api } from './api.js';

const CONTENT_DOC = doc(db, 'content', 'main');

async function fetchFromApi() {
  const [site, locations] = await Promise.all([
    api.getSite(),
    api.getLocations()
  ]);
  return { site, locations };
}

export async function fetchContent() {
  try {
    const snap = await getDoc(CONTENT_DOC);
    if (snap.exists()) {
      const data = snap.data();
      if (data && data.site && Array.isArray(data.locations)) {
        return { site: data.site, locations: data.locations };
      }
    }
  } catch (err) {
    // Firestore not configured / offline → fall back to the bundled API.
    console.warn('[content] Firestore read failed, using /api fallback:', err?.message || err);
  }
  return fetchFromApi();
}

// Live subscription to the content doc. Fires whenever the document
// changes in Firestore, so the public site updates in real time as the
// admin edits. Returns an unsubscribe function.
export function subscribeContent(onData, onError) {
  return onSnapshot(
    CONTENT_DOC,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data && data.site && Array.isArray(data.locations)) {
          onData({ site: data.site, locations: data.locations });
        }
      }
    },
    (err) => { if (onError) onError(err); }
  );
}

// Persist the full content tree. Requires an authenticated admin
// (enforced by Firestore security rules). Returns the saved values.
export async function saveContent({ site, locations }) {
  await setDoc(CONTENT_DOC, {
    site,
    locations,
    updatedAt: serverTimestamp()
  });
  return { site, locations };
}
