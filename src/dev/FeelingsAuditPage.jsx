import React, { useMemo, useState } from "react";
import AllFeelingsData from "../data/AllFeelingsData";

// ─── Flatten all feelings sections into a single array of rows ───────────────
function flattenFeelings() {
	const rows = [];
	const { sections } = AllFeelingsData;

	for (const [sectionKey, section] of Object.entries(sections)) {
		const sectionLabel = section.ui.heading;
		const sectionRegType = section.regulationType || null;

		const sortedGroups = Object.entries(section.groups).sort(
			([, a], [, b]) => (a.ui?.order || 0) - (b.ui?.order || 0),
		);

		for (const [, group] of sortedGroups) {
			const groupHeading = group.ui?.heading || "(unnamed)";
			const groupOrder = group.ui?.order || 0;
			const groupRegType = group.regulationType || null;

			for (const item of group.items) {
				const resolvedReg = item.regulationType || groupRegType || sectionRegType || null;
				rows.push({
					item: item.item,
					section: sectionLabel,
					sectionKey,
					group: groupHeading,
					groupOrder,
					description: item.description || "",
					storyHint: item.storyHint || "",
					type: item.type || "",
					feelingType: item.feelingType || "",
					ruptureType: item.ruptureType || "",
					regulationType: Array.isArray(resolvedReg) ? resolvedReg.join(", ") : resolvedReg || "",
					tier: item.ui?.tier || "",
					quickPick: !!item.ui?.quickPick,
					interpretationHint: item.interpretationHint || "",
					hasClarify: !!item.clarify,
					suggestedFeelings: item.suggestedFeelings || [],
					suggestedNeeds: item.suggestedNeeds || [],
					empathyGuessCount: item.empathyGuesses?.length || 0,
				});
			}
		}
	}

	return rows;
}

// ─── Tier display ─────────────────────────────────────────────────────────────
function tierLabel(row) {
	if (row.quickPick) return "Quick";
	if (row.tier === "more") return "Full only";
	return "Short+";
}

function tierColor(row) {
	if (row.quickPick) return { background: "#d1fae5", color: "#065f46" };
	if (row.tier === "more") return { background: "#fef3c7", color: "#92400e" };
	return { background: "#e0e7ff", color: "#3730a3" };
}

// ─── Sort helper ──────────────────────────────────────────────────────────────
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

// ─── Styles ───────────────────────────────────────────────────────────────────
const cellStyle = {
	padding: "8px 12px",
	borderBottom: "1px solid rgba(0,0,0,0.08)",
	verticalAlign: "top",
};
const smallCellStyle = {
	...cellStyle,
	fontSize: "0.8em",
	color: "#444",
	lineHeight: 1.45,
};
const COL_COUNT = 7;

// ─── Section header colours ───────────────────────────────────────────────────
const SECTION_COLORS = {
	feelings: { bg: "#c8bfb4", text: "#2c1a0a" },
	story: { bg: "#b4c2c8", text: "#0a1f2c" },
	feelingsMet: { bg: "#b4c8bc", text: "#0a2c18" },
};

