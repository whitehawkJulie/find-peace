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

export function importAllData(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const data = JSON.parse(e.target.result);
				if (!data.version || !DATA_KEYS.some((k) => k in data)) {
					reject(new Error("This doesn't look like a find-peace backup file."));
					return;
				}
				DATA_KEYS.forEach((k) => {
					if (k in data) localStorage.setItem(k, JSON.stringify(data[k]));
				});
				resolve();
			} catch {
				reject(new Error("Couldn't read the file — is it a valid backup?"));
			}
		};
		reader.onerror = () => reject(new Error("File read failed."));
		reader.readAsText(file);
	});
}

// Returns days since last backup, or null if never backed up.
export function daysSinceBackup() {
	const ts = localStorage.getItem(BACKUP_TS_KEY);
	if (!ts) return null;
	const ms = Date.now() - new Date(ts).getTime();
	return Math.floor(ms / (1000 * 60 * 60 * 24));
}
