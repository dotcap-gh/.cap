let thisScript = document.currentScript;
let defaultSettings = {
  classes: [],
};
let settings =
  JSON.parse(thisScript.getAttribute("settings")) || defaultSettings;
Object.keys(defaultSettings).forEach((e) => {
  if (!(e in settings)) {
    settings[e] = defaultSettings[e];
  }
});
let verifyBtn = document.createElement("button");
verifyBtn.textContent = "Verify that I'm human";
verifyBtn.type = "button";
settings.classes.forEach((className) => {
  verifyBtn.classList.add(className);
});
verifyBtn.classList.add("dotcap");
verifyBtn.onclick = (e) => {
  addEventListener("message", (e) => {
    let data = e.data.split("__");
    let [type, sid] = data;
    type = type.slice("0cap_".length);
    let input = document.createElement("input");
    input.type = "hidden";
    input.name = "dotcap_sid";
    input.value = sid;
    verifyBtn.insertAdjacentElement("afterend", input);
    verifyBtn.textContent = "Verified";
    verifyBtn.disabled = true;
  });
  let challengeURLObject = new URL(thisScript.src);
  let challengeURL = `//${challengeURLObject.host}/captcha_dialog.html`;
  open(challengeURL, null, "width=480,height=480");
};
thisScript.insertAdjacentElement("afterend", verifyBtn);
