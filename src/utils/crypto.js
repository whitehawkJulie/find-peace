// Web Crypto API utilities for optional passphrase encryption of saved sessions.
// Each session is encrypted with AES-256-GCM, key derived from the passphrase via PBKDF2.
// The passphrase is never stored — only held in React state for the current browser session.

function uint8ToBase64(arr) {
	return btoa(String.fromCharCode(...arr));
}

function base64ToUint8(b64) {
	return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

async function deriveKey(passphrase, salt) {
	const keyMaterial = await crypto.subtle.importKey(
		"raw",
		new TextEncoder().encode(passphrase),
		"PBKDF2",
		false,
		["deriveKey"],
	);
	return crypto.subtle.deriveKey(
		{ name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
		keyMaterial,
		{ name: "AES-GCM", length: 256 },
		false,
		["encrypt", "decrypt"],
	);
}

/**
 * Encrypts a session object with the given passphrase.
 * Returns a safe-to-store object with id and date in plaintext (for display),
 * and the ciphertext + salt + iv needed to decrypt.
 */
export async function encryptSession(session, passphrase) {
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const key = await deriveKey(passphrase, salt);
	const plaintext = new TextEncoder().encode(JSON.stringify(session));
	const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext);
	return {
		id: session.id,
		date: session.date,
		_encrypted: true,
		ciphertext: uint8ToBase64(new Uint8Array(ciphertext)),
		salt: uint8ToBase64(salt),
		iv: uint8ToBase64(iv),
	};
}

/**
 * Decrypts an encrypted session object. Throws "Incorrect passphrase" if the
 * passphrase is wrong or the data is corrupt.
 */
export async function decryptSession(encryptedSession, passphrase) {
	const salt = base64ToUint8(encryptedSession.salt);
	const iv = base64ToUint8(encryptedSession.iv);
	const ciphertext = base64ToUint8(encryptedSession.ciphertext);
	const key = await deriveKey(passphrase, salt);
	try {
		const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
		return JSON.parse(new TextDecoder().decode(plaintext));
	} catch {
		throw new Error("Incorrect passphrase");
	}
}

export const isEncryptedSession = (session) => session?._encrypted === true;
