const state = {
  langList: ["en-US", "id-ID", "ja-JP", "zh-CN", "ms-MY", "es-ES", "ko-KR"],
  lang: "en-US",
  speakerList: [],
  speakerObjectList: [],
  speaker: null,
  speed: 1,
};

const getSpeakerList = () => {
  return new Promise((resolve, reject) => {
    const allSpeaker = speechSynthesis.getVoices();

    let speaker = allSpeaker.filter((speaker) => speaker.lang === state.lang);

    if (speaker.length) {
      resolve(speaker);
    } else {
      setTimeout(() => {
        speaker = allSpeaker.filter((speaker) => speaker.lang === state.lang);
        speaker.length ? resolve(speaker) : reject("Gagal mendapatkan data");
      }, 100);
    }
  });
};

const createOption = (data) => {
  return `
<option value=${data}>${data}</option>
  `;
};

const renderLangList = () => {
  const container = document.getElementById("lang");
  container.innerHTML = "";
  state.langList.forEach((lang) => (container.innerHTML += createOption(lang)));
};

const renderSpeakerList = () => {
  const container = document.getElementById("speaker");
  container.innerHTML = "";
  state.speakerList.forEach(
    (speaker) => (container.innerHTML += createOption(speaker))
  );
};

const updateSpeakerList = async () => {
  state.speakerObjectList = await getSpeakerList();
  state.speakerList = state.speakerObjectList.map((voice) => {
    let name = voice.name.split("-")[0].trim();
    name = name.split("Microsoft")[1]?.trim() || name;
    if (name.includes("(")) name = name.split("(")[0].trim();
    if (name.includes("Online")) name = name.split("Online")[0].trim();
    return name;
  });
  state.speaker = state.speakerObjectList[0];
};

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = state.speaker;
  utterance.lang = state.lang;
  utterance.rate = state.speed;

  speechSynthesis.speak(utterance);
};

document.addEventListener("DOMContentLoaded", () => {
  renderLangList();

  speechSynthesis.onvoiceschanged = async () => {
    await updateSpeakerList();
    renderSpeakerList();
  };

  document.addEventListener("change", async (e) => {
    const targetId = e.target.getAttribute("id");
    const targetName = e.target.getAttribute("name");

    switch (targetId) {
      case "lang":
        state.lang = e.target.value;
        await updateSpeakerList();
        renderSpeakerList();
        break;
      case "speaker":
        state.speaker = state.speakerObjectList.find((speaker) =>
          speaker.name.includes(e.target.value)
        );
        break;
    }

    if (targetName === "speed") {
      const speed = e.target.value;
      state.speed = Number(speed);
    }
  });

  document.getElementById("btnSubmit").addEventListener("click", () => {
    const text = document.getElementById("inputText").value;

    if (text.length > 0) {
      speak(text);
    }
  });
});
