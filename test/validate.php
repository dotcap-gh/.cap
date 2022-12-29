<?php
echo "<script>location = '" .
  "http://" .
  $_SERVER["HTTP_HOST"] .
  "/validate_sid.php?sid=" .
  $_GET["dotcap_sid"] .
  "'</script>";
