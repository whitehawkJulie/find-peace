const BACKUP_TS_KEY = "findPeaceLastBackup";
const DATA_KEYS = ["findPeaceSessions", "gratitudeSessions", "findPeaceSettings"];

function readKey(key) {
	try {
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}

export function exportAllData() {
	const payload = { version: 1, exportedAt: new Date().toISOString() };
	DATA_KEYS.forEach((k) => {
		const val = readKey(k);
		if (val !== null) payload[k] = val;
	});

	const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const date = new Date().toISOString().slice(0, 10);
	const a = document.createElement("a");
	a.href = url;
	a.download = `find-peace-backup-${date}.json`;
	a.click();
	URL.revokeObjectURL(url);

	localStorage.setItem(BACKUP_TS_KEY, new Date().toISOString());
}

function parseBackupFile(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const data = JSON.parse(e.target.result);
				if (!data.version || !DATA_KEYS.some((k) => k in data)) {
					reject(new Error("This doesn't look like a find-peace backup file."));
					return;
				}
				resolve(data);
			} catch {
				reject(new Error("Couldn't read the file — is it a valid backup?"));
			}
		};
		reader.onerror = () => reject(new Error("File read failed."));
		reader.readAsText(file);
	});
}

// Overwrite: replace all keys from backup.
export async function importAllData(file) {
	const data = await parseBackupFile(file);
	DATA_KEYS.forEach((k) => {
		if (k in data) localStorage.setItem(k, JSON.stringify(data[k]));
	});
}

// Merge: add sessions from backup that don't already exist locally (by id).
// Settings are left untouched.
export async function mergeAllData(file) {
	const data = await parseBackupFile(file);
	const SESSION_KEYS = ["findPeaceSessions", "gratitudeSessions"];
	SESSION_KEYS.forEach((k) => {
		if (!(k in data)) return;
		const incoming = Array.isArray(data[k]) ? data[k] : [];
		const existing = readKey(k);
		const current = Array.isArray(existing) ? existing : [];
		const existingIds = new Set(current.map((s) => s.id));
		const toAdd = incoming.filter((s) => !existingIds.has(s.id));
		if (toAdd.length > 0) {
			localStorage.setItem(k, JSON.stringify([...current, ...toAdd]));
		}
	});
	return; // settings intentionally not touched
}

// Returns days since last backup, or null if never backed up.
export function daysSinceBackup() {
	const ts = localStorage.getItem(BACKUP_TS_KEY);
	if (!ts) return null;
	const ms = Date.now() - new Date(ts).getTime();
	return Math.floor(ms / (1000 * 60 * 60 * 24));
}
