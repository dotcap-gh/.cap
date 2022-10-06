let thisScript = document.currentScript;
let settings = JSON.parse(thisScript.getAttribute("settings")) || {
  classes: [],
};
let verifyBtn = document.createElement("button");
verifyBtn.textContent = "Verify that I'm human";
verifyBtn.type = "button";
settings.classes.forEach((className) => {
  verifyBtn.classList.add(className);
});
verifyBtn.classList.add("0cap");
verifyBtn.onclick = (e) => {
  addEventListener("message", (e) => {
    let data = e.data.split("__");
    let [type, sid] = data;
    type = type.slice("0cap_".length);
    let input = document.createElement("input");
    input.type = "hidden";
    input.name = "0cap_sid";
    input.value = sid;
    verifyBtn.insertAdjacentElement("afterend", input);
  });
  let challengeURLObject = new URL(thisScript.src);
  let challengeURL = `//${challengeURLObject.host}/captcha_dialog.html`;
  open(challengeURL, null, "width=480,height=480");
};
thisScript.insertAdjacentElement("afterend", verifyBtn);
