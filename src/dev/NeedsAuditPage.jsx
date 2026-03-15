import React, { useMemo, useState } from "react";
import allNeeds from "../data/AllNeedsFlat";

function sortByKey(rows, key, dir) {
	const mult = dir === "asc" ? 1 : -1;
	return [...rows].sort((a, b) => {
		const av = a?.[key];
		const bv = b?.[key];
		const aStr = Array.isArray(av) ? av.join(", ") : String(av ?? "");
		const bStr = Array.isArray(bv) ? bv.join(", ") : String(bv ?? "");
		return aStr.localeCompare(bStr, undefined, { sensitivity: "base" }) * mult;
	});
}

// Flatten tags for sort/filter by converting arrays to strings
function flattenedRow(need) {
	return {
		...need,
		whereMetStr: (need.tags?.whereMet ?? []).join(", "),
		themesStr: (need.tags?.themes ?? []).join(", "),
		diffQ0: need.differentiationQuestions?.[0] ?? "",
		diffQ1: need.differentiationQuestions?.[1] ?? "",
	};
}

const COL_COUNT = 6;

const cellStyle = {
	padding: "8px 12px",
	borderBottom: "1px solid rgba(0,0,0,0.08)",
	verticalAlign: "top",
};
const qCellStyle = {
	...cellStyle,
	fontSize: "0.82em",
	color: "#333",
	lineHeight: 1.45,
};

