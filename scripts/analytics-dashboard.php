<?php
/**
 * analytics-dashboard.php — password-protected analytics dashboard
 * Access: ?key=YOUR_SECRET_KEY
 */

date_default_timezone_set('Australia/Brisbane');
header('Content-Type: text/html; charset=utf-8');

define('ACCESS_KEY', 'whatever-THE-lemon-27-is');

if (($_GET['key'] ?? '') !== ACCESS_KEY) {
    http_response_code(403);
    echo '<!doctype html><html><body style="font-family:sans-serif;padding:2rem">';
    echo '<h2>Access denied</h2><p>Append <code>?key=…</code> to the URL.</p></body></html>';
    exit;
}

$log_file = __DIR__ . '/analytics.jsonl';

// ── Delete session(s) ────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST'
    && ($_POST['key'] ?? '') === ACCESS_KEY
    && (($_POST['action'] ?? '') === 'delete_session' || isset($_POST['del']))) {

    // Collect session IDs to delete
    $del_sids = [];
    if (isset($_POST['del']) && is_array($_POST['del'])) {
        foreach ($_POST['del'] as $v) {
            $v = trim((string)$v);
            if ($v) $del_sids[] = $v;
        }
    } elseif (($_POST['action'] ?? '') === 'delete_session') {
        $v = trim($_POST['session_id'] ?? '');
        if ($v) $del_sids[] = $v;
    }

    if ($del_sids && file_exists($log_file)) {
        $del_set = array_flip($del_sids);
        $keep = [];
        foreach (file($log_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
            $obj = json_decode($line, true);
            if (!is_array($obj) || !isset($del_set[$obj['session_id'] ?? ''])) {
                $keep[] = $line;
            }
        }
        file_put_contents($log_file, $keep ? implode(PHP_EOL, $keep) . PHP_EOL : '', LOCK_EX);
    }
    header('Location: ' . strtok($_SERVER['REQUEST_URI'], '?') . '?key=' . urlencode(ACCESS_KEY));
    exit;
}

// ── Load data ────────────────────────────────────────────────────────────────
$events = [];
if (file_exists($log_file)) {
    foreach (file($log_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $obj = json_decode($line, true);
        if (is_array($obj)) $events[] = $obj;
    }
}

// ── Aggregate ────────────────────────────────────────────────────────────────
$sessions          = [];
$page_views        = [];
$page_active_ms    = [];
$help_opens        = [];   // name → ['count'=>n, 'pages'=>[page=>n]]
$ui_opens          = [];   // name → ['count'=>n, 'pages'=>[page=>n]]
$section_opens     = [];
$field_fills       = [];
$needs_unpacked    = [];
$feelings_counts   = ['none' => 0, '1–3' => 0, '4–7' => 0, '8+' => 0];
$needs_counts      = ['none' => 0, '1–3' => 0, '4–7' => 0, '8+' => 0];
$all_feelings_sel  = [];   // feeling name → sessions it was selected in
$all_feelings_str  = [];   // feeling name → sessions it was strongly felt in
$all_needs_sel     = [];
$all_needs_str     = [];
$session_cur_page  = [];   // sid → current page (tracked during aggregation)

// Session journey: session_id → { start, events[], feelings_*, needs_* }
$journey = [];

foreach ($events as $ev) {
    $sid  = $ev['session_id'] ?? '';
    $name = $ev['event']      ?? '';
    if (!$sid) continue;

    if (!isset($sessions[$sid])) {
        $sessions[$sid] = ['pages' => [], 'last_page' => null,
                           'feelings_count' => 0, 'needs_count' => 0, 'start' => 0];
    }
    if (!isset($journey[$sid])) {
        $journey[$sid] = ['start' => PHP_INT_MAX, 'max_ts' => 0, 'events' => [],
                          'feelings_selected' => [], 'feelings_strong' => [],
                          'needs_selected' => [],   'needs_strong' => [],
                          'duration_ms' => 0];
    }

    $ts = (int)($ev['timestamp'] ?? 0);
    if ($ts && $ts < $journey[$sid]['start']) {
        $journey[$sid]['start'] = $ts;
        $sessions[$sid]['start'] = $ts;
    }
    if ($ts > $journey[$sid]['max_ts']) {
        $journey[$sid]['max_ts'] = $ts;
    }
    $journey[$sid]['events'][] = $ev;

    switch ($name) {
        case 'page_view':
            $page = $ev['page_name'] ?? '';
            if ($page) {
                $session_cur_page[$sid] = $page;
                if (!in_array($page, $sessions[$sid]['pages'], true)) {
                    $sessions[$sid]['pages'][] = $page;
                    $page_views[$page] = ($page_views[$page] ?? 0) + 1;
                }
            }
            break;

        case 'page_exit':
            $page = $ev['page_name'] ?? '';
            $ms   = (int)($ev['time_active_ms'] ?? 0);
            if ($page && $ms > 0) {
                if (!isset($page_active_ms[$page])) $page_active_ms[$page] = [0, 0];
                $page_active_ms[$page][0] += $ms;
                $page_active_ms[$page][1] += 1;
            }
            // Accumulate per-session active time
            if (!isset($sessions[$sid]['active_ms'])) $sessions[$sid]['active_ms'] = 0;
            $sessions[$sid]['active_ms'] += $ms;
            break;

        case 'ui_open':
            $type     = $ev['type'] ?? '';
            $uname    = $ev['name'] ?? '';
            $src_page = $ev['page_name'] ?? ($session_cur_page[$sid] ?? '');
            if ($uname) {
                if (!isset($ui_opens[$uname])) $ui_opens[$uname] = ['count' => 0, 'pages' => []];
                $ui_opens[$uname]['count']++;
                if ($src_page) $ui_opens[$uname]['pages'][$src_page] = ($ui_opens[$uname]['pages'][$src_page] ?? 0) + 1;
            }
            if ($type === 'help' && $uname) {
                if (!isset($help_opens[$uname])) $help_opens[$uname] = ['count' => 0, 'pages' => []];
                $help_opens[$uname]['count']++;
                if ($src_page) $help_opens[$uname]['pages'][$src_page] = ($help_opens[$uname]['pages'][$src_page] ?? 0) + 1;
            }
            if ($type === 'section' && strpos($uname, 'feelings-') === 0)
                $section_opens[$uname] = ($section_opens[$uname] ?? 0) + 1;
            break;

        case 'field_interaction':
            $fid = $ev['field_id'] ?? '';
            if ($fid) {
                if (!isset($field_fills[$fid])) $field_fills[$fid] = [0, 0];
                $field_fills[$fid][1] += 1;
                if ($ev['filled'] ?? false) {
                    $field_fills[$fid][0] += 1;
                    // Count per-session filled fields
                    if (!isset($sessions[$sid]['fields_filled'])) $sessions[$sid]['fields_filled'] = 0;
                    $sessions[$sid]['fields_filled']++;
                }
            }
            break;

        case 'session_end':
            $sessions[$sid]['last_page']      = $ev['last_page'] ?? null;
            $sessions[$sid]['feelings_count'] = (int)($ev['feelings_count'] ?? 0);
            $sessions[$sid]['needs_count']    = (int)($ev['needs_count'] ?? 0);

            foreach ($ev['needs_unpacked'] ?? [] as $need)
                $needs_unpacked[$need] = ($needs_unpacked[$need] ?? 0) + 1;

            foreach ($ev['feelings_selected'] ?? [] as $f)
                $all_feelings_sel[$f] = ($all_feelings_sel[$f] ?? 0) + 1;
            foreach ($ev['feelings_strong'] ?? [] as $f)
                $all_feelings_str[$f] = ($all_feelings_str[$f] ?? 0) + 1;
            foreach ($ev['needs_selected'] ?? [] as $n)
                $all_needs_sel[$n] = ($all_needs_sel[$n] ?? 0) + 1;
            foreach ($ev['needs_strong'] ?? [] as $n)
                $all_needs_str[$n] = ($all_needs_str[$n] ?? 0) + 1;

            $journey[$sid]['feelings_selected'] = $ev['feelings_selected'] ?? [];
            $journey[$sid]['feelings_strong']   = $ev['feelings_strong']   ?? [];
            $journey[$sid]['needs_selected']    = $ev['needs_selected']    ?? [];
            $journey[$sid]['needs_strong']      = $ev['needs_strong']      ?? [];
            $journey[$sid]['duration_ms']       = (int)($ev['duration_ms'] ?? 0);

            $fc = (int)($ev['feelings_count'] ?? 0);
            $nc = (int)($ev['needs_count'] ?? 0);
            $feelings_counts[$fc === 0 ? 'none' : ($fc <= 3 ? '1–3' : ($fc <= 7 ? '4–7' : '8+'))]++;
            $needs_counts   [$nc === 0 ? 'none' : ($nc <= 3 ? '1–3' : ($nc <= 7 ? '4–7' : '8+'))]++;
            break;
    }
}

// ── Bot session filtering ────────────────────────────────────────────────────
// Drop sessions that look like bots:
//   1. Total active time ≤ 1ms (never actually engaged)
//   2. Only page_view events — no interactions at all
foreach (array_keys($journey) as $sid) {
    $sdata = $journey[$sid];
    $active_ms = $sessions[$sid]['active_ms'] ?? 0;
    $event_types = array_unique(array_column($sdata['events'], 'event'));
    $only_pageviews = (count($event_types) === 0 || ($event_types === ['page_view']));
    if ($active_ms <= 1 || $only_pageviews) {
        unset($journey[$sid], $sessions[$sid]);
    }
}

// Sort events within each journey session by timestamp, newest sessions first
foreach ($journey as &$sdata) {
    usort($sdata['events'], fn($a, $b) => ($a['timestamp'] ?? 0) <=> ($b['timestamp'] ?? 0));
}
unset($sdata); // break dangling reference before any further iteration over $journey
uasort($journey, fn($a, $b) => ($b['start'] ?? 0) <=> ($a['start'] ?? 0));

arsort($page_views);
arsort($needs_unpacked);
arsort($all_feelings_sel);
arsort($all_feelings_str);
arsort($all_needs_sel);
arsort($all_needs_str);

$avg_time = [];
foreach ($page_active_ms as $page => [$total, $count]) {
    $avg_time[$page] = $count > 0 ? round($total / $count / 1000, 1) : 0;
}
arsort($avg_time);

$drop_off = [];
foreach ($sessions as $s) {
    $lp = $s['last_page'] ?? null;
    if ($lp) $drop_off[$lp] = ($drop_off[$lp] ?? 0) + 1;
}
arsort($drop_off);

$bucket_order = ['none', '1–3', '4–7', '8+'];
$f_hist = []; $n_hist = [];
foreach ($bucket_order as $b) { $f_hist[$b] = $feelings_counts[$b] ?? 0; $n_hist[$b] = $needs_counts[$b] ?? 0; }

$section_counts = [];
foreach (['feelings-fear','feelings-anger','feelings-distress'] as $s) $section_counts[$s] = $section_opens[$s] ?? 0;
arsort($field_fills);

$total_sessions = count($sessions);

// Story word engagement
$story_opens    = []; // word → open count
$story_feelings = []; // word → times feelings were chosen from it
$story_needs    = []; // word → times needs were chosen from it
$story_replaced = []; // word → times word was replaced with feelings

foreach ($events as $ev) {
    $ename = $ev['event'] ?? '';
    if ($ename === 'ui_open' && isset($ev['word']) && ($ev['word_type'] ?? '') === 'story_word') {
        $w = $ev['word'];
        $story_opens[$w] = ($story_opens[$w] ?? 0) + 1;
    }
    if ($ename === 'action' && ($ev['action_name'] ?? '') === 'story_word_ok') {
        $w = $ev['word'] ?? '';
        if ($w) {
            if (($ev['feelings_chosen'] ?? 0) > 0) $story_feelings[$w] = ($story_feelings[$w] ?? 0) + 1;
            if (($ev['needs_chosen']    ?? 0) > 0) $story_needs[$w]    = ($story_needs[$w]    ?? 0) + 1;
            if ($ev['replaced'] ?? false)           $story_replaced[$w] = ($story_replaced[$w] ?? 0) + 1;
        }
    }
}
arsort($story_opens);

// Build journey JSON for JavaScript (strip large/unused keys to keep payload small)
$journey_js = [];
foreach ($journey as $sid => $sdata) {
    $evs = [];
    foreach ($sdata['events'] as $ev) {
        $e = ['event' => $ev['event'] ?? '', 't' => (int)($ev['timestamp'] ?? 0) - $sdata['start']];
        foreach (['page_name','from_page','to_page','method','name','type',
                  'field_id','filled','length_bucket','action_name','setting','value',
                  'time_active_ms','time_idle_ms','time_open_ms','duration_ms','track',
                  'word','word_type','feelings_chosen','needs_chosen','replaced'] as $k) {
            if (isset($ev[$k])) $e[$k] = $ev[$k];
        }
        // Include per-page feelings/needs snapshot if present (from page_exit)
        foreach (['feelings_selected','feelings_strong','needs_selected','needs_strong'] as $k) {
            if (!empty($ev[$k])) $e[$k] = $ev[$k];
        }
        $evs[] = $e;
    }
    $journey_js[] = [
        'sid'               => $sid,
        'start'             => $sdata['start'],
        'duration_ms'       => $sdata['duration_ms'],
        'active_ms'         => $sessions[$sid]['active_ms'] ?? 0,
        'fields_filled'     => $sessions[$sid]['fields_filled'] ?? 0,
        'events'            => $evs,
        'feelings_selected' => $sdata['feelings_selected'],
        'feelings_strong'   => $sdata['feelings_strong'],
        'needs_selected'    => $sdata['needs_selected'],
        'needs_strong'      => $sdata['needs_strong'],
    ];
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function json_vals(array $arr): string { return json_encode(array_values($arr), JSON_UNESCAPED_UNICODE); }
function json_keys(array $arr): string { return json_encode(array_keys($arr), JSON_UNESCAPED_UNICODE); }
function pct(int $a, int $b): string   { return $b > 0 ? round($a / $b * 100) . '%' : '–'; }
function fmts(int $ms): string {
    $s = round($ms / 1000);
    return $s >= 60 ? floor($s/60) . 'm ' . ($s%60) . 's' : $s . 's';
}
function fmt_pages(array $pages): string {
    arsort($pages);
    $parts = [];
    foreach ($pages as $pg => $n) $parts[] = htmlspecialchars($pg) . ($n > 1 ? " \xc3\x97{$n}" : '');
    return implode(', ', $parts);
}

// ── Overlay / help topic prep (used in cards 4a & 4b) ────────────────────────
$known_modals = ['body-sensations', 'summary', 'clarify-feelings', 'explore-need', 'side-menu'];
// Only topics with active:true in StandaloneHelpTopics.jsx
$known_help_topics = [
    'this-process','privacy','mourning','needs','stay-with-it',
    'feedback','threat-mode','first-feeling','story-words','feelings',
    'observation','nervous','collab-understand-them','collab-check-willingness',
    'collab-share-experience','collab-check-understood','collab-way-forward',
    'making-guesses','finding-strategies','about','not-ready',
    'page-help', // auto-generated fallback when no specific topic is set
];

$help_opens_full   = $help_opens;
$ui_opens_filtered = [];
foreach ($known_help_topics as $t) {
    if (!isset($help_opens_full[$t])) $help_opens_full[$t] = ['count' => 0, 'pages' => []];
}
foreach ($known_modals as $m) {
    $ui_opens_filtered[$m] = isset($ui_opens[$m]) ? $ui_opens[$m] : ['count' => 0, 'pages' => []];
}
foreach ($ui_opens as $uname => $udata) {
    if (!isset($help_opens[$uname]) && strpos($uname, 'feelings-') !== 0 && !isset($ui_opens_filtered[$uname])) {
        $ui_opens_filtered[$uname] = $udata;
    }
}
uasort($help_opens_full,   function($a, $b) { return (isset($b['count']) ? $b['count'] : 0) - (isset($a['count']) ? $a['count'] : 0); });
uasort($ui_opens_filtered, function($a, $b) { return (isset($b['count']) ? $b['count'] : 0) - (isset($a['count']) ? $a['count'] : 0); });
$_hc = array_values(array_map(function($v) { return isset($v['count']) ? (int)$v['count'] : 0; }, $help_opens_full));
$_uc = array_values(array_map(function($v) { return isset($v['count']) ? (int)$v['count'] : 0; }, $ui_opens_filtered));
$help_max = max(array_merge([1], $_hc));
$ui_max   = max(array_merge([1], $_uc));
?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Find Peace — Analytics</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f3f4f6; color: #1f2937; padding: 1.5rem; }
h1 { font-size: 1.5rem; margin-bottom: 0.25rem; }
.subtitle { color: #6b7280; font-size: 0.875rem; margin-bottom: 1.5rem; }
.subtitle strong { color: #1f2937; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(420px, 1fr)); gap: 1.25rem; margin-bottom: 1.25rem; }
.card { background: #fff; border-radius: 10px; padding: 1.25rem; box-shadow: 0 1px 4px rgba(0,0,0,.08); }
.card h2 { font-size: 1rem; margin-bottom: 0.75rem; color: #374151; }
canvas { max-height: 260px; }
.bar-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem; font-size: 0.82rem; }
.bar-label { width: 11rem; flex-shrink: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bar-track { flex: 1; background: #e5e7eb; border-radius: 3px; height: 14px; overflow: hidden; }
.bar-fill  { height: 100%; background: #6366f1; border-radius: 3px; }
.bar-num   { width: 3rem; text-align: right; color: #6b7280; }
table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
th, td { text-align: left; padding: 0.3rem 0.5rem; border-bottom: 1px solid #e5e7eb; }
th { color: #6b7280; font-weight: 600; }
.nodata { color: #9ca3af; }

/* Session list */
.session-table td { vertical-align: middle; }
.session-table .view-btn {
  background: #6366f1; color: #fff; border: none; border-radius: 5px;
  padding: 0.25rem 0.6rem; cursor: pointer; font-size: 0.8rem; float: none;
}
.session-table .del-btn {
  background: none; border: 1px solid #fca5a5; color: #ef4444; border-radius: 5px;
  padding: 0.25rem 0.6rem; cursor: pointer; font-size: 0.8rem; float: none;
}
.session-table .del-btn:hover { background: #fef2f2; }

/* Journey viewer */
#journey-card { display: none; }
#journey-nav { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; }
#journey-nav button { background: #e5e7eb; border: none; border-radius: 6px; padding: 0.35rem 0.75rem; cursor: pointer; font-size: 0.85rem; float: none; }
#journey-nav button:disabled { opacity: 0.4; cursor: default; }
#journey-title { font-weight: 600; font-size: 0.9rem; }
.timeline { list-style: none; padding: 0; margin: 0; position: relative; }
.timeline::before { content:''; position:absolute; left:0.55rem; top:0; bottom:0; width:2px; background:#e5e7eb; }
.tl-item { display:flex; gap:0.75rem; align-items:flex-start; padding:0.35rem 0 0.35rem 2rem; position:relative; font-size:0.83rem; }
.tl-dot { position:absolute; left:0; width:1.1rem; height:1.1rem; border-radius:50%; flex-shrink:0; border:2px solid #fff; box-shadow:0 0 0 2px #e5e7eb; }
.tl-time { color:#9ca3af; white-space:nowrap; min-width:3.5rem; }
.tl-label { color:#374151; }
.tl-detail { color:#6b7280; font-size:0.78rem; }
.pills { display:flex; flex-wrap:wrap; gap:0.3rem; margin-top:0.3rem; }
.pill-f  { background:#fef3c7; color:#92400e; border-radius:99px; padding:0.15rem 0.6rem; font-size:0.78rem; }
.pill-fs { background:#fde68a; color:#78350f; border-radius:99px; padding:0.15rem 0.6rem; font-size:0.78rem; font-weight:600; }
.pill-n  { background:#e0f2fe; color:#0369a1; border-radius:99px; padding:0.15rem 0.6rem; font-size:0.78rem; }
.pill-ns { background:#bae6fd; color:#075985; border-radius:99px; padding:0.15rem 0.6rem; font-size:0.78rem; font-weight:600; }
.journey-feelings { margin-top:0.75rem; padding-top:0.75rem; border-top:1px solid #e5e7eb; }
.journey-feelings h4 { font-size:0.82rem; color:#6b7280; margin-bottom:0.35rem; }
</style>
</head>
<body>
<h1>Find Peace — Analytics</h1>
<p class="subtitle">
  <strong><?= $total_sessions ?></strong> unique session<?= $total_sessions !== 1 ? 's' : '' ?> &nbsp;·&nbsp;
  <?= count($events) ?> total events &nbsp;·&nbsp;
  Generated <?= date('j M Y, g:ia') ?> Brisbane time
</p>

<div class="grid">

<!-- 1. Session funnel -->
<div class="card">
  <h2>📈 Session funnel — unique sessions per page</h2>
  <?php if (!$page_views): ?><p class="nodata">No data yet.</p><?php else:
    $max = max($page_views);
    foreach ($page_views as $page => $cnt): ?>
    <div class="bar-row">
      <span class="bar-label" title="<?= htmlspecialchars($page) ?>"><?= htmlspecialchars($page) ?></span>
      <div class="bar-track"><div class="bar-fill" style="width:<?= round($cnt/$max*100) ?>%"></div></div>
      <span class="bar-num"><?= $cnt ?></span>
    </div>
  <?php endforeach; endif; ?>
</div>

<!-- 2. Drop-off -->
<div class="card">
  <h2>🚪 Session end — last page seen</h2>
  <?php if (!$drop_off): ?><p class="nodata">No session_end events yet.</p><?php else:
    $max = max($drop_off);
    foreach ($drop_off as $page => $cnt): ?>
    <div class="bar-row">
      <span class="bar-label" title="<?= htmlspecialchars($page) ?>"><?= htmlspecialchars($page) ?></span>
      <div class="bar-track"><div class="bar-fill" style="width:<?= round($cnt/$max*100) ?>%;background:#f59e0b"></div></div>
      <span class="bar-num"><?= $cnt ?></span>
    </div>
  <?php endforeach; endif; ?>
</div>

<!-- 3. Time on page -->
<div class="card">
  <h2>⏱ Avg active time per page (seconds)</h2>
  <?php if (!$avg_time): ?><p class="nodata">No page_exit data yet.</p><?php else:
    $max = max($avg_time);
    foreach ($avg_time as $page => $sec): ?>
    <div class="bar-row">
      <span class="bar-label" title="<?= htmlspecialchars($page) ?>"><?= htmlspecialchars($page) ?></span>
      <div class="bar-track"><div class="bar-fill" style="width:<?= $max>0?round($sec/$max*100):0 ?>%;background:#10b981"></div></div>
      <span class="bar-num"><?= $sec ?>s</span>
    </div>
  <?php endforeach; endif; ?>
</div>

<!-- 4. Help engagement + UI overlays (side-by-side) -->
<div style="display:flex;gap:1.25rem;flex-wrap:wrap;align-items:flex-start;grid-column:1/-1">
<div class="card" style="flex:1;min-width:300px">
  <h2>❓ Help topics opened</h2>
  <?php foreach ($help_opens_full as $topic => $data):
    $cnt = $data['count'] ?? 0; $pages = $data['pages'] ?? []; ?>
  <div class="bar-row" style="flex-wrap:wrap;row-gap:0.1rem">
    <span class="bar-label" title="<?= htmlspecialchars($topic) ?>"
      style="<?= $cnt === 0 ? 'color:#9ca3af' : '' ?>"><?= htmlspecialchars($topic) ?></span>
    <div class="bar-track"><div class="bar-fill" style="width:<?= $cnt>0?round($cnt/$help_max*100):0 ?>%;background:#8b5cf6"></div></div>
    <span class="bar-num"><?= $cnt ?></span>
    <?php if ($pages): ?><span style="width:100%;padding-left:11.5rem;font-size:0.73rem;color:#9ca3af">from: <?= fmt_pages($pages) ?></span><?php endif; ?>
  </div>
  <?php endforeach; ?>
</div>
<div class="card" style="flex:1;min-width:300px">
  <h2>🖥 UI overlay opens</h2>
  <?php foreach ($ui_opens_filtered as $uname => $data):
    $cnt = $data['count'] ?? 0; $pages = $data['pages'] ?? []; ?>
  <div class="bar-row" style="flex-wrap:wrap;row-gap:0.1rem">
    <span class="bar-label" title="<?= htmlspecialchars($uname) ?>"
      style="<?= $cnt === 0 ? 'color:#9ca3af' : '' ?>"><?= htmlspecialchars($uname) ?></span>
    <div class="bar-track"><div class="bar-fill" style="width:<?= $cnt>0?round($cnt/$ui_max*100):0 ?>%"></div></div>
    <span class="bar-num"><?= $cnt ?></span>
    <?php if ($pages): ?><span style="width:100%;padding-left:11.5rem;font-size:0.73rem;color:#9ca3af">from: <?= fmt_pages($pages) ?></span><?php endif; ?>
  </div>
  <?php endforeach; ?>
</div>
</div>

<!-- 5. Feelings depth histogram -->
<div class="card">
  <h2>💬 Feelings &amp; needs selected per session</h2>
  <?php if (!array_sum($f_hist) && !array_sum($n_hist)): ?><p class="nodata">No session_end data yet.</p><?php else: ?>
  <canvas id="depthChart"></canvas>
  <script>
  new Chart(document.getElementById('depthChart'),{type:'bar',data:{
    labels:<?= json_encode(array_map(fn($k) => $k === 'none' ? '0' : $k, array_keys($f_hist)), JSON_UNESCAPED_UNICODE) ?>,
    datasets:[
      {label:'Feelings',data:<?= json_vals($f_hist) ?>,backgroundColor:'#f97316'},
      {label:'Needs',   data:<?= json_vals($n_hist) ?>,backgroundColor:'#3b82f6'}
    ]},options:{responsive:true,plugins:{legend:{position:'bottom'}},
    scales:{y:{beginAtZero:true,ticks:{stepSize:1}}}}});
  </script>
  <?php endif; ?>
</div>

<!-- 6. Top feelings selected -->
<div class="card">
  <h2>😔 Most-selected feelings</h2>
  <?php if (!$all_feelings_sel && !$all_feelings_str): ?><p class="nodata">No feelings data yet.</p><?php else:
    // Merge: show combined bar with strong portion highlighted
    $all = $all_feelings_sel; foreach ($all_feelings_str as $f => $n) $all[$f] = ($all[$f] ?? 0) + $n;
    arsort($all); $max = max($all) ?: 1; $shown = array_slice($all, 0, 20, true);
    foreach ($shown as $f => $total):
      $strong = $all_feelings_str[$f] ?? 0;
      $sel    = $all_feelings_sel[$f] ?? 0; ?>
    <div class="bar-row">
      <span class="bar-label" title="<?= htmlspecialchars($f) ?>"><?= htmlspecialchars($f) ?></span>
      <div class="bar-track">
        <div style="display:flex;height:100%">
          <div style="width:<?= round($sel/$max*100) ?>%;background:#fbbf24;height:100%"></div>
          <div style="width:<?= round($strong/$max*100) ?>%;background:#f59e0b;height:100%"></div>
        </div>
      </div>
      <span class="bar-num" title="<?= $strong ?> strongly felt"><?= $total ?></span>
    </div>
  <?php endforeach; endif; ?>
  <p style="font-size:0.75rem;color:#9ca3af;margin-top:0.5rem">Darker = strongly felt (double-click)</p>
</div>

<!-- 7. Top needs selected -->
<div class="card">
  <h2>🌱 Most-selected needs</h2>
  <?php if (!$all_needs_sel && !$all_needs_str): ?><p class="nodata">No needs data yet.</p><?php else:
    $all = $all_needs_sel; foreach ($all_needs_str as $n => $c) $all[$n] = ($all[$n] ?? 0) + $c;
    arsort($all); $max = max($all) ?: 1; $shown = array_slice($all, 0, 20, true);
    foreach ($shown as $n => $total):
      $strong = $all_needs_str[$n] ?? 0;
      $sel    = $all_needs_sel[$n] ?? 0; ?>
    <div class="bar-row">
      <span class="bar-label" title="<?= htmlspecialchars($n) ?>"><?= htmlspecialchars($n) ?></span>
      <div class="bar-track">
        <div style="display:flex;height:100%">
          <div style="width:<?= round($sel/$max*100) ?>%;background:#60a5fa;height:100%"></div>
          <div style="width:<?= round($strong/$max*100) ?>%;background:#2563eb;height:100%"></div>
        </div>
      </div>
      <span class="bar-num" title="<?= $strong ?> strongly felt"><?= $total ?></span>
    </div>
  <?php endforeach; endif; ?>
  <p style="font-size:0.75rem;color:#9ca3af;margin-top:0.5rem">Darker = strongly felt (double-click)</p>
</div>

<!-- 8. Needs unpacked -->
<div class="card">
  <h2>🔍 Needs explored in depth</h2>
  <?php if (!$needs_unpacked): ?><p class="nodata">No needs explored yet.</p><?php else:
    $max = max($needs_unpacked); $shown = array_slice($needs_unpacked, 0, 20, true);
    foreach ($shown as $need => $cnt): ?>
    <div class="bar-row">
      <span class="bar-label" title="<?= htmlspecialchars($need) ?>"><?= htmlspecialchars($need) ?></span>
      <div class="bar-track"><div class="bar-fill" style="width:<?= round($cnt/$max*100) ?>%;background:#0ea5e9"></div></div>
      <span class="bar-num"><?= $cnt ?></span>
    </div>
  <?php endforeach; endif; ?>
</div>

<!-- 9. Feeling sections -->
<div class="card">
  <h2>😨 Feeling-type sections opened</h2>
  <?php if (!array_sum($section_counts)): ?><p class="nodata">No section open events yet.</p><?php else:
    $labels = ['Fear','Anger','Distress'];
    $keys   = ['feelings-fear','feelings-anger','feelings-distress'];
    $vals   = array_map(fn($k) => $section_counts[$k] ?? 0, $keys); ?>
  <canvas id="sectionChart"></canvas>
  <script>
  new Chart(document.getElementById('sectionChart'),{type:'bar',data:{
    labels:<?= json_encode($labels) ?>,
    datasets:[{label:'Opens',data:<?= json_encode($vals) ?>,
      backgroundColor:['#f87171','#fb923c','#a78bfa']}]},
    options:{responsive:true,plugins:{legend:{display:false}},
    scales:{y:{beginAtZero:true,ticks:{stepSize:1}}}}});
  </script>
  <?php endif; ?>
</div>

<!-- 10. Field completion -->
<div class="card">
  <h2>✏️ Field completion rates</h2>
  <?php if (!$field_fills): ?><p class="nodata">No field_interaction events yet.</p><?php else: ?>
  <table>
    <thead><tr><th>Field</th><th>Interactions</th><th>Filled</th><th>Rate</th></tr></thead>
    <tbody>
    <?php foreach ($field_fills as $fid => [$filled, $total]): ?>
      <tr>
        <td><?= htmlspecialchars($fid) ?></td>
        <td><?= $total ?></td><td><?= $filled ?></td><td><?= pct($filled,$total) ?></td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
  <?php endif; ?>
</div>


<!-- 12. Story word engagement -->
<div class="card">
  <h2>📖 Story word engagement</h2>
  <?php if (!$story_opens): ?><p class="nodata">No story word data yet.</p><?php else: ?>
  <table>
    <thead><tr>
      <th>Word</th>
      <th title="Times the popup was opened">Opens</th>
      <th title="Times feelings were chosen from this word's popup">Feelings chosen</th>
      <th title="Times needs were chosen from this word's popup">Needs chosen</th>
      <th title="Times the word was replaced with chosen feelings">Replaced</th>
    </tr></thead>
    <tbody>
    <?php foreach ($story_opens as $word => $opens):
      $fc = $story_feelings[$word] ?? 0;
      $nc = $story_needs[$word]    ?? 0;
      $rc = $story_replaced[$word] ?? 0; ?>
    <tr>
      <td><?= htmlspecialchars($word) ?></td>
      <td><?= $opens ?></td>
      <td><?= $fc ?> <?= $opens > 0 ? '<span style="color:#9ca3af;font-size:0.75rem">('.pct($fc,$opens).')</span>' : '' ?></td>
      <td><?= $nc ?> <?= $opens > 0 ? '<span style="color:#9ca3af;font-size:0.75rem">('.pct($nc,$opens).')</span>' : '' ?></td>
      <td><?= $rc ?> <?= $opens > 0 ? '<span style="color:#9ca3af;font-size:0.75rem">('.pct($rc,$opens).')</span>' : '' ?></td>
    </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
  <?php endif; ?>
</div>

</div><!-- .grid -->

<!-- ── Session list ─────────────────────────────────────────────────────── -->
<div class="card" style="margin-bottom:1.25rem">
  <h2>📋 All sessions</h2>
  <?php if (!$journey): ?><p class="nodata">No sessions yet.</p><?php else:

  // Map sid → index in the full SESSIONS JS array (built from $journey in sorted order)
  $journey_idx_map = [];
  $ji = 0;
  foreach ($journey as $sid => $_) { $journey_idx_map[$sid] = $ji++; }

  // Split: engaged = any field filled OR any feeling/need selected
  $engaged = []; $passive = [];
  foreach ($journey as $sid => $sdata) {
      $ff = $sessions[$sid]['fields_filled'] ?? 0;
      $fc = count($sdata['feelings_selected']) + count($sdata['feelings_strong']);
      $nc = count($sdata['needs_selected'])    + count($sdata['needs_strong']);
      if ($ff > 0 || $fc > 0 || $nc > 0) $engaged[$sid] = $sdata;
      else                                $passive[$sid] = $sdata;
  }
  ?>
  <!-- Hidden form for single-session delete (avoids nesting forms) -->
  <form method="post" id="single-del-form" style="display:none">
    <input type="hidden" name="key" value="<?= htmlspecialchars(ACCESS_KEY) ?>">
    <input type="hidden" name="action" value="delete_session">
    <input type="hidden" name="session_id" id="single-del-sid">
  </form>
  <form method="post" id="bulk-form">
    <input type="hidden" name="key" value="<?= htmlspecialchars(ACCESS_KEY) ?>">
    <div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.75rem">
      <button type="submit" class="del-btn" style="float:none"
        onclick="return document.querySelectorAll('.row-cb:checked').length > 0 && confirm('Delete selected sessions?')">
        Delete selected
      </button>
      <span id="sel-count" style="font-size:0.82rem;color:#6b7280"></span>
    </div>

    <!-- ── Engaged sessions ── -->
    <p style="font-size:0.82rem;font-weight:600;color:#374151;margin-bottom:0.4rem">
      Sessions with data (<?= count($engaged) ?>)
    </p>
    <?php if ($engaged): ?>
    <table class="session-table" style="margin-bottom:1.75rem">
      <thead><tr>
        <th><input type="checkbox" class="sel-all-hdr" title="Select all" style="float:none"></th>
        <th>#</th><th>Date / time</th><th>Active time</th>
        <th>Pages</th><th>Feelings</th><th>Needs</th><th title="Story words confirmed (OK'd)">Words</th><th>Fields</th>
        <th title="Help screens opened">Help</th>
        <th title="UI overlay opens (modals, menus, etc.)">UI</th>
        <th></th>
      </tr></thead>
      <tbody>
      <?php $i = 1; foreach ($engaged as $sid => $sdata):
        $active_ms     = $sessions[$sid]['active_ms'] ?? 0;
        if ($active_ms <= 0) $active_ms = $sdata['duration_ms'] ?? 0;
        $fields_filled = $sessions[$sid]['fields_filled'] ?? 0;
        $feelings_n    = count($sdata['feelings_selected']) + count($sdata['feelings_strong']);
        $needs_n       = count($sdata['needs_selected'])    + count($sdata['needs_strong']);
        $help_n = 0; $ui_n = 0; $words_n = 0;
        foreach ($sdata['events'] as $ev) {
            if (($ev['event'] ?? '') === 'ui_open') {
                if (($ev['type'] ?? '') === 'help') $help_n++;
                else $ui_n++;
            }
            if (($ev['event'] ?? '') === 'action' && ($ev['action_name'] ?? '') === 'story_word_ok') {
                $words_n++;
            }
        }
        $js_idx = $journey_idx_map[$sid];
      ?>
      <tr>
        <td><input type="checkbox" name="del[]" value="<?= htmlspecialchars($sid) ?>" class="row-cb" style="float:none"></td>
        <td><?= $i ?></td>
        <td><?= $sdata['start'] ? date('j M, g:ia', intval($sdata['start']/1000)) : '–' ?></td>
        <td><?= $active_ms > 0 ? fmts($active_ms) : '–' ?></td>
        <td><?= count(array_unique(array_filter(array_map(fn($e)=>$e['page_name']??'', array_filter($sdata['events'],fn($e)=>$e['event']==='page_view'))))) ?></td>
        <td><?= $feelings_n    ?: '–' ?></td>
        <td><?= $needs_n       ?: '–' ?></td>
        <td><?= $words_n       ?: '–' ?></td>
        <td><?= $fields_filled ?: '–' ?></td>
        <td><?= $help_n        ?: '–' ?></td>
        <td><?= $ui_n          ?: '–' ?></td>
        <td style="display:flex;gap:0.4rem;justify-content:flex-end">
          <button type="button" class="view-btn" onclick="viewSession(<?= $js_idx ?>)">View journey</button>
          <button type="button" class="del-btn"
            onclick="deleteSingle('<?= htmlspecialchars($sid, ENT_QUOTES) ?>')">Delete</button>
        </td>
      </tr>
      <?php $i++; endforeach; ?>
      </tbody>
    </table>
    <?php else: ?>
    <p class="nodata" style="margin-bottom:1.5rem">No sessions with data yet.</p>
    <?php endif; ?>

    <!-- ── Passive sessions (no interaction) ── -->
    <?php if ($passive): ?>
    <p style="font-size:0.82rem;font-weight:600;color:#9ca3af;margin-bottom:0.4rem">
      Sessions with no interaction (<?= count($passive) ?>)
    </p>
    <table class="session-table" style="opacity:0.7">
      <thead><tr>
        <th><input type="checkbox" class="sel-all-hdr" title="Select all" style="float:none"></th>
        <th>#</th><th>Date / time</th><th>Active time</th><th>Pages</th><th></th>
      </tr></thead>
      <tbody>
      <?php $i = 1; foreach ($passive as $sid => $sdata):
        $active_ms = $sessions[$sid]['active_ms'] ?? 0;
        if ($active_ms <= 0) $active_ms = $sdata['duration_ms'] ?? 0;
        $js_idx = $journey_idx_map[$sid];
      ?>
      <tr>
        <td><input type="checkbox" name="del[]" value="<?= htmlspecialchars($sid) ?>" class="row-cb" style="float:none"></td>
        <td><?= $i ?></td>
        <td><?= $sdata['start'] ? date('j M, g:ia', intval($sdata['start']/1000)) : '–' ?></td>
        <td><?= $active_ms > 0 ? fmts($active_ms) : '–' ?></td>
        <td><?= count(array_unique(array_filter(array_map(fn($e)=>$e['page_name']??'', array_filter($sdata['events'],fn($e)=>$e['event']==='page_view'))))) ?></td>
        <td style="display:flex;gap:0.4rem;justify-content:flex-end">
          <button type="button" class="view-btn" onclick="viewSession(<?= $js_idx ?>)">View journey</button>
          <button type="button" class="del-btn"
            onclick="deleteSingle('<?= htmlspecialchars($sid, ENT_QUOTES) ?>')">Delete</button>
        </td>
      </tr>
      <?php $i++; endforeach; ?>
      </tbody>
    </table>
    <?php endif; ?>

  </form>
  <?php endif; ?>
</div>
<script>
function deleteSingle(sid) {
  if (!confirm('Delete this session?')) return;
  document.getElementById('single-del-sid').value = sid;
  document.getElementById('single-del-form').submit();
}
(function() {
  const selCount = document.getElementById('sel-count');
  function updateCount() {
    const n = document.querySelectorAll('.row-cb:checked').length;
    selCount.textContent = n > 0 ? n + ' selected' : '';
  }
  // Each "select all" header checkbox toggles only its own table's rows
  document.querySelectorAll('.sel-all-hdr').forEach(hdr => {
    hdr.addEventListener('change', () => {
      const tbody = hdr.closest('table').querySelector('tbody');
      tbody.querySelectorAll('.row-cb').forEach(cb => { cb.checked = hdr.checked; });
      updateCount();
    });
  });
  document.querySelectorAll('.row-cb').forEach(cb => {
    cb.addEventListener('change', updateCount);
  });
})();
</script>

<!-- ── Journey viewer ───────────────────────────────────────────────────── -->
<div class="card" id="journey-card">
  <h2>🗺 Session journey</h2>
  <div id="journey-nav">
    <button onclick="stepJourney(-1)" id="j-prev">← Prev</button>
    <span id="journey-title"></span>
    <button onclick="stepJourney(1)" id="j-next">Next →</button>
    <button onclick="document.getElementById('journey-card').style.display='none'" style="margin-left:auto;background:#fef2f2;color:#ef4444">✕ Close</button>
  </div>
  <ul class="timeline" id="journey-timeline"></ul>
  <div class="journey-feelings" id="journey-feelings"></div>
</div>

<script>
const SESSIONS = <?= json_encode(array_values($journey_js), JSON_UNESCAPED_UNICODE) ?>;
let currentIdx = 0;

const COLORS = {
  page_view:'#6366f1', page_exit:'#9ca3af', navigation:'#8b5cf6',
  backtrack:'#f59e0b', ui_open:'#10b981', ui_close:'#6ee7b7',
  field_interaction:'#34d399', action:'#fbbf24', session_end:'#ef4444'
};

function fmtT(ms) {
  const s = Math.floor(ms/1000), m = Math.floor(s/60);
  return m > 0 ? m+'m '+(s%60)+'s' : s+'s';
}
function fmtEvent(ev) {
  switch(ev.event) {
    case 'page_view':  return null; // redundant with navigation events — skip
    case 'page_exit':  return {label: `Left: <b>${ev.page_name||''}</b>`,
      detail: ev.time_active_ms ? `active ${fmtT(ev.time_active_ms)}, idle ${fmtT(ev.time_idle_ms||0)}` : ''};
    case 'navigation': return {label: `Navigated → <b>${ev.to_page||''}</b>`,
      detail: `from ${ev.from_page||''} · ${ev.method||'button'}`};
    case 'backtrack':  return {label: `Back to <b>${ev.page_name||''}</b>`, detail: 'browser back'};
    case 'ui_open':
      if (ev.word_type === 'story_word')
        return {label: `Story word tapped: <b>${ev.word||ev.name||''}</b>`, detail: 'popup opened'};
      return {label: `Opened: ${ev.name||''}`, detail: ev.type||''};
    case 'ui_close':   return {label: `Closed: ${ev.name||''}`,
      detail: ev.time_open_ms ? `open for ${fmtT(ev.time_open_ms)}` : ''};
    case 'field_interaction': return {label: `Field: <b>${ev.field_id||''}</b>`,
      detail: (ev.filled ? 'filled' : 'left empty') + (ev.length_bucket ? ` · ${ev.length_bucket} chars` : '')};
    case 'action':
      if (ev.action_name === 'story_word_ok') {
        const parts = [];
        if ((ev.feelings_chosen||0) > 0) parts.push(`${ev.feelings_chosen} feeling${ev.feelings_chosen>1?'s':''}`);
        if ((ev.needs_chosen||0)    > 0) parts.push(`${ev.needs_chosen} need${ev.needs_chosen>1?'s':''}`);
        if (ev.replaced) parts.push('word replaced');
        return {label: `✓ Story word kept: <b>${ev.word||''}</b>`,
          detail: parts.length ? parts.join(' · ') : 'no feelings/needs linked'};
      }
      return {label: `Action: <b>${ev.action_name||''}</b>`,
        detail: ev.setting ? `${ev.setting} → ${ev.value}` : (ev.track||'')};
    case 'session_end':return {label: `Session ended`,
      detail: ev.duration_ms ? `total ${fmtT(ev.duration_ms)}` : ''};
    default: return {label: ev.event, detail:''};
  }
}

function renderFNPills(ev) {
  const fs = ev.feelings_strong || [], f = ev.feelings_selected || [];
  const ns = ev.needs_strong    || [], n = ev.needs_selected    || [];
  if (!fs.length && !f.length && !ns.length && !n.length) return '';
  return `<div style="margin-top:0.35rem">
    ${fs.length ? `<div class="pills">${fs.map(x=>`<span class="pill-fs">●&nbsp;${x}</span>`).join('')}</div>` : ''}
    ${f.length  ? `<div class="pills" style="margin-top:0.2rem">${f.map(x=>`<span class="pill-f">${x}</span>`).join('')}</div>` : ''}
    ${ns.length ? `<div class="pills" style="margin-top:0.2rem">${ns.map(x=>`<span class="pill-ns">●&nbsp;${x}</span>`).join('')}</div>` : ''}
    ${n.length  ? `<div class="pills" style="margin-top:0.2rem">${n.map(x=>`<span class="pill-n">${x}</span>`).join('')}</div>` : ''}
  </div>`;
}

function renderJourney(idx) {
  const s = SESSIONS[idx];
  if (!s) return;
  const card = document.getElementById('journey-card');
  card.style.display = 'block';
  card.scrollIntoView({behavior:'smooth', block:'start'});

  document.getElementById('j-prev').disabled = idx === 0;
  document.getElementById('j-next').disabled = idx === SESSIONS.length - 1;
  const activeStr = s.active_ms > 0 ? ` · ${fmtT(s.active_ms)} active` : (s.duration_ms ? ` · ${fmtT(s.duration_ms)}` : '');
  document.getElementById('journey-title').textContent =
    `Session ${idx+1} of ${SESSIONS.length} · ${s.start ? new Date(s.start).toLocaleString('en-AU',{timeZone:'Australia/Brisbane',dateStyle:'medium',timeStyle:'short'}) : ''}` + activeStr;

  // Check if any page_exit has per-page snapshots (new-style data)
  const hasPerPageFN = s.events.some(ev => ev.event === 'page_exit' &&
    ((ev.feelings_selected||[]).length || (ev.feelings_strong||[]).length ||
     (ev.needs_selected||[]).length    || (ev.needs_strong||[]).length));

  const tl = document.getElementById('journey-timeline');
  tl.innerHTML = s.events.map(ev => {
    const fmt = fmtEvent(ev);
    if (!fmt) return ''; // skip (e.g. page_view)
    const {label, detail} = fmt;
    const color = COLORS[ev.event] || '#9ca3af';
    const pills = ev.event === 'page_exit' ? renderFNPills(ev) : '';
    return `<li class="tl-item">
      <span class="tl-dot" style="background:${color}"></span>
      <span class="tl-time">${fmtT(Math.max(0,ev.t))}</span>
      <span>
        <span class="tl-label">${label}</span>
        ${detail ? `<br><span class="tl-detail">${detail}</span>` : ''}
        ${pills}
      </span>
    </li>`;
  }).join('');

  // Show session-end summary: always if no per-page snapshots; as fallback otherwise
  const fDiv = document.getElementById('journey-feelings');
  const hasFN = s.feelings_selected.length || s.feelings_strong.length
             || s.needs_selected.length    || s.needs_strong.length;
  if (hasFN && !hasPerPageFN) {
    fDiv.innerHTML = `<p style="font-size:0.8rem;color:#9ca3af;margin-bottom:0.35rem">Session totals</p>` + renderFNPills(s);
  } else {
    fDiv.innerHTML = '';
  }
}

function viewSession(idx) {
  currentIdx = idx;
  renderJourney(idx);
}
function stepJourney(dir) {
  currentIdx = Math.max(0, Math.min(SESSIONS.length-1, currentIdx+dir));
  renderJourney(currentIdx);
}
</script>
</body>
</html>
