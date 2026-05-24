/**
 * FIREBASE INTEGRATION - EMERGENCY STABILITY FIX
 * Mengelola koneksi Firestore untuk RSVP dan Wedding Wish secara tangguh.
 * Jika kredensial Firebase bernilai dummy/belum diset, sistem otomatis beralih ke Mode Fallback Lokal (LocalStorage).
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    onSnapshot, 
    query, 
    orderBy, 
    serverTimestamp,
    limit,
    startAfter,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// 1. Deteksi Kredensial Dummy / Placeholder
const isDummyConfig = !CONFIG.firebaseConfig || 
                      CONFIG.firebaseConfig.apiKey === "YOUR_API_KEY" || 
                      CONFIG.firebaseConfig.projectId === "YOUR_PROJECT_ID" ||
                      CONFIG.firebaseConfig.apiKey === "";

let db = null;
let rsvpCol = null;
let wishesCol = null;

if (!isDummyConfig) {
    try {
        const app = initializeApp(CONFIG.firebaseConfig);
        db = getFirestore(app);
        rsvpCol = collection(db, "rsvp");
        wishesCol = collection(db, "wishes");
        console.log("Firebase initialized successfully in Live Mode.");
    } catch (e) {
        console.error("Failed to initialize Firebase Live, switching to Local Fallback Mode:", e);
    }
} else {
    console.warn("Using placeholder Firebase credentials. System switched to Local Fallback Mode (LocalStorage).");
}

// 2. Data Benih (Seed Data) Untuk Kenyamanan Visual Maksimal
const defaultWishes = [
    {
        name: "Sarah & Budi",
        message: "Selamat ya Shania & Fauzan! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin ya Allah.",
        timestamp: new Date().toISOString()
    },
    {
        name: "Ustadz Ahmad",
        message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair. Selamat menempuh hidup baru!",
        timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
        name: "Rian (Teman Kantor)",
        message: "Happy wedding Shania & Fauzan! Ikut seneng banget ngeliat kalian akhirnya melangkah ke pelaminan. Semoga langgeng terus ya!",
        timestamp: new Date(Date.now() - 7200000).toISOString()
    },
    {
        name: "Tante Linda & Om Heru",
        message: "Selamat menempuh bahtera rumah tangga baru. Semoga cinta kalian terus mekar dan bersemi selamanya.",
        timestamp: new Date(Date.now() - 14400000).toISOString()
    }
];

const defaultRSVP = [
    { name: "Sarah & Budi", status: "Hadir", count: "2" },
    { name: "Rian", status: "Hadir", count: "1" },
    { name: "Ustadz Ahmad", status: "Hadir", count: "1" },
    { name: "Tante Linda", status: "Hadir", count: "2" },
    { name: "Andi", status: "Mungkin", count: "1" },
    { name: "Rani", status: "Tidak Hadir", count: "1" }
];

// Helper LocalStorage
function getLocalData(key, defaultData) {
    const val = localStorage.getItem(key);
    if (!val) {
        localStorage.setItem(key, JSON.stringify(defaultData));
        return defaultData;
    }
    try {
        return JSON.parse(val);
    } catch(e) {
        return defaultData;
    }
}

function saveLocalData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// 3. Listener Registry untuk Mode Fallback Lokal
const localListeners = {
    rsvp: null,
    wishes: []
};

function triggerRSVPListener() {
    if (localListeners.rsvp) {
        const rsvps = getLocalData("wedding_rsvp", defaultRSVP);
        let stats = { Hadir: 0, "Tidak Hadir": 0, Mungkin: 0 };
        rsvps.forEach((item) => {
            if (stats[item.status] !== undefined) {
                stats[item.status] += parseInt(item.count || 1);
            }
        });
        localListeners.rsvp(stats);
    }
}

function triggerWishesListeners() {
    const wishes = getLocalData("wedding_wishes", defaultWishes);
    localListeners.wishes.forEach(cb => cb(wishes.slice(0, 50)));
}

// 4. Implementasi Tangguh API Ekspor
let lastVisible = null;

export async function saveRSVP(data) {
    if (db) {
        try {
            await addDoc(rsvpCol, {
                ...data,
                timestamp: serverTimestamp()
            });
            return true;
        } catch (e) {
            console.error("Error adding RSVP to Live Firestore: ", e);
            return false;
        }
    } else {
        const rsvps = getLocalData("wedding_rsvp", defaultRSVP);
        rsvps.push({ ...data, timestamp: new Date().toISOString() });
        saveLocalData("wedding_rsvp", rsvps);
        triggerRSVPListener();
        return true;
    }
}

export function listenRSVP(callback) {
    if (db) {
        return onSnapshot(rsvpCol, (snapshot) => {
            let stats = { Hadir: 0, "Tidak Hadir": 0, Mungkin: 0 };
            snapshot.forEach((doc) => {
                const data = doc.data();
                if (stats[data.status] !== undefined) {
                    stats[data.status] += parseInt(data.count || 1);
                }
            });
            callback(stats);
        });
    } else {
        localListeners.rsvp = callback;
        triggerRSVPListener();
        return () => { localListeners.rsvp = null; };
    }
}

export async function saveWish(data) {
    if (db) {
        try {
            await addDoc(wishesCol, {
                ...data,
                timestamp: serverTimestamp()
            });
            return true;
        } catch (e) {
            console.error("Error adding Wish to Live Firestore: ", e);
            return false;
        }
    } else {
        const wishes = getLocalData("wedding_wishes", defaultWishes);
        wishes.unshift({ ...data, timestamp: new Date().toISOString() });
        saveLocalData("wedding_wishes", wishes);
        triggerWishesListeners();
        return true;
    }
}

export function listenWishes(callback) {
    if (db) {
        const q = query(wishesCol, orderBy("timestamp", "desc"), limit(50));
        return onSnapshot(q, (snapshot) => {
            const wishes = snapshot.docs.map(doc => doc.data());
            callback(wishes);
        });
    } else {
        localListeners.wishes.push(callback);
        const wishes = getLocalData("wedding_wishes", defaultWishes);
        callback(wishes.slice(0, 50));
        return () => {
            localListeners.wishes = localListeners.wishes.filter(cb => cb !== callback);
        };
    }
}

export async function getWishes(isNext = true) {
    if (db) {
        let q;
        if (isNext && lastVisible) {
            q = query(wishesCol, orderBy("timestamp", "desc"), startAfter(lastVisible), limit(5));
        } else {
            q = query(wishesCol, orderBy("timestamp", "desc"), limit(5));
        }

        const documentSnapshots = await getDocs(q);
        lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        
        return documentSnapshots.docs.map(doc => doc.data());
    } else {
        const wishes = getLocalData("wedding_wishes", defaultWishes);
        return wishes.slice(0, 5);
    }
}