// ─── Natural group order (preserves data file order for grouping) ─────────────
function buildNaturalOrder(rows) {
	const seen = new Set();
	const result = [];
	for (const row of rows) {
		const key = `${row.sectionKey}::${row.group}`;
		if (!seen.has(key)) {
			seen.add(key);
			result.push({ sectionKey: row.sectionKey, section: row.section, group: row.group });
		}
	}
	return result;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function FeelingsAuditPage() {
	const allRows = useMemo(() => flattenFeelings(), []);
	const naturalOrder = useMemo(() => buildNaturalOrder(allRows), [allRows]);

	const [q, setQ] = useState("");
	const [sectionFilter, setSectionFilter] = useState("All");
	const [groupFilter, setGroupFilter] = useState("All");
	const [typeFilter, setTypeFilter] = useState("All");
	const [regFilter, setRegFilter] = useState("All");
	const [tierFilter, setTierFilter] = useState("All");
	const [missingOnly, setMissingOnly] = useState(false);
	const [sortKey, setSortKey] = useState(null); // null = natural order
	const [sortDir, setSortDir] = useState("asc");

	const sections = useMemo(() => ["All", ...new Set(allRows.map((r) => r.section))], [allRows]);

	const groups = useMemo(() => {
		const seen = new Set();
		const result = ["All"];
		for (const r of allRows) {
			if ((sectionFilter === "All" || r.section === sectionFilter) && !seen.has(r.group)) {
				seen.add(r.group);
				result.push(r.group);
			}
		}
		return result;
	}, [allRows, sectionFilter]);

	const types = useMemo(
		() => ["All", ...Array.from(new Set(allRows.map((r) => r.type).filter(Boolean))).sort()],
		[allRows],
	);

	const regTypes = useMemo(() => {
		const set = new Set();
		allRows.forEach((r) =>
			r.regulationType
				.split(", ")
				.filter(Boolean)
				.forEach((x) => set.add(x)),
		);
		return ["All", ...Array.from(set).sort()];
	}, [allRows]);

	const filtered = useMemo(() => {
		const qLower = q.trim().toLowerCase();
		return allRows.filter((r) => {
			if (sectionFilter !== "All" && r.section !== sectionFilter) return false;
			if (groupFilter !== "All" && r.group !== groupFilter) return false;
			if (typeFilter !== "All" && r.type !== typeFilter) return false;
			if (regFilter !== "All" && !r.regulationType.split(", ").includes(regFilter)) return false;
			if (tierFilter === "Quick" && !r.quickPick) return false;
			if (tierFilter === "Full only" && r.tier !== "more") return false;
			if (tierFilter === "Short+" && (r.quickPick || r.tier === "more")) return false;
			if (missingOnly) {
				const missingDesc = !r.description && !r.storyHint;
				const missingType = !r.type;
				const missingReg = r.sectionKey !== "story" && !r.regulationType;
				if (!(missingDesc || missingType || missingReg)) return false;
			}
			if (qLower) {
				const haystack = [
					r.item,
					r.section,
					r.group,
					r.description,
					r.storyHint,
					r.type,
					r.feelingType,
					r.ruptureType,
					r.regulationType,
					r.interpretationHint,
					r.suggestedFeelings.join(" "),
					r.suggestedNeeds.join(" "),
				]
					.filter(Boolean)
					.join(" ")
					.toLowerCase();
				if (!haystack.includes(qLower)) return false;
			}
			return true;
		});
	}, [allRows, q, sectionFilter, groupFilter, typeFilter, regFilter, tierFilter, missingOnly]);

	const sorted = useMemo(
		() => (sortKey ? sortByKey(filtered, sortKey, sortDir) : filtered),
		[filtered, sortKey, sortDir],
	);

	// Group sorted rows by sectionKey→group in natural data order
	const groupedSorted = useMemo(() => {
		const result = [];
		for (const { sectionKey, section, group } of naturalOrder) {
			const rows = sorted.filter((r) => r.sectionKey === sectionKey && r.group === group);
			if (rows.length > 0) result.push({ sectionKey, section, group, rows });
		}
		return result;
	}, [naturalOrder, sorted]);

	const toggleSort = (key) => {
		if (sortKey === key) {
			setSortDir((d) => (d === "asc" ? "desc" : "asc"));
		} else {
			setSortKey(key);
			setSortDir("asc");
		}
	};

	const [copyLabel, setCopyLabel] = useState("Copy feelings list");

	const copyFeelingsList = () => {
		const lines = [];
		let lastSection = null;
		for (const { section, group, rows: groupRows } of groupedSorted) {
			if (section !== lastSection) {
				if (lastSection !== null) lines.push("");
				lines.push(section.toUpperCase());
				lastSection = section;
			}
			lines.push(`  ${group}`);
			for (const r of groupRows) {
				lines.push(`    ${r.item}`);
			}
		}
		navigator.clipboard.writeText(lines.join("\n")).then(() => {
			setCopyLabel("Copied!");
			setTimeout(() => setCopyLabel("Copy feelings list"), 2000);
		});
	};

	return (
		<div style={{ padding: 16, maxWidth: 1800, margin: "0 auto" }}>
			<h2 style={{ marginBottom: 8 }}>Feelings Audit</h2>

			{/* ── Toolbar ── */}
			<div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>
				<input
					value={q}
					onChange={(e) => setQ(e.target.value)}
					placeholder="Search…"
					style={{ padding: "8px 10px", minWidth: 220 }}
				/>
				<select
					value={sectionFilter}
					onChange={(e) => {
						setSectionFilter(e.target.value);
						setGroupFilter("All");
					}}
					style={{ padding: 8 }}>
					{sections.map((x) => (
						<option key={x} value={x}>
							{x}
						</option>
					))}
				</select>
				<select value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)} style={{ padding: 8 }}>
					{groups.map((x) => (
						<option key={x} value={x}>
							{x}
						</option>
					))}
				</select>
				<select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={{ padding: 8 }}>
					{types.map((x) => (
						<option key={x} value={x}>
							type: {x}
						</option>
					))}
				</select>
				<select value={regFilter} onChange={(e) => setRegFilter(e.target.value)} style={{ padding: 8 }}>
					{regTypes.map((x) => (
						<option key={x} value={x}>
							reg: {x}
						</option>
					))}
				</select>
				<select value={tierFilter} onChange={(e) => setTierFilter(e.target.value)} style={{ padding: 8 }}>
					{["All", "Quick", "Short+", "Full only"].map((x) => (
						<option key={x} value={x}>
							tier: {x}
						</option>
					))}
				</select>
				<label style={{ display: "flex", gap: 6, alignItems: "center" }}>
					<input type="checkbox" checked={missingOnly} onChange={(e) => setMissingOnly(e.target.checked)} />
					Missing only
				</label>
				<button
					onClick={() => setSortKey(null)}
					style={{
						padding: "7px 10px",
						background: sortKey ? "#eee" : "#555",
						color: sortKey ? "#333" : "white",
						border: "none",
						borderRadius: 6,
						cursor: "pointer",
						fontSize: "0.82em",
						float: "none",
					}}>
					Natural order
				</button>
				<div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
					<span style={{ opacity: 0.8 }}>
						Showing <strong>{sorted.length}</strong> of {allRows.length}
					</span>
					<button
						onClick={copyFeelingsList}
						style={{
							padding: "7px 14px",
							background: copyLabel === "Copied!" ? "#4a7c59" : "#555",
							color: "white",
							border: "none",
							borderRadius: 6,
							cursor: "pointer",
							fontSize: "0.85em",
							fontWeight: 600,
							float: "none",
						}}>
						{copyLabel}
					</button>
				</div>
			</div>

			{/* ── Table ── */}
			<div
				style={{
					border: "1px solid rgba(0,0,0,0.12)",
					borderRadius: 10,
					overflow: "hidden",
					overflowX: "auto",
				}}>
				<table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", minWidth: 1100 }}>
					<colgroup>
						<col style={{ width: "130px" }} />
						<col style={{ width: "160px" }} />
						<col style={{ width: "90px" }} />
						<col style={{ width: "90px" }} />
						<col style={{ width: "120px" }} />
						<col style={{ width: "80px" }} />
						<col />
					</colgroup>
					<thead style={{ background: "rgba(0,0,0,0.04)" }}>
						<tr>
							{[
								["item", "Word"],
								["group", "Group"],
								["type", "Type"],
								["feelingType", "Feeling / Rupture"],
								["regulationType", "Regulation"],
								["tier", "Tier"],
								[null, "Extras"],
							].map(([key, label]) => (
								<th
									key={label}
									onClick={key ? () => toggleSort(key) : undefined}
									style={{
										textAlign: "left",
										padding: "10px 12px",
										cursor: key ? "pointer" : "default",
										userSelect: "none",
										borderBottom: "1px solid rgba(0,0,0,0.12)",
										// whiteSpace: "nowrap",
										fontWeight: 600,
									}}
									title={key ? "Click to sort" : undefined}>
									{label}
									{key && sortKey === key ? (sortDir === "asc" ? " ▲" : " ▼") : ""}
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
							groupedSorted.map(({ sectionKey, section, group, rows: groupRows }, idx) => {
								const showSectionHeading =
									idx === 0 || groupedSorted[idx - 1].sectionKey !== sectionKey;
								const sc = SECTION_COLORS[sectionKey] || { bg: "#ccc", text: "#000" };
								return (
									<React.Fragment key={`${sectionKey}::${group}`}>
										{showSectionHeading && (
											<tr style={{ background: sc.bg }}>
												<td
													colSpan={COL_COUNT}
													style={{
														padding: "7px 12px",
														fontWeight: 700,
														fontSize: "0.8em",
														letterSpacing: "0.08em",
														textTransform: "uppercase",
														color: sc.text,
													}}>
													{section}
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
												{group}
											</td>
										</tr>
										{groupRows.map((r) => (
											<tr
												key={r.item}
												style={{ background: "white" }}
												onMouseEnter={(e) => (e.currentTarget.style.background = "#faf8f5")}
												onMouseLeave={(e) => (e.currentTarget.style.background = "white")}>
												{/* Word */}
												<td style={{ ...cellStyle, fontWeight: 500 }}>{r.item}</td>

												{/* Group + description */}
												<td style={smallCellStyle}>
													{r.description || r.storyHint || (
														<span style={{ opacity: 0.35 }}>—</span>
													)}
												</td>

												{/* Type */}
												<td style={smallCellStyle}>
													{r.type || <span style={{ opacity: 0.35 }}>—</span>}
												</td>

												{/* Feeling type / rupture type */}
												<td style={smallCellStyle}>
													{r.feelingType || r.ruptureType || (
														<span style={{ opacity: 0.35 }}>—</span>
													)}
												</td>

												{/* Regulation */}
												<td style={smallCellStyle}>
													{r.regulationType || <span style={{ opacity: 0.35 }}>—</span>}
												</td>

												{/* Tier badge */}
												<td style={cellStyle}>
													<span
														style={{
															...tierColor(r),
															fontSize: "0.75em",
															fontWeight: 600,
															padding: "2px 7px",
															borderRadius: 10,
															whiteSpace: "nowrap",
														}}>
														{tierLabel(r)}
													</span>
													{r.hasClarify && (
														<span
															style={{
																marginLeft: 4,
																fontSize: "0.72em",
																background: "#fde68a",
																color: "#78350f",
																padding: "2px 6px",
																borderRadius: 10,
																fontWeight: 600,
															}}>
															clarify
														</span>
													)}
												</td>

												{/* Extras */}
												<td style={{ ...smallCellStyle, fontSize: "0.78em" }}>
													{r.sectionKey === "story" ? (
														<>
															{r.suggestedFeelings.length > 0 && (
																<div>
																	<span style={{ color: "#888" }}>feelings: </span>
																	{r.suggestedFeelings.join(", ")}
																</div>
															)}
															{r.suggestedNeeds.length > 0 && (
																<div style={{ marginTop: 2 }}>
																	<span style={{ color: "#888" }}>needs: </span>
																	{r.suggestedNeeds.join(", ")}
																</div>
															)}
															{r.empathyGuessCount > 0 && (
																<div style={{ marginTop: 2, color: "#888" }}>
																	{r.empathyGuessCount} empathy guess
																	{r.empathyGuessCount !== 1 ? "es" : ""}
																</div>
															)}
														</>
													) : (
														r.interpretationHint || <span style={{ opacity: 0.35 }}>—</span>
													)}
												</td>
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
