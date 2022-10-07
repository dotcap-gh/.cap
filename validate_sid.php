<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$_GET["sid"] or die(json_encode(["solved" => false]));

session_id($_GET["sid"]);

session_start();

if ($_SESSION["solved"]) {
  $_SESSION["solved"] = false;
  echo json_encode(["solved" => true]);
} else {
  echo json_encode(["solved" => false]);
}
