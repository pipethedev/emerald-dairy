import "server-only";

import { cookies, headers } from "next/headers";

import {
  initializeApp,
  getApps,
  cert,
  applicationDefault,
  App,
} from "firebase-admin/app";
import { getAuth, SessionCookieOptions } from "firebase-admin/auth";
// import serviceAccount from "/home/BriggSKvngZ/MyCode/note-app/emerald-diary-firebase-adminsdk.json";

console.log("DIR_NAME: ", { __dirname });
const serviceAccount = require("../../emerald-diary-firebase-adminsdk-2.json");

export let firebaseApp: App | undefined;

const existingFirebaseApp = getApps().find((it) => {
  console.log("IT:confirm==> ", it.name === "emerald-diary");
  return it.name === "emerald-diary";
});

if (existingFirebaseApp) {
  console.log("EXISTING_FIREBASE_APP", existingFirebaseApp);
  firebaseApp = existingFirebaseApp;
} else {
  console.log("NO_FIREBASE_APP");
  firebaseApp = initializeApp(
    {
      // credential: cert({
      //   projectId: process.env.FIREBASE_PROJECT_ID,
      //   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      //   privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      // }),
      projectId: process.env.FIREBASE_PROJECT_ID,
      credential: cert(serviceAccount),
    },
    "emerald-diary"
  );
}

// {
//   // credential: cert({
//   //   projectId: process.env.FIREBASE_PROJECT_ID,
//   //   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   //   privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//   // }),
//   credential: applicationDefault(),
// },
// "emerald-diary"

console.log({ firebaseApp });

export const auth = getAuth(firebaseApp);

export async function isUserAuthenticated(
  session: string | undefined = undefined
) {
  const _session = session ?? (await getSession());
  if (!_session) return false;

  try {
    const isRevoked = !(await auth.verifySessionCookie(_session, true));
    return !isRevoked;
  } catch (error) {
    console.error({ error });
    return false;
  }
}

// export async function getCurrentUser() {
//   const session = await getSession();

//   console.log({ session });

//   if (!(await isUserAuthenticated(session))) {
//     return null;
//   }

//   const decodedIdToken = await auth.verifySessionCookie(session!);
//   const currentUser = await auth.getUser(decodedIdToken.uid);

//   return currentUser;
// }

export async function getCurrentUser() {
  const headersList = headers();
  const idToken = headersList.get("authorization");
  console.log("----AUTH_TOKEN------", { idToken });

  if (!idToken) throw new Error("Invalid Auth Token");

  return await auth.verifyIdToken(idToken);
}

async function getSession() {
  try {
    return cookies().get("__session")?.value;
  } catch (error) {
    return undefined;
  }
}

export async function createSessionCookie(
  idToken: string,
  sessionCookieOptions: SessionCookieOptions
) {
  return auth.createSessionCookie(idToken, sessionCookieOptions);
}

export async function revokeAllSessions(session: string) {
  const decodedIdToken = await auth.verifySessionCookie(session);

  return await auth.revokeRefreshTokens(decodedIdToken.sub);
}
