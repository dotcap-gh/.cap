async function checkAnswer(index, sid, loadingModal) {
  loadingModal.showModal();
  let correct = await fetch(`/check_answer.php?index=${index}`, {
    credentials: "include",
  });
  let status = document.querySelector("#status");
  correct = await correct.json();
  correct = correct.correct;
  loadingModal.close();
  if (correct) {
    status.classList.remove("has-text-danger");
    status.classList.add("has-text-success");
    status.textContent = "Correct! Closing soon!";
    (opener ?? parent).postMessage(`0cap_done__${sid}`, "*");
    close();
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
  subject.textContent = challenge.subject.name;
  challenge.images.forEach((image, i) => {
    let imageElement = document.createElement("img");
    imageElement.src = image.image;
    imageElement.style.width = "40%";
    imageElement.classList.add("_image");
    imageElement.classList.add("mr-4");
    imageElement.onclick = async (e) => {
      await checkAnswer(i, challenge.sid, loadingModal);
    };
    imageElement.onerror = async () => await displayChallenges();
    imagesArea.append(imageElement);
  });
  loadingModal.close();
}
(async () => await displayChallenges())();
document.querySelector("#another").onclick = async () => await displayChallenges();