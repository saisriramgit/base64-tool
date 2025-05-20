document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.getElementById(
    "inputTextEncDecTool"
  ) as HTMLTextAreaElement | null;
  const outputText = document.getElementById(
    "outputTextEncDecTool"
  ) as HTMLTextAreaElement | null;
  const encodeBase64Btn = document.getElementById("encodeBase64Btn");
  const decodeBase64Btn = document.getElementById("decodeBase64Btn");
  const encodeUrlBtn = document.getElementById("encodeUrlBtn");
  const decodeUrlBtn = document.getElementById("decodeUrlBtn");
  const copyOutputBtn = document.getElementById(
    "copyOutputBtnEncDecTool"
  ) as HTMLButtonElement | null;

  if (
    !inputText ||
    !outputText ||
    !encodeBase64Btn ||
    !decodeBase64Btn ||
    !encodeUrlBtn ||
    !decodeUrlBtn ||
    !copyOutputBtn
  ) {
    console.error(
      "One or more elements not found for Encoder/Decoder tool. Check IDs in index.html."
    );
    return;
  }

  encodeBase64Btn.addEventListener("click", () => {
    if (!inputText || !outputText) return;
    try {
      outputText.value = btoa(inputText.value);
    } catch (e) {
      outputText.value = "Error encoding. Invalid characters?";
      console.error("Base64 Encoding error: ", e);
    }
  });

  decodeBase64Btn.addEventListener("click", () => {
    if (!inputText || !outputText) return;
    try {
      outputText.value = atob(inputText.value);
    } catch (e) {
      outputText.value = "Error decoding. Invalid Base64 input.";
      console.error("Base64 decoding error: ", e);
    }
  });

  encodeUrlBtn.addEventListener("click", () => {
    if (!inputText || !outputText) return;
    try {
      outputText.value = encodeURIComponent(inputText.value);
    } catch (e) {
      outputText.value = "Error encoding URL component.";
      console.error("URL encoding error: ", e);
    }
  });

  decodeUrlBtn.addEventListener("click", () => {
    if (!inputText || !outputText) return;
    try {
      outputText.value = decodeURIComponent(inputText.value);
    } catch (e) {
      outputText.value = "Error decoding URL component. Malformed URI?";
      console.error("URL decoding error: ", e);
    }
  });

  copyOutputBtn.addEventListener("click", () => {
    if (!outputText?.value) return;
    navigator.clipboard
      .writeText(outputText.value)
      .then(() => {
        copyOutputBtn.textContent = "Copied!";
        setTimeout(() => {
          if (copyOutputBtn) copyOutputBtn.textContent = "Copy Output";
        }, 1500);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        alert("Failed to copy text.");
      });
  });
});
