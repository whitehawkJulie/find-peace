import React, { useMemo, useState } from "react";
import NeedsSubsistence from "../data/NeedsSubsistence.js";
import NeedsConnection from "../data/NeedsConnection.js";
import NeedsMeaning from "../data/NeedsMeaning.js";
import NeedsFreedom from "../data/NeedsFreedom.js";
import { resolveNeedUnpackingType, resolveNeedWhereMet, getNeedData } from "../utils/renderHelpers";
import { UNPACKING_TYPE, unpackingTypeData } from "../data/unpackingTypeData";
import { whereMetLabels } from "../data/whereMetData";

const PRACTICAL = UNPACKING_TYPE.PRACTICAL;

function getDifferentiationQ(needName) {
	const resolvedTypes = resolveNeedUnpackingType(needName);
	const nonPractical = resolvedTypes.filter((t) => t !== PRACTICAL);
	if (nonPractical.length < 2) return "";
	const hintA = unpackingTypeData[nonPractical[0]]?.discriminationHint;
	const hintB = unpackingTypeData[nonPractical[1]]?.discriminationHint;
	if (!hintA || !hintB) return "";
	return `Is this more about ${hintA} — or about ${hintB}?`;
}

function getWhereMetQ(needName) {
	const hints = resolveNeedWhereMet(needName).map((w) => whereMetLabels[w]).filter(Boolean);
	if (hints.length < 2) return "";
	const last = hints[hints.length - 1];
	const rest = hints.slice(0, -1);
	return `Where would you most hope to find this met — ${rest.join(", ")}, or ${last}?`;
}

