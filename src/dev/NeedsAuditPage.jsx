import React, { useMemo, useState } from "react";
import NeedsSubsistence from "../data/NeedsSubsistence.js";
import NeedsConnection from "../data/NeedsConnection.js";
import NeedsMeaning from "../data/NeedsMeaning.js";
import NeedsFreedom from "../data/NeedsFreedom.js";

function resolveField(item, group, field) {
	return item[field] ?? group[field] ?? [];
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
				rows.push({
					name: item.item,
					category,
					group: group.ui?.heading ?? groupKey,
					whereMet: resolveField(item, group, "whereMet"),
					unpackingType: resolveField(item, group, "unpackingType"),
					hasClarifier: !!item.clarify,
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

	const categories = useMemo(() => {
		const set = new Set(allRows.map((r) => r.category).filter(Boolean));
		return ["All", ...Array.from(set).sort()];
	}, [allRows]);

	const groups = useMemo(() => {
		const set = new Set(
			allRows
				.filter((r) => category === "All" || r.category === category)
				.map((r) => r.group)
				.filter(Boolean),
		);
		return ["All", ...Array.from(set).sort()];
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

	const toggleSort = (key) => {
		if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
		else {
			setSortKey(key);
			setSortDir("asc");
		}
	};

	return (
		<div style={{ padding: 16, maxWidth: 1200, margin: "0 auto" }}>
			<h2 style={{ marginBottom: 8 }}>Needs Audit</h2>
			<div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>
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

				<select value={unpackingType} onChange={(e) => setUnpackingType(e.target.value)} style={{ padding: 8 }}>
					{unpackingOptions.map((x) => (
						<option key={x} value={x}>
							unpackingType: {x}
						</option>
					))}
				</select>

				<label style={{ display: "flex", gap: 6, alignItems: "center" }}>
					<input type="checkbox" checked={missingOnly} onChange={(e) => setMissingOnly(e.target.checked)} />
					Missing only
				</label>

				<div style={{ marginLeft: "auto", opacity: 0.8 }}>
					Showing <strong>{sorted.length}</strong> of {allRows.length}
				</div>
			</div>

			<div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 10, overflow: "hidden" }}>
				<table style={{ width: "100%", borderCollapse: "collapse" }}>
					<thead style={{ background: "rgba(0,0,0,0.04)" }}>
						<tr>
							{[
								["name", "Need"],
								["category", "Category"],
								["group", "Group"],
								["whereMet", "whereMet"],
								["unpackingType", "unpackingType"],
								["hasClarifier", "Clarifier?"],
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
									}}
									title="Click to sort">
									{label}
									{sortKey === key ? (sortDir === "asc" ? " ▲" : " ▼") : ""}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{sorted.map((r) => (
							<tr key={`${r.category}-${r.group}-${r.name}`}>
								<td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
									{r.name}
								</td>
								<td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
									{r.category}
								</td>
								<td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
									{r.group}
								</td>
								<td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
									{(r.whereMet || []).join(", ")}
								</td>
								<td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
									{(r.unpackingType || []).join(", ")}
								</td>
								<td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
									{r.hasClarifier ? "Yes" : ""}
								</td>
							</tr>
						))}
						{sorted.length === 0 && (
							<tr>
								<td colSpan={6} style={{ padding: 14, opacity: 0.75 }}>
									No matches.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