export default function NeedsAuditPage() {
	const allRows = useMemo(() => allNeeds.map(flattenedRow), []);

	const [q, setQ] = useState("");
	const [family, setFamily] = useState("All");
	const [category, setCategory] = useState("All");
	const [whereMetFilter, setWhereMetFilter] = useState("All");
	const [themeFilter, setThemeFilter] = useState("All");
	const [missingOnly, setMissingOnly] = useState(false);
	const [sortKey, setSortKey] = useState("label");
	const [sortDir, setSortDir] = useState("asc");

	const families = useMemo(() => {
		const seen = new Set();
		const result = ["All"];
		for (const r of allRows) {
			if (r.family && !seen.has(r.family)) {
				seen.add(r.family);
				result.push(r.family);
			}
		}
		return result;
	}, [allRows]);

	const categories = useMemo(() => {
		const seen = new Set();
		const result = ["All"];
		for (const r of allRows) {
			if ((family === "All" || r.family === family) && r.category && !seen.has(r.category)) {
				seen.add(r.category);
				result.push(r.category);
			}
		}
		return result;
	}, [allRows, family]);

	const whereMetOptions = useMemo(() => {
		const set = new Set();
		allRows.forEach((r) => (r.tags?.whereMet ?? []).forEach((x) => set.add(x)));
		return ["All", ...Array.from(set).sort()];
	}, [allRows]);

	const themeOptions = useMemo(() => {
		const set = new Set();
		allRows.forEach((r) => (r.tags?.themes ?? []).forEach((x) => set.add(x)));
		return ["All", ...Array.from(set).sort()];
	}, [allRows]);

	// Natural order of family→category pairs (drives heading rows)
	const orderedGroups = useMemo(() => {
		const seen = new Set();
		const result = [];
		for (const row of allRows) {
			const key = `${row.family}::${row.category}`;
			if (!seen.has(key)) {
				seen.add(key);
				result.push({ family: row.family, category: row.category });
			}
		}
		return result;
	}, [allRows]);

	const filtered = useMemo(() => {
		const qLower = q.trim().toLowerCase();
		return allRows.filter((r) => {
			if (family !== "All" && r.family !== family) return false;
			if (category !== "All" && r.category !== category) return false;
			if (whereMetFilter !== "All" && !(r.tags?.whereMet ?? []).includes(whereMetFilter)) return false;
			if (themeFilter !== "All" && !(r.tags?.themes ?? []).includes(themeFilter)) return false;
			if (missingOnly) {
				const missingWhereMet = !r.tags?.whereMet?.length;
				const missingThemes = !r.tags?.themes?.length;
				const missingCore = !r.coreQuestion;
				if (!(missingWhereMet || missingThemes || missingCore)) return false;
			}
			if (qLower) {
				const haystack = [
					r.label,
					r.family,
					r.category,
					r.whereMetStr,
					r.themesStr,
					r.coreQuestion,
					r.diffQ0,
					r.diffQ1,
					r.helpText,
				]
					.filter(Boolean)
					.join(" ")
					.toLowerCase();
				if (!haystack.includes(qLower)) return false;
			}
			return true;
		});
	}, [allRows, q, family, category, whereMetFilter, themeFilter, missingOnly]);

	const sorted = useMemo(() => sortByKey(filtered, sortKey, sortDir), [filtered, sortKey, sortDir]);

	// Group sorted rows by family→category in natural data order
	const groupedSorted = useMemo(() => {
		const result = [];
		for (const { family: fam, category: cat } of orderedGroups) {
			const rows = sorted.filter((r) => r.family === fam && r.category === cat);
			if (rows.length > 0) result.push({ family: fam, category: cat, rows });
		}
		return result;
	}, [orderedGroups, sorted]);

	const toggleSort = (key) => {
		if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
		else {
			setSortKey(key);
			setSortDir("asc");
		}
	};

	return (
		<div style={{ padding: 16, maxWidth: 1600, margin: "0 auto" }}>
			<h2 style={{ marginBottom: 8 }}>Needs Audit</h2>
			<div
				style={{
					display: "flex",
					gap: 8,
					flexWrap: "wrap",
					alignItems: "center",
					marginBottom: 12,
				}}>
				<input
					value={q}
					onChange={(e) => setQ(e.target.value)}
					placeholder="Search…"
					style={{ padding: "8px 10px", minWidth: 220 }}
				/>
				<select
					value={family}
					onChange={(e) => {
						setFamily(e.target.value);
						setCategory("All");
					}}
					style={{ padding: 8 }}>
					{families.map((x) => (
						<option key={x} value={x}>
							{x}
						</option>
					))}
				</select>
				<select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: 8 }}>
					{categories.map((x) => (
						<option key={x} value={x}>
							{x}
						</option>
					))}
				</select>
				<select value={whereMetFilter} onChange={(e) => setWhereMetFilter(e.target.value)} style={{ padding: 8 }}>
					{whereMetOptions.map((x) => (
						<option key={x} value={x}>
							whereMet: {x}
						</option>
					))}
				</select>
				<select value={themeFilter} onChange={(e) => setThemeFilter(e.target.value)} style={{ padding: 8 }}>
					{themeOptions.map((x) => (
						<option key={x} value={x}>
							theme: {x}
						</option>
					))}
				</select>
				<label style={{ display: "flex", gap: 6, alignItems: "center" }}>
					<input
						type="checkbox"
						checked={missingOnly}
						onChange={(e) => setMissingOnly(e.target.checked)}
					/>
					Missing only
				</label>
				<div style={{ marginLeft: "auto", opacity: 0.8 }}>
					Showing <strong>{sorted.length}</strong> of {allRows.length}
				</div>
			</div>

			<div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 10, overflow: "hidden" }}>
				<table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
					<colgroup>
						<col style={{ width: "140px" }} />
						<col style={{ width: "160px" }} />
						<col style={{ width: "190px" }} />
						<col />
						<col />
						<col />
					</colgroup>
					<thead style={{ background: "rgba(0,0,0,0.04)" }}>
						<tr>
							{[
								["label", "Need"],
								["whereMetStr", "whereMet"],
								["themesStr", "themes"],
								["coreQuestion", "Core question"],
								["diffQ0", "Diff. question 1"],
								["diffQ1", "Diff. question 2"],
							].map(([key, label]) => (
								<th
									key={key}
									onClick={() => toggleSort(key)}
									style={{
										textAlign: "left",
										padding: "10px 12px",
										cursor: "pointer",
										userSelect: "none",
										borderBottom: "1px solid rgba(0,0,0,0.12)",
										whiteSpace: "nowrap",
										fontWeight: 600,
									}}
									title="Click to sort">
									{label}
									{sortKey === key ? (sortDir === "asc" ? " ▲" : " ▼") : ""}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{groupedSorted.length === 0 ? (
							<tr>
								<td colSpan={COL_COUNT} style={{ padding: 14, opacity: 0.75 }}>
									No matches.
								</td>
							</tr>
						) : (
							groupedSorted.map(({ family: fam, category: cat, rows: groupRows }, idx) => {
								const showFamilyHeading =
									idx === 0 || groupedSorted[idx - 1].family !== fam;
								return (
									<React.Fragment key={`${fam}::${cat}`}>
										{showFamilyHeading && (
											<tr style={{ background: "#b8b0a4" }}>
												<td
													colSpan={COL_COUNT}
													style={{
														padding: "7px 12px",
														fontWeight: 700,
														fontSize: "0.8em",
														letterSpacing: "0.08em",
														textTransform: "uppercase",
													}}>
													{fam}
												</td>
											</tr>
										)}
										<tr style={{ background: "#ddd8d0" }}>
											<td
												colSpan={COL_COUNT}
												style={{
													padding: "5px 12px 5px 22px",
													fontWeight: 600,
													fontSize: "0.88em",
												}}>
												{cat}
											</td>
										</tr>
										{groupRows.map((r) => (
											<tr
												key={r.label}
												style={{ background: "white" }}
												onMouseEnter={(e) =>
													(e.currentTarget.style.background = "#faf8f5")
												}
												onMouseLeave={(e) =>
													(e.currentTarget.style.background = "white")
												}>
												<td style={{ ...cellStyle, fontWeight: 500 }}>{r.label}</td>
												<td style={{ ...cellStyle, fontSize: "0.8em", color: "#555" }}>
													{r.whereMetStr}
												</td>
												<td style={{ ...cellStyle, fontSize: "0.8em", color: "#555" }}>
													{r.themesStr}
												</td>
												<td style={qCellStyle}>{r.coreQuestion}</td>
												<td style={qCellStyle}>{r.diffQ0}</td>
												<td style={qCellStyle}>{r.diffQ1}</td>
											</tr>
										))}
									</React.Fragment>
								);
							})
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
