import atob from "atob";


const base64ToJson = (file: string) => {
  const textToSplit = "base64,";
  let indexOfBase64 = file.indexOf(textToSplit);
  indexOfBase64 = indexOfBase64 + textToSplit.length;

  const stringToAtob = file.slice(indexOfBase64);
  const json = decodeURIComponent(atob(stringToAtob).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''))
  return JSON.parse(json)
};

export default base64ToJson