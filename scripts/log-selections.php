<?php

date_default_timezone_set('Australia/Brisbane');

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
	exit;
}

$record = [
	"time" => date("Y-m-d g:i:s A"),
	"feelings" => $data["feelings"] ?? [],
	"needs" => $data["needs"] ?? []
];

file_put_contents(
	"selection-log.jsonl",
	json_encode($record) . PHP_EOL,
	FILE_APPEND
);

echo "ok";