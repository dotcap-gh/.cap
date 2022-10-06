<?php

header("Cache-Control: no-store, must-revalidate");
header("Content-Type: application/json");

function _get_image()
{
  $chunkNum = random_int(0, 36);
  $dataset = json_decode(file_get_contents("dataset/$chunkNum.json"));
  shuffle($dataset);
  return $dataset[0];
}

function get_images()
{
  $images = [_get_image(), _get_image()];
  while ($images[0]->name == $images[1]->name) {
    $images[1] = _get_image();
  }
  $correct = $images[0];
  shuffle($images);
  return ["correct" => $correct, "images" => $images];
}

function find_correct_index($correct, $images)
{
  for ($i = 0; $i < count($images); $i++) {
    if ($images[$i]->name == $correct->name) {
      return $i;
    }
  }
}

session_start([
  "cookie_lifetime" => 300,
]);

$images = get_images();
$_SESSION["solved"] = false;
$_SESSION["correct"] = find_correct_index(
  $images["correct"],
  $images["images"]
);

echo json_encode([
  "subject" => [
    "name" => $images["correct"]->name,
    "friendlyname" => $images["correct"]->friendlyname,
  ],
  "images" => $images["images"],
  "sid" => session_id(),
]);
