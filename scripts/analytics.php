<?php
/**
 * analytics.php — append-only analytics event receiver
 *
 * Accepts a JSON array of events via POST.
 * Appends each event as a line to analytics.jsonl.
 * Never logs IP addresses or any user-entered text.
 */

date_default_timezone_set('Australia/Brisbane');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

// Parse body
$body = file_get_contents('php://input');
$events = json_decode($body, true);

if (!is_array($events) || count($events) === 0) {
    http_response_code(400);
    exit;
}

// Allowed event names (whitelist — anything else is silently dropped)
$allowed_events = [
    'page_view',
    'page_exit',
    'navigation',
    'backtrack',
    'field_interaction',
    'ui_open',
    'ui_close',
    'session_end',
    'action',
];

// Payload keys that are safe to store (no free-text fields)
$safe_payload_keys = [
    // page tracking
    'page_name', 'from_page', 'to_page', 'method',
    // time
    'time_active_ms', 'time_idle_ms', 'time_open_ms', 'duration_ms',
    // field interaction
    'field_id', 'filled', 'length_bucket',
    // ui
    'type', 'name',
    // session end
    'last_page', 'feelings_count', 'needs_count', 'needs_unpacked',
    'feelings_selected', 'feelings_strong', 'needs_selected', 'needs_strong',
    // action
    'action_name', 'setting', 'value', 'track',
    // story word / clarify popup
    'word', 'word_type', 'feeling', 'need', 'selected', 'replaced', 'feelings_chosen', 'needs_chosen',
];

$log_file = __DIR__ . '/analytics.jsonl';
$lines = [];

foreach ($events as $event) {
    if (!is_array($event)) continue;

    $event_name = $event['event'] ?? '';
    if (!in_array($event_name, $allowed_events, true)) continue;

    // Build a safe record — never copy unknown keys
    $record = [
        'event'      => $event_name,
        'session_id' => substr((string)($event['session_id'] ?? ''), 0, 64),
        'timestamp'  => (int)($event['timestamp'] ?? time() * 1000),
        'server_time'=> date('Y-m-d H:i:s'),
    ];

    // Copy only whitelisted payload keys
    foreach ($safe_payload_keys as $key) {
        if (!isset($event[$key])) continue;
        $val = $event[$key];
        // array fields — fixed NVC vocabulary, safe to store
        $array_keys = ['needs_unpacked', 'feelings_selected', 'feelings_strong', 'needs_selected', 'needs_strong'];
        if (in_array($key, $array_keys, true)) {
            if (is_array($val)) {
                $record[$key] = array_map('strval', $val);
            }
        } elseif (is_scalar($val)) {
            $record[$key] = $val;
        }
    }

    $lines[] = json_encode($record, JSON_UNESCAPED_UNICODE);
}

if (count($lines) > 0) {
    file_put_contents(
        $log_file,
        implode(PHP_EOL, $lines) . PHP_EOL,
        FILE_APPEND | LOCK_EX
    );
}

http_response_code(204);
