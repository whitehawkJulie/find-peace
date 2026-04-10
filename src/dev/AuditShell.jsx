import React, { useState, lazy, Suspense } from "react";

const NeedsAuditPage = lazy(() => import("./NeedsAuditPage.jsx"));
const FeelingsAuditPage = lazy(() => import("./FeelingsAuditPage.jsx"));

const PAGES = [
	{
		id: "needs",
		label: "Needs",
		description: "All needs with whereMet, themes, core questions, and direction prompts",
		emoji: "🌱",
	},
	{
		id: "feelings",
		label: "Feelings",
		description: "All feelings and story words with type, regulation, tier, and extras",
		emoji: "💛",
	},
];

const cardStyle = {
	display: "flex",
	alignItems: "flex-start",
	gap: 16,
	padding: "20px 24px",
	background: "white",
	border: "1px solid rgba(0,0,0,0.12)",
	borderRadius: 12,
	cursor: "pointer",
	textAlign: "left",
	width: "100%",
	transition: "box-shadow 0.15s, border-color 0.15s",
	float: "none",
};

export default function AuditShell() {
	const [page, setPage] = useState(null);

	if (page === "needs") {
		return (
			<Suspense fallback={null}>
				<div>
					<button
						onClick={() => setPage(null)}
						style={{ margin: "12px 16px", padding: "6px 14px", cursor: "pointer", float: "none", background: "#eee", border: "none", borderRadius: 6, fontSize: "0.85em" }}>
						← Back to audit menu
					</button>
					<NeedsAuditPage />
				</div>
			</Suspense>
		);
	}

	if (page === "feelings") {
		return (
			<Suspense fallback={null}>
				<div>
					<button
						onClick={() => setPage(null)}
						style={{ margin: "12px 16px", padding: "6px 14px", cursor: "pointer", float: "none", background: "#eee", border: "none", borderRadius: 6, fontSize: "0.85em" }}>
						← Back to audit menu
					</button>
					<FeelingsAuditPage />
				</div>
			</Suspense>
		);
	}

	return (
		<div style={{ padding: 40, maxWidth: 560, margin: "0 auto" }}>
			<h2 style={{ marginBottom: 6 }}>Data Audit</h2>
			<p style={{ color: "#666", marginBottom: 28 }}>Choose a dataset to inspect.</p>
			<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
				{PAGES.map((p) => (
					<button
						key={p.id}
						onClick={() => setPage(p.id)}
						style={cardStyle}
						onMouseEnter={(e) => {
							e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.10)";
							e.currentTarget.style.borderColor = "rgba(0,0,0,0.25)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.boxShadow = "";
							e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
						}}>
						<span style={{ fontSize: "2rem", lineHeight: 1 }}>{p.emoji}</span>
						<div>
							<div style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 4 }}>{p.label}</div>
							<div style={{ fontSize: "0.85rem", color: "#666" }}>{p.description}</div>
						</div>
					</button>
				))}
			</div>
		</div>
	);
}
