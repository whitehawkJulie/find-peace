<?php
/**
 * analytics-dashboard.php — password-protected analytics dashboard
 *
 * Access: ?key=YOUR_SECRET_KEY
 * Set the key in the $ACCESS_KEY constant below.
 */

date_default_timezone_set('Australia/Brisbane');
header('Content-Type: text/html; charset=utf-8');

// ── Access control ──────────────────────────────────────────────────────────
define('ACCESS_KEY', 'whatever-THE-lemon-27-is'); // CHANGE

if (($_GET['key'] ?? '') !== ACCESS_KEY) {
    http_response_code(403);
    echo '<!doctype html><html><body style="font-family:sans-serif;padding:2rem">';
    echo '<h2>Access denied</h2><p>Append <code>?key=…</code> to the URL.</p></body></html>';
    exit;
}

// ── Load data ────────────────────────────────────────────────────────────────
$log_file = __DIR__ . '/analytics.jsonl';
$events   = [];

if (file_exists($log_file)) {
    foreach (file($log_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $obj = json_decode($line, true);
        if (is_array($obj)) $events[] = $obj;
    }
}

// ── Aggregate ────────────────────────────────────────────────────────────────

// Sessions: map session_id → set of pages reached, last_page, feelings/needs counts
$sessions         = [];
$page_views       = [];          // page_name → count of unique sessions that saw it
$page_active_ms   = [];          // page_name → [total_ms, count]
$help_opens       = [];          // name → count
$ui_opens         = [];          // name → count (all)
$section_opens    = [];          // feelings-fear / anger / distress → count
$field_fills      = [];          // field_id → [filled_count, total_count]
$needs_unpacked   = [];          // need_name → count
$feelings_counts  = [];          // histogram bucket → count
$needs_counts     = [];          // histogram bucket → count

foreach ($events as $ev) {
    $sid  = $ev['session_id'] ?? '';
    $name = $ev['event']      ?? '';

    if (!isset($sessions[$sid])) {
        $sessions[$sid] = ['pages' => [], 'last_page' => null, 'feelings_count' => 0, 'needs_count' => 0];
    }

    switch ($name) {
        case 'page_view':
            $page = $ev['page_name'] ?? '';
            if ($page) {
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
            break;

        case 'ui_open':
            $type  = $ev['type'] ?? '';
            $uname = $ev['name'] ?? '';
            if ($uname) {
                $ui_opens[$uname] = ($ui_opens[$uname] ?? 0) + 1;
            }
            if ($type === 'help' && $uname) {
                $help_opens[$uname] = ($help_opens[$uname] ?? 0) + 1;
            }
            if ($type === 'section' && strpos($uname, 'feelings-') === 0) {
                $section_opens[$uname] = ($section_opens[$uname] ?? 0) + 1;
            }
            break;

        case 'field_interaction':
            $fid    = $ev['field_id'] ?? '';
            $filled = (bool)($ev['filled'] ?? false);
            if ($fid) {
                if (!isset($field_fills[$fid])) $field_fills[$fid] = [0, 0];
                $field_fills[$fid][1] += 1;
                if ($filled) $field_fills[$fid][0] += 1;
            }
            break;

        case 'session_end':
            $sessions[$sid]['last_page']      = $ev['last_page'] ?? null;
            $sessions[$sid]['feelings_count'] = (int)($ev['feelings_count'] ?? 0);
            $sessions[$sid]['needs_count']    = (int)($ev['needs_count'] ?? 0);
            if (isset($ev['needs_unpacked']) && is_array($ev['needs_unpacked'])) {
                foreach ($ev['needs_unpacked'] as $need) {
                    $needs_unpacked[$need] = ($needs_unpacked[$need] ?? 0) + 1;
                }
            }
            $fc = (int)($ev['feelings_count'] ?? 0);
            $nc = (int)($ev['needs_count'] ?? 0);
            $fb = $fc === 0 ? '0' : ($fc <= 3 ? '1–3' : ($fc <= 7 ? '4–7' : '8+'));
            $nb = $nc === 0 ? '0' : ($nc <= 3 ? '1–3' : ($nc <= 7 ? '4–7' : '8+'));
            $feelings_counts[$fb] = ($feelings_counts[$fb] ?? 0) + 1;
            $needs_counts[$nb]    = ($needs_counts[$nb]    ?? 0) + 1;
            break;
    }
}

// Session funnel: ordered by most-common first page, then forward flow
// Use page_views counts (unique sessions that reached each page)
arsort($page_views);

// Drop-off: count of sessions whose last_page was each page
$drop_off = [];
foreach ($sessions as $s) {
    $lp = $s['last_page'] ?? null;
    if ($lp) $drop_off[$lp] = ($drop_off[$lp] ?? 0) + 1;
}
arsort($drop_off);

// Average active ms per page
$avg_time = [];
foreach ($page_active_ms as $page => [$total, $count]) {
    $avg_time[$page] = $count > 0 ? round($total / $count / 1000, 1) : 0;
}
arsort($avg_time);

// Top needs unpacked
arsort($needs_unpacked);

// Feelings/needs count histogram: enforce bucket order
$bucket_order = ['0', '1–3', '4–7', '8+'];
$f_hist = [];
$n_hist = [];
foreach ($bucket_order as $b) {
    $f_hist[$b] = $feelings_counts[$b] ?? 0;
    $n_hist[$b] = $needs_counts[$b]    ?? 0;
}

// Feeling section open counts
$section_order = ['feelings-fear', 'feelings-anger', 'feelings-distress'];
$section_counts = [];
foreach ($section_order as $s) {
    $section_counts[$s] = $section_opens[$s] ?? 0;
}

// Field fill rates
arsort($field_fills);

$total_sessions = count($sessions);

// ── Helpers ──────────────────────────────────────────────────────────────────
function json_vals(array $arr): string {
    return json_encode(array_values($arr), JSON_UNESCAPED_UNICODE);
}
function json_keys(array $arr): string {
    return json_encode(array_keys($arr), JSON_UNESCAPED_UNICODE);
}
function pct(int $a, int $b): string {
    return $b > 0 ? round($a / $b * 100) . '%' : '–';
}

?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Untangle This — Analytics</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, sans-serif; background: #f3f4f6; color: #1f2937; padding: 1.5rem; }
  h1 { font-size: 1.5rem; margin-bottom: 0.25rem; }
  .subtitle { color: #6b7280; font-size: 0.875rem; margin-bottom: 1.5rem; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(420px, 1fr)); gap: 1.25rem; }
  .card { background: #fff; border-radius: 10px; padding: 1.25rem; box-shadow: 0 1px 4px rgba(0,0,0,.08); }
  .card h2 { font-size: 1rem; margin-bottom: 0.75rem; color: #374151; }
  .stat { font-size: 2rem; font-weight: 700; color: #4f46e5; }
  .stat-label { font-size: 0.8rem; color: #6b7280; margin-top: 0.1rem; }
  canvas { max-height: 260px; }
  table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
  th, td { text-align: left; padding: 0.3rem 0.5rem; border-bottom: 1px solid #e5e7eb; }
  th { color: #6b7280; font-weight: 600; }
  .bar-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem; font-size: 0.82rem; }
  .bar-label { width: 11rem; flex-shrink: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .bar-track { flex: 1; background: #e5e7eb; border-radius: 3px; height: 14px; overflow: hidden; }
  .bar-fill  { height: 100%; background: #6366f1; border-radius: 3px; transition: width 0.4s; }
  .bar-num   { width: 3rem; text-align: right; color: #6b7280; }
</style>
</head>
<body>
<h1>Untangle This — Analytics dashboard</h1>
<p class="subtitle">
  <?= $total_sessions ?> sessions &nbsp;·&nbsp;
  Generated <?= date('j M Y, g:ia') ?> Brisbane time
</p>

<div class="grid">

  <!-- 1. Session funnel -->
  <div class="card">
    <h2>📈 Session funnel — unique sessions per page</h2>
    <?php if (empty($page_views)): ?>
      <p style="color:#9ca3af">No data yet.</p>
    <?php else:
      $max_pv = max($page_views) ?: 1;
      foreach ($page_views as $page => $cnt): ?>
        <div class="bar-row">
          <span class="bar-label" title="<?= htmlspecialchars($page) ?>"><?= htmlspecialchars($page) ?></span>
          <div class="bar-track"><div class="bar-fill" style="width:<?= round($cnt/$max_pv*100) ?>%"></div></div>
          <span class="bar-num"><?= $cnt ?></span>
        </div>
      <?php endforeach; endif; ?>
  </div>

  <!-- 2. Drop-off (last page) -->
  <div class="card">
    <h2>🚪 Session end — last page seen</h2>
    <?php if (empty($drop_off)): ?>
      <p style="color:#9ca3af">No session_end events yet.</p>
    <?php else:
      $max_do = max($drop_off) ?: 1;
      foreach ($drop_off as $page => $cnt): ?>
        <div class="bar-row">
          <span class="bar-label" title="<?= htmlspecialchars($page) ?>"><?= htmlspecialchars($page) ?></span>
          <div class="bar-track"><div class="bar-fill" style="width:<?= round($cnt/$max_do*100) ?>%;background:#f59e0b"></div></div>
          <span class="bar-num"><?= $cnt ?></span>
        </div>
      <?php endforeach; endif; ?>
  </div>

  <!-- 3. Time on page (active seconds avg) -->
  <div class="card">
    <h2>⏱ Average active time per page (seconds)</h2>
    <?php if (empty($avg_time)): ?>
      <p style="color:#9ca3af">No page_exit data yet.</p>
    <?php else:
      $max_t = max($avg_time) ?: 1;
      foreach ($avg_time as $page => $sec): ?>
        <div class="bar-row">
          <span class="bar-label" title="<?= htmlspecialchars($page) ?>"><?= htmlspecialchars($page) ?></span>
          <div class="bar-track"><div class="bar-fill" style="width:<?= round($sec/$max_t*100) ?>%;background:#10b981"></div></div>
          <span class="bar-num"><?= $sec ?>s</span>
        </div>
      <?php endforeach; endif; ?>
  </div>

  <!-- 4. Help engagement -->
  <div class="card">
    <h2>❓ Help topics opened (ui_open type=help)</h2>
    <?php if (empty($help_opens)): ?>
      <p style="color:#9ca3af">No help open events yet.</p>
    <?php else:
      arsort($help_opens);
      $max_h = max($help_opens) ?: 1;
      foreach ($help_opens as $topic => $cnt): ?>
        <div class="bar-row">
          <span class="bar-label" title="<?= htmlspecialchars($topic) ?>"><?= htmlspecialchars($topic) ?></span>
          <div class="bar-track"><div class="bar-fill" style="width:<?= round($cnt/$max_h*100) ?>%;background:#8b5cf6"></div></div>
          <span class="bar-num"><?= $cnt ?></span>
        </div>
      <?php endforeach; endif; ?>
  </div>

  <!-- 5. Feelings & needs depth -->
  <div class="card">
    <h2>💬 Feelings &amp; needs selected per session</h2>
    <?php if (array_sum($f_hist) === 0 && array_sum($n_hist) === 0): ?>
      <p style="color:#9ca3af">No session_end data yet.</p>
    <?php else: ?>
    <canvas id="depthChart"></canvas>
    <script>
    new Chart(document.getElementById('depthChart'), {
      type: 'bar',
      data: {
        labels: <?= json_vals($f_hist) ?>.map((_,i) => <?= json_keys($f_hist) ?>[i]),
        datasets: [
          { label: 'Feelings', data: <?= json_vals($f_hist) ?>, backgroundColor: '#f97316' },
          { label: 'Needs',    data: <?= json_vals($n_hist) ?>, backgroundColor: '#3b82f6' }
        ]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom' } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
    });
    </script>
    <?php endif; ?>
  </div>

  <!-- 6. Needs unpacked -->
  <div class="card">
    <h2>🔍 Needs explored in depth (from session_end)</h2>
    <?php if (empty($needs_unpacked)): ?>
      <p style="color:#9ca3af">No needs explored yet.</p>
    <?php else:
      $max_nu = max($needs_unpacked) ?: 1;
      $shown = array_slice($needs_unpacked, 0, 20, true);
      foreach ($shown as $need => $cnt): ?>
        <div class="bar-row">
          <span class="bar-label" title="<?= htmlspecialchars($need) ?>"><?= htmlspecialchars($need) ?></span>
          <div class="bar-track"><div class="bar-fill" style="width:<?= round($cnt/$max_nu*100) ?>%;background:#0ea5e9"></div></div>
          <span class="bar-num"><?= $cnt ?></span>
        </div>
      <?php endforeach; endif; ?>
  </div>

  <!-- 7. Feeling section engagement -->
  <div class="card">
    <h2>😨 Feeling-type sections opened</h2>
    <?php if (array_sum($section_counts) === 0): ?>
      <p style="color:#9ca3af">No section open events yet.</p>
    <?php else:
      $labels = ['Fear', 'Anger', 'Distress'];
      $keys   = ['feelings-fear', 'feelings-anger', 'feelings-distress'];
      $vals   = array_map(fn($k) => $section_counts[$k] ?? 0, $keys);
    ?>
    <canvas id="sectionChart"></canvas>
    <script>
    new Chart(document.getElementById('sectionChart'), {
      type: 'bar',
      data: {
        labels: <?= json_encode($labels) ?>,
        datasets: [{ label: 'Opens', data: <?= json_encode($vals) ?>,
          backgroundColor: ['#f87171','#fb923c','#a78bfa'] }]
      },
      options: { responsive: true, plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
    });
    </script>
    <?php endif; ?>
  </div>

  <!-- 8. Field completion -->
  <div class="card">
    <h2>✏️ Field completion rates</h2>
    <?php if (empty($field_fills)): ?>
      <p style="color:#9ca3af">No field_interaction events yet.</p>
    <?php else: ?>
    <table>
      <thead><tr><th>Field</th><th>Interactions</th><th>Filled</th><th>Rate</th></tr></thead>
      <tbody>
      <?php foreach ($field_fills as $fid => [$filled, $total]): ?>
        <tr>
          <td><?= htmlspecialchars($fid) ?></td>
          <td><?= $total ?></td>
          <td><?= $filled ?></td>
          <td><?= pct($filled, $total) ?></td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
    <?php endif; ?>
  </div>

  <!-- 9. Other UI opens -->
  <div class="card">
    <h2>🖥 All UI overlay opens</h2>
    <?php if (empty($ui_opens)): ?>
      <p style="color:#9ca3af">No ui_open events yet.</p>
    <?php else:
      arsort($ui_opens);
      $max_u = max($ui_opens) ?: 1;
      foreach ($ui_opens as $uname => $cnt): ?>
        <div class="bar-row">
          <span class="bar-label" title="<?= htmlspecialchars($uname) ?>"><?= htmlspecialchars($uname) ?></span>
          <div class="bar-track"><div class="bar-fill" style="width:<?= round($cnt/$max_u*100) ?>%;background:#6366f1"></div></div>
          <span class="bar-num"><?= $cnt ?></span>
        </div>
      <?php endforeach; endif; ?>
  </div>

</div><!-- .grid -->
</body>
</html>
