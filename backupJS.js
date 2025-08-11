// const state = {
//   lang: "en-US",
//   voicer: null,
//   speed: 1,
//   speakerList: [],
//   speakerObjectList: [],
//   countryCode: ["en-US", "id-ID", "ja-JP", "zh-CN", "ms-MY", "es-ES", "ko-KR"],
// };

// const getSpeakerListByLang = () => {
//   return new Promise((resolve, reject) => {
//     speechSynthesis.onvoiceschanged = () => {
//       const voicer = speechSynthesis.getVoices();
//       const speakerList = voicer.filter((voice) => voice.lang === state.lang);

//       if (!speakerList || speakerList.length < 1) {
//         reject(e);
//       }

//       resolve(speakerList);
//     };
//   });
// };

// const createOption = (data) => {
//   return `<option value=${data}>${data}</option>`;
// };

// const createLangList = () => {
//   const container = document.getElementById("lang");
//   container.innerHTML = "";

//   state.countryCode.forEach(
//     (code) => (container.innerHTML += createOption(code))
//   );
// };

// const createSpeakerList = () => {
//   const container = document.getElementById("speaker");
//   container.innerHTML = "";

//   state.speakerList.forEach(
//     (speaker) => (container.innerHTML += createOption(speaker))
//   );
// };

// const updateSpeakerList = async () => {
//   state.speakerObjectList = await getSpeakerListByLang(state.lang);
//   state.speakerList = state.speakerObjectList
//     .map((voice) => voice.name.split("-")[0].trim())
//     .map((name) => name.split("Microsoft")[1].trim())
//     .map((name) => (name.includes("(") ? name.split("(")[0].trim() : name));
// };

// // const speak = async (text) => {
// //   const utterance = new SpeechSynthesisUtterance(text);
// //   const speaker = await getSpeakerListByLang();
// //   utterance.voice;
// // };

// document.addEventListener("DOMContentLoaded", async () => {
//   createLangList();
//   try {
//     await updateSpeakerList();
//   } catch (e) {
//     console.error(e);
//     return;
//   }
//   createSpeakerList();

//   const btnSubmit = document.getElementById("btnSubmit");
//   btnSubmit.addEventListener("click", () => {
//     const text = document.getElementById("inputText").value;
//   });

//   document.addEventListener("change", async (e) => {
//     const targetId = e.target.getAttribute("id");

//     if (targetId === "lang") {
//       state.lang = e.target.value;

//       try {
//         state.speakerObjectList = await getSpeakerListByLang();
//       } catch (e) {
//         console.error(e);
//         return;
//       }

//       state.speakerList = state.speakerObjectList
//         .map((voice) => voice.name.split("-")[0].trim())
//         .map((name) => name.split("Microsoft")[1].trim())
//         .map((name) => (name.includes("(") ? name.split("(")[0].trim() : name));

//       createSpeakerList();
//     }
//   });
// });
