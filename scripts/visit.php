<?php

date_default_timezone_set('Australia/Brisbane');

$file = "visits.txt";
$today = date("Y-m-d");
$timestamp = date("Y-m-d g:i:s A");
$ip = $_SERVER['REMOTE_ADDR'];

$counts = [];
if (file_exists($file)) {
	$lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
	foreach ($lines as $line) {
		list($date, $count) = explode(" ", $line);
		$counts[$date] = (int)$count;
	}
}

if (!isset($counts[$today])) {
	$counts[$today] = 0;
}

$counts[$today]++;

$output = "";
foreach ($counts as $date => $count) {
	$output .= "$date $count\n";
}

file_put_contents($file, $output);

$ip = $_SERVER['REMOTE_ADDR'];

$geo = @file_get_contents("http://ip-api.com/json/$ip");
$country = "Unknown";

if ($geo !== false) {
    $data = json_decode($geo, true);
    if (isset($data['country'])) {
        $country = $data['country'];
    }
}

file_put_contents("visit_ips.txt", "$timestamp - $ip - $country\n", FILE_APPEND);

echo "ok";