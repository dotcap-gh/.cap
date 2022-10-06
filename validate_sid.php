<?php

header("Content-Type: application/json");

$_GET["sid"] or die(json_encode(["solved" => false]));

session_id($_GET["sid"]);

session_start();

if ($_SESSION["solved"]) {
  echo json_encode(["solved" => true]);
} else {
  echo json_encode(["solved" => false]);
}
