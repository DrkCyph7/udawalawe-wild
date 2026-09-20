import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  orderBy,
  serverTimestamp,
  getDoc
} from "firebase/firestore";
import type { GeoInfo } from "@/lib/geo";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(firebaseConfig.projectId);

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const adminEmailAllowList = (
  process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "admin@udawalawe-wild.com"
)
  .split(",")
  .map((email: string) => email.trim().toLowerCase())
  .filter(Boolean);

export type BookingEnquiryRow = {
  id?: string;
  created_at?: string;
  updated_at?: string;
  guest_name: string;
  guest_email: string;
  guest_whatsapp: string; // optional in UI — stored as empty string when blank
  guest_hotel?: string | null;
  guest_country?: string | null; // country name, e.g. "Germany"
  guest_country_code?: string | null; // ISO code, e.g. "DE"
  guest_ip?: string | null;
  guest_city?: string | null;
  guest_timezone?: string | null;
  safari_date?: string | null;
  adults: number;
  children: number;
  safari_type?: string | null;
  pickup_location?: string | null;
  dropoff_location?: string | null;
  special_requests?: string | null;
  status?: string;
  assigned_partner?: string | null;
  internal_notes?: string | null;
  quoted_amount?: number | null;
  quoted_currency?: string | null;
};

export type AuthUser = {
  id: string;
  email: string | null;
};

export async function createBookingEnquiry(values: Record<string, string>, geo?: GeoInfo | null) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* environment variables.");
  }

  const payload = {
    guest_name: values.name ?? values.guest_name ?? "",
    guest_email: values.email ?? values.guest_email ?? "",
    guest_whatsapp: values.whatsapp ?? values.guest_whatsapp ?? "",
    guest_hotel: values.hotel ?? values.guest_hotel ?? null,
    guest_country: geo?.country_name ?? values.country ?? values.guest_country ?? null,
    guest_country_code: geo?.country_code ?? null,
    guest_ip: geo?.ip ?? null,
    guest_city: geo?.city ?? null,
    guest_timezone: geo?.timezone ?? null,
    safari_date: values.date ?? null,
    adults: Number(values.adults ?? 2) || 2,
    children: Number(values.children ?? 0) || 0,
    safari_type: values.type ?? null,
    pickup_location: values.pickup ?? null,
    dropoff_location: values.dropoff ?? null,
    special_requests: values.notes ?? values.special_requests ?? null,
    status: "new",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  try {
    await addDoc(collection(db, "booking_enquiries"), payload);
  } catch (error: any) {
    console.error("Firebase insert error:", error);
    throw new Error(error.message || "Failed to create booking enquiry.");
  }
}

export async function fetchBookingEnquiries() {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured.");
  }

  try {
    const q = query(collection(db, "booking_enquiries"), orderBy("created_at", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BookingEnquiryRow[];
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch booking enquiries.");
  }
}

export async function updateBookingStatus(id: string, status: string) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured.");
  }

  try {
    const enquiryRef = doc(db, "booking_enquiries", id);
    await updateDoc(enquiryRef, { 
      status,
      updated_at: new Date().toISOString()
    });
  } catch (error: any) {
    throw new Error(error.message || "Failed to update booking status.");
  }
}

export async function isAdminUser(user: AuthUser | null) {
  if (!user) {
    return false;
  }

  const email = user.email?.toLowerCase() ?? "";

  if (adminEmailAllowList.includes(email)) {
    return true;
  }

  if (!isFirebaseConfigured) {
    return false;
  }

  try {
    const userDocRef = doc(db, "profiles", user.id);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
       return userDoc.data()?.role === "admin" || userDoc.data()?.role === "superadmin";
    }
    return false;
  } catch (error) {
    return false;
  }
}
