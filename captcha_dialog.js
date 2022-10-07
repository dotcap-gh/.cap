async function checkAnswer(index, sid) {
  let correct = await fetch(`/check_answer.php?index=${index}`, {
    credentials: "include",
  });
  let status = document.querySelector("#status");
  correct = await correct.json();
  correct = correct.correct;
  if (correct) {
    status.classList.remove("has-text-danger");
    status.classList.add("has-text-success");
    status.textContent = "Correct! Closing soon!";
    opener.postMessage(`0cap_done__${sid}`, "*");
    setTimeout(close, 500);
  } else {
    status.classList.add("has-text-danger");
    status.textContent = "Incorrect. Please try again.";
    setTimeout(displayChallenges, 100);
  }
}
async function displayChallenges() {
  let loadingModal = document.querySelector("#loadingmodal");
  loadingModal.showModal();
  let challenge = await fetch("/get_challenge.php", {
    credentials: "include",
  });
  let imagesArea = document.querySelector("#images");
  [...imagesArea.querySelectorAll("img")].forEach((img) => img.remove());
  let subject = document.querySelector("#subject");
  challenge = await challenge.json();
  subject.textContent = challenge.subject.friendlyname;
  challenge.images.forEach((image, i) => {
    let imageElement = document.createElement("img");
    imageElement.src = image.image;
    imageElement.style.width = "40%";
    imageElement.classList.add("_image");
    imageElement.classList.add("mr-4");
    imageElement.onclick = async (e) => {
      await checkAnswer(i, challenge.sid);
    };
    imagesArea.append(imageElement);
  });
  loadingModal.close();
}
displayChallenges();
