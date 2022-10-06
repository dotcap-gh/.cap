<?php

header("Content-Type: application/json");

session_start();

if ($_SESSION["correct"] == $_GET["index"]) {
  $_SESSION["solved"] = true;
  echo json_encode(["correct" => true]);
} else {
  echo json_encode(["correct" => false]);
}