function getAllNeedsFlat() {
	const sections = [
		{ data: NeedsSubsistence, category: "Subsistence" },
		{ data: NeedsConnection, category: "Connection" },
		{ data: NeedsMeaning, category: "Meaning" },
		{ data: NeedsFreedom, category: "Freedom" },
	];
	const rows = [];
	for (const { data, category } of sections) {
		for (const [groupKey, group] of Object.entries(data.groups)) {
			for (const item of group.items) {
				if (!item.item) continue; // skip empty placeholder objects
				rows.push({
					name: item.item,
					category,
					group: group.ui?.heading ?? groupKey,
					whereMet: item.whereMet ?? group.whereMet ?? [],
					unpackingType: resolveNeedUnpackingType(item.item),
					coreQuestion:
						getNeedData(item.item)?.clarify?.prompts?.find((p) => p.key === "core_specific")
							?.question ?? "",
					differentiationQ: getDifferentiationQ(item.item),
					whereMetQ: getWhereMetQ(item.item),
				});
			}
		}
	}
	return rows;
}

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
	const allRows = useMemo(() => getAllNeedsFlat(), []);
	const [q, setQ] = useState("");
	const [category, setCategory] = useState("All");
	const [group, setGroup] = useState("All");
	const [whereMet, setWhereMet] = useState("All");
	const [unpackingType, setUnpackingType] = useState("All");
	const [missingOnly, setMissingOnly] = useState(false);
	const [sortKey, setSortKey] = useState("name");
	const [sortDir, setSortDir] = useState("asc");

	// Keep natural data order for filter dropdowns
	const categories = useMemo(() => {
		const seen = new Set();
		const result = ["All"];
		for (const r of allRows) {
			if (r.category && !seen.has(r.category)) {
				seen.add(r.category);
				result.push(r.category);
			}
		}
		return result;
	}, [allRows]);

	const groups = useMemo(() => {
		const seen = new Set();
		const result = ["All"];
		for (const r of allRows) {
			if ((category === "All" || r.category === category) && r.group && !seen.has(r.group)) {
				seen.add(r.group);
				result.push(r.group);
			}
		}
		return result;
	}, [allRows, category]);

	const whereMetOptions = useMemo(() => {
		const set = new Set();
		allRows.forEach((r) => (r.whereMet || []).forEach((x) => set.add(x)));
		return ["All", ...Array.from(set).sort()];
	}, [allRows]);

	const unpackingOptions = useMemo(() => {
		const set = new Set();
		allRows.forEach((r) => (r.unpackingType || []).forEach((x) => set.add(x)));
		return ["All", ...Array.from(set).sort()];
	}, [allRows]);

	// Natural order of category→group pairs (drives heading rows)
	const orderedGroups = useMemo(() => {
		const seen = new Set();
		const result = [];
		for (const row of allRows) {
			const key = `${row.category}::${row.group}`;
			if (!seen.has(key)) {
				seen.add(key);
				result.push({ category: row.category, group: row.group });
			}
		}
		return result;
	}, [allRows]);

	const filtered = useMemo(() => {
		const qLower = q.trim().toLowerCase();
		return allRows.filter((r) => {
			if (category !== "All" && r.category !== category) return false;
			if (group !== "All" && r.group !== group) return false;
			if (whereMet !== "All" && !(r.whereMet || []).includes(whereMet)) return false;
			if (unpackingType !== "All" && !(r.unpackingType || []).includes(unpackingType)) return false;
			if (missingOnly) {
				const missingWhereMet = !r.whereMet || r.whereMet.length === 0;
				const missingUnpacking = !r.unpackingType || r.unpackingType.length === 0;
				if (!(missingWhereMet || missingUnpacking)) return false;
			}
			if (qLower) {
				const haystack = [
					r.name,
					r.category,
					r.group,
					(r.whereMet || []).join(" "),
					(r.unpackingType || []).join(" "),
					r.coreQuestion,
					r.differentiationQ,
				]
					.filter(Boolean)
					.join(" ")
					.toLowerCase();
				if (!haystack.includes(qLower)) return false;
			}
			return true;
		});
	}, [allRows, q, category, group, whereMet, unpackingType, missingOnly]);

	const sorted = useMemo(() => sortByKey(filtered, sortKey, sortDir), [filtered, sortKey, sortDir]);

	// Group sorted rows by category→group in natural data order
	const groupedSorted = useMemo(() => {
		const result = [];
		for (const { category: cat, group: grp } of orderedGroups) {
			const rows = sorted.filter((r) => r.category === cat && r.group === grp);
			if (rows.length > 0) result.push({ category: cat, group: grp, rows });
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
		<div style={{ padding: 16, maxWidth: 1400, margin: "0 auto" }}>
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
					value={category}
					onChange={(e) => {
						setCategory(e.target.value);
						setGroup("All");
					}}
					style={{ padding: 8 }}>
					{categories.map((x) => (
						<option key={x} value={x}>
							{x}
						</option>
					))}
				</select>
				<select value={group} onChange={(e) => setGroup(e.target.value)} style={{ padding: 8 }}>
					{groups.map((x) => (
						<option key={x} value={x}>
							{x}
						</option>
					))}
				</select>
				<select value={whereMet} onChange={(e) => setWhereMet(e.target.value)} style={{ padding: 8 }}>
					{whereMetOptions.map((x) => (
						<option key={x} value={x}>
							whereMet: {x}
						</option>
					))}
				</select>
				<select
					value={unpackingType}
					onChange={(e) => setUnpackingType(e.target.value)}
					style={{ padding: 8 }}>
					{unpackingOptions.map((x) => (
						<option key={x} value={x}>
							unpackingType: {x}
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
						<col style={{ width: "120px" }} />
						<col style={{ width: "190px" }} />
						<col />
						<col />
						<col />
					</colgroup>
					<thead style={{ background: "rgba(0,0,0,0.04)" }}>
						<tr>
							{[
								["name", "Need"],
								["whereMet", "whereMet"],
								["unpackingType", "unpackingType"],
								["coreQuestion", "Core question"],
								["differentiationQ", "Differentiation question"],
								["whereMetQ", "WhereMet question"],
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
							groupedSorted.map(({ category: cat, group: grp, rows: groupRows }, idx) => {
								const showCategoryHeading =
									idx === 0 || groupedSorted[idx - 1].category !== cat;
								return (
									<React.Fragment key={`${cat}::${grp}`}>
										{showCategoryHeading && (
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
													{cat}
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
												{grp}
											</td>
										</tr>
										{groupRows.map((r) => (
											<tr
												key={r.name}
												style={{ background: "white" }}
												onMouseEnter={(e) =>
													(e.currentTarget.style.background = "#faf8f5")
												}
												onMouseLeave={(e) =>
													(e.currentTarget.style.background = "white")
												}>
												<td style={{ ...cellStyle, fontWeight: 500 }}>{r.name}</td>
												<td style={{ ...cellStyle, fontSize: "0.8em", color: "#555" }}>
													{(r.whereMet || []).join(", ")}
												</td>
												<td style={{ ...cellStyle, fontSize: "0.8em", color: "#555" }}>
													{(r.unpackingType || []).join(", ")}
												</td>
												<td style={qCellStyle}>{r.coreQuestion}</td>
												<td style={qCellStyle}>{r.differentiationQ}</td>
												<td style={qCellStyle}>{r.whereMetQ}</td>
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
