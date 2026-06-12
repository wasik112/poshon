// One-time admin seeder.
//
//   npm run seed:admin
//
// Creates (or re-uses) a Firebase Auth account and writes its users/{uid}
// profile with role "admin", so you have a working dashboard login.
//
// IMPORTANT: run this BEFORE publishing the strict firestore.rules — i.e.
// while your Firestore is still in "test mode". The strict rules only let an
// existing admin grant the admin role, so the very first admin must be seeded
// while writes are open. After seeding, publish firestore.rules to lock down.
//
// Override the demo credentials with env vars if you like:
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=secret npm run seed:admin
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Minimal .env parser (avoids adding a dependency).
function loadEnv() {
  const env = {};
  try {
    const raw = readFileSync(join(__dirname, '..', '.env'), 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !line.trim().startsWith('#')) env[m[1]] = m[2].trim();
    }
  } catch {
    console.error('Could not read client/.env — make sure your VITE_FIREBASE_* values are set.');
    process.exit(1);
  }
  return env;
}

const env = loadEnv();
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

const EMAIL = process.env.ADMIN_EMAIL || 'admin@poshon.org';
const PASSWORD = process.env.ADMIN_PASSWORD || 'Poshon@2026';
const NAME = process.env.ADMIN_NAME || 'POSHON Admin';

async function main() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  let user;
  try {
    const cred = await createUserWithEmailAndPassword(auth, EMAIL, PASSWORD);
    user = cred.user;
    await updateProfile(user, { displayName: NAME });
    console.log(`✓ Created auth user: ${EMAIL}`);
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      const cred = await signInWithEmailAndPassword(auth, EMAIL, PASSWORD);
      user = cred.user;
      console.log(`• User already exists, signed in: ${EMAIL}`);
    } else {
      throw err;
    }
  }

  await setDoc(doc(db, 'users', user.uid), {
    name: NAME,
    email: EMAIL,
    role: 'admin',
    createdAt: serverTimestamp()
  });

  console.log(`✓ Wrote admin profile for uid: ${user.uid}`);
  console.log('\nDashboard login:');
  console.log(`   Email:    ${EMAIL}`);
  console.log(`   Password: ${PASSWORD}`);
  console.log('\nNow publish firestore.rules to lock things down, then open /admin.');
  process.exit(0);
}

main().catch((err) => {
  console.error('\n✗ Seed failed:', err.code || err.message);
  if (err.code === 'permission-denied') {
    console.error('  → Your Firestore rules are blocking the write. Run this while Firestore');
    console.error('    is in test mode (open rules), then publish the strict rules afterwards.');
  }
  process.exit(1);
});
