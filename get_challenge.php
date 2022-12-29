<?php

header("Cache-Control: no-store, must-revalidate");
header("Content-Type: application/json");

$GLOBALS["subjects"] = json_decode(file_get_contents("subjects.json"));

function _get_image()
{
  $subjects2 = $GLOBALS["subjects"];
  shuffle($subjects2);
  $GLOBALS["randomSubject"] = $subjects2[0];
  $randomSubjectEncoded = rawurlencode($GLOBALS["randomSubject"]);
  $results = json_decode(file_get_contents("https://api.pupa.rf.gd/images?query=$randomSubjectEncoded"), true);
  $results = $results["results"];
  shuffle($results);
  return [
    "name" => $GLOBALS["randomSubject"],
    "image" => $results[0]["url"]
  ];
}

function get_images()
{
  $images = [_get_image(), _get_image()];
  while ($images[0]["name"] == $images[1]["name"]) {
    $images[1] = _get_image();
  }
  $correct = $images[0];
  shuffle($images);
  return ["correct" => $correct, "images" => $images];
}

function find_correct_index($correct, $images)
{
  for ($i = 0; $i < count($images); $i++) {
    if ($images[$i]["image"] == $correct["image"]) {
      return $i;
    }
  }
}

$images = get_images();
$_SESSION["solved"] = false;
$_SESSION["correct"] = find_correct_index(
  $images["correct"],
  $images["images"]
);

echo json_encode([
  "subject" => [
    "name" => $images["correct"]["name"],
  ],
  "images" => $images["images"],
  "sid" => session_id(),
]);
