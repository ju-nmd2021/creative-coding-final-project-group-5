const p5container = document.getElementById("p5container");
addEventListener("DOMContentLoaded", () => {
    p5container.innerHTML = "";

    const iframe = document.createElement("iframe");
    iframe.style.width = "500px";
    iframe.style.height = "500px";
    iframe.style.border = "none";

    const bodyElement = document.createElement("div");

    const p5script = document.createElement("script");
    p5script.type = "text/javascript";
    p5script.src = "assets/p5.min.js";
    p5script.defer = true;
    bodyElement.appendChild(p5script);

    const toneScript = document.createElement("script");
    toneScript.type = "text/javascript";
    toneScript.src = "https://unpkg.com/tone";
    toneScript.defer = true;
    bodyElement.appendChild(toneScript);

    const codeScript = document.createElement("script");
    codeScript.type = "text/javascript";
    codeScript.src = "../musicGenerationSystem.js";
    codeScript.defer = true;
    bodyElement.appendChild(codeScript);

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "assets/iframe.css";
    bodyElement.appendChild(styleLink);

    iframe.srcdoc = bodyElement.innerHTML;
    p5container.appendChild(iframe);
});