// Determine the active algorithmm
let activeAlgorithm = document.querySelector("h1");
let algorithmState = "Cesar cipher";
const allAlgorithms = Array.from(document.querySelectorAll("nav button"));
allAlgorithms.forEach((el) => {
  el.addEventListener("click", () => {
    allAlgorithms.forEach((btn) => btn.classList.remove("active"));
    el.classList.add("active");
    algorithmState = el.innerText;
    activeAlgorithm.innerText = `${algorithmState} algorithm`;
    resetForm();
  });
});

//determine the action of the algorithm
const allActions = Array.from(document.querySelectorAll(".choice button"));
let activeAction = "Encrypt";

allActions.forEach((el) => {
  el.addEventListener("click", () => {
    allActions.forEach((btn) => btn.classList.remove("active"));
    el.classList.add("active");
    activeAction = el.innerText;
  });
});

//form

let algorithmForm = document.querySelector("form");
let inputText = document.querySelector(".input-text");
let inputKey = document.querySelector(".input-key");
let error = document.querySelector(".error");
let result = document.querySelector(".final-result");
let cpyBtn = document.querySelector(".cpy-btn");
cpyBtn.style.display = "none";
let encryptionResult = "";
cpyBtn.addEventListener("click", () => {
  copyToClipboard(encryptionResult);
});
//Determine the form state according to the algorithm

let cesarBtn = document.querySelector(".cesar");
let hillBtn = document.querySelector(".hill");
let oneTimeBadBtn = document.querySelector(".onetimepad");
let playFairBtn = document.querySelector(".playfair");
let monoalphabetic = document.querySelector(".monoalphabetic");
let railFence = document.querySelector(".rail-fence");
let encBtn = document.querySelector(".enc");
let decBtn = document.querySelector(".dec");
let submitBtn = document.querySelector(`input[type="submit"]`);
let copyDesc = document.querySelector(".copy-result");
let textName = document.querySelector(".text-name");
encBtn.addEventListener("click", () => {
  submitBtn.value = "Encrypt";
  textName.innerText = "Plaintext";
  resetForm();
  if (algorithmState === "Monoalphabetic") {
    inputKey.value = "zyxwvutsrqponmlkjihgfedcba";
  }
  if (algorithmState === "Hill") {
    inputKey.value = "[[6, 1],[13, 10]]";
  }
});

decBtn.addEventListener("click", () => {
  submitBtn.value = "Decrypt";
  textName.innerText = "Ciphertext";
  resetForm();
  if (algorithmState === "Monoalphabetic") {
    inputKey.value = "zyxwvutsrqponmlkjihgfedcba";
  }
  if (algorithmState === "Hill") {
    inputKey.value = "[[6, 1],[13, 10]]";
  }
});

cesarBtn.addEventListener("click", () => {
  inputKey.type = "number";
  inputKey.value = 3;
});
oneTimeBadBtn.addEventListener("click", () => {
  inputKey.type = "text";
});
playFairBtn.addEventListener("click", () => {
  inputKey.type = "text";
  inputKey.value = "keyword";
});
monoalphabetic.addEventListener("click", () => {
  inputKey.type = "text";
  inputKey.value = "zyxwvutsrqponmlkjihgfedcba";
});
railFence.addEventListener("click", () => {
  inputKey.type = "number";
  inputKey.value = 3;
});
hillBtn.addEventListener("click", () => {
  inputKey.type = "text";
  inputKey.value = "[[6, 1],[13, 10]]";
});
//handling submit
algorithmForm.onsubmit = function (e) {
  e.preventDefault();

  if (algorithmState === "Cesar cipher") {
    if (activeAction === "Encrypt") {
      encryptionResult = caesarCipherEncrypt(inputText.value, +inputKey.value);
    } else {
      encryptionResult = caesarCipherDecrypt(inputText.value, +inputKey.value);
    }
    result.innerText = `${
      activeAction === "Encrypt" ? "Encryption " : "Decryption "
    }result is ${encryptionResult}`;
  } else if (algorithmState === "OneTimePad") {
    if (activeAction === "Encrypt") {
      encryptionResult = oneTimePadEncrypt(inputText.value, inputKey.value);
    } else {
      encryptionResult = oneTimePadDecrypt(inputText.value, inputKey.value);
    }
    result.innerText = `${
      activeAction === "Encrypt" ? "Encryption " : "Decryption "
    }result is ${encryptionResult}`;
  } else if (algorithmState === "PlayFair") {
    if (activeAction === "Encrypt") {
      encryptionResult = playfairEncrypt(inputText.value, inputKey.value);
    } else {
      encryptionResult = playfairDecrypt(inputText.value, inputKey.value);
    }
    result.innerText = `${
      activeAction === "Encrypt" ? "Encryption " : "Decryption "
    }result is ${encryptionResult}`;
  } else if (algorithmState === "Monoalphabetic") {
    if (activeAction === "Encrypt") {
      encryptionResult = monoalphabeticEncrypt(inputText.value, inputKey.value);
    } else {
      encryptionResult = monoalphabeticEncrypt(inputText.value, inputKey.value);
    }
    result.innerText = `${
      activeAction === "Encrypt" ? "Encryption " : "Decryption "
    }result is ${encryptionResult}`;
  } else if (algorithmState === "Rail Fence") {
    if (activeAction === "Encrypt") {
      encryptionResult = railFenceEncrypt(inputText.value, inputKey.value);
    } else {
      encryptionResult = railFenceDecrypt(inputText.value, inputKey.value, 26);
    }
    result.innerText = `${
      activeAction === "Encrypt" ? "Encryption " : "Decryption "
    }result is ${encryptionResult}`;
  } else {
    if (activeAction === "Encrypt") {
      try {
        encryptionResult = hillEncrypt(
          inputText.value,
          JSON.parse(inputKey.value)
        );
      } catch (err) {
        error.innerText = "key matrix must be a 2x2 matrix";
      }
    } else {
      try {
        encryptionResult = decrypt2x2(
          inputText.value,
          JSON.parse(inputKey.value)
        );
      } catch (err) {
        error.innerText = "key matrix must be a 2x2 matrix";
      }
    }
    result.innerText = `${
      activeAction === "Encrypt" ? "Encryption " : "Decryption "
    }result is ${encryptionResult}`;
  }
  inputKey.value = "";
  inputText.value = "";
  copyDesc.innerText = "";
  if (algorithmState === "Monoalphabetic") {
    inputKey.value = "zyxwvutsrqponmlkjihgfedcba";
  }
  if (algorithmState === "Hill") {
    inputKey.value = "[[6, 1],[13, 10]]";
  }
};
//Hill
function hillEncrypt(plainText, keyMatrix) {
  if (
    keyMatrix.length !== 2 ||
    keyMatrix[0].length !== 2 ||
    keyMatrix[1].length !== 2
  ) {
    error.innerText = "key matrix must be a 2x2 matrix";
    cpyBtn.style.display = "none";
    return "Failed please try again!";
  }
  if (plainText.length === 0) {
    error.innerText = "Plaintext can't be empty";
    cpyBtn.style.display = "none";
    return "Failed please try again!";
  }
  const blockSize = keyMatrix.length;
  const charToNum = (char) => {
    const charCode = char.toUpperCase().charCodeAt(0);
    return charCode >= "A".charCodeAt(0) && charCode <= "Z".charCodeAt(0)
      ? charCode - "A".charCodeAt(0)
      : null;
  };
  const numToChar = (num, isUpperCase) =>
    String.fromCharCode(
      num + (isUpperCase ? "A".charCodeAt(0) : "a".charCodeAt(0))
    );

  plainText = plainText.replace(/[^a-zA-Z]/g, "");

  while (plainText.length % blockSize !== 0) {
    plainText += "X";
  }

  let cipherText = "";

  for (let i = 0; i < plainText.length; i += blockSize) {
    const block = plainText.substr(i, blockSize);
    const blockVector = block.split("").map((char) => charToNum(char));
    if (blockVector.includes(null)) {
      continue;
    }

    const resultVector = keyMatrix.map(
      (row) => row.reduce((acc, val, j) => acc + val * blockVector[j], 0) % 26
    );

    const isUpperCase = block[0] === block[0].toUpperCase();
    const encryptedBlock = resultVector
      .map((num) => numToChar(num, isUpperCase))
      .join("");
    cipherText += encryptedBlock;
  }
  error.innerText = "";
  cpyBtn.style.display = "block";
  return cipherText;
}
// Calculate the modular multiplicative inverse of a number modulo m
function modInverse(a, m) {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return null;
}

// Function to calculate the determinant of a 2x2 matrix
function det2x2(matrix) {
  return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
}

// Function to decrypt the text using a 2x2 matrix key
function decrypt2x2(ciphertext, key) {
  const det = det2x2(key);
  console.log(det);

  // Ensure the determinant is relatively prime to 26
  if (gcd(det, 26) !== 1) {
    error.innerText = "Key is not invertible. Decryption not possible!";
    cpyBtn.style.display = "none";
    return "Failed please try again!";
  }
  if (ciphertext.length === 0) {
    error.innerText = "Ciphertext can't be empty";
    cpyBtn.style.display = "none";
    return "Failed please try again!";
  }
  const n = key.length;
  const inverseDet = modInverse(det, 26);

  // Calculate the inverse key matrix
  const inverseKey = [
    [key[1][1], -key[0][1]],
    [-key[1][0], key[0][0]],
  ];

  // Apply modular arithmetic to the elements of the inverse key matrix
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      inverseKey[i][j] = (inverseKey[i][j] * inverseDet) % 26;
      if (inverseKey[i][j] < 0) {
        inverseKey[i][j] += 26;
      }
    }
  }

  let plaintext = "";
  for (let i = 0; i < ciphertext.length; i += n) {
    const chunk = ciphertext.slice(i, i + n).toUpperCase();
    const chunkIndices = chunk
      .split("")
      .map((char) => char.charCodeAt(0) - "A".charCodeAt(0));
    const transformedChunk = [
      (inverseKey[0][0] * chunkIndices[0] +
        inverseKey[0][1] * chunkIndices[1]) %
        26,
      (inverseKey[1][0] * chunkIndices[0] +
        inverseKey[1][1] * chunkIndices[1]) %
        26,
    ];
    plaintext += transformedChunk
      .map((index) => String.fromCharCode(index + "A".charCodeAt(0)))
      .join("");
  }
  error.innerText = "";
  cpyBtn.style.display = "block";
  return plaintext;
}

// Function to calculate the greatest common divisor (GCD)
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

//Rail fence
function railFenceEncrypt(message, rails) {
  if (rails < 2) {
    error.innerText = "Number of rails must be 2 or more";
    cpyBtn.style.display = "none";
    return "Failed please try again!";
  }

  let fence = [];
  for (let i = 0; i < rails; i++) {
    fence.push([]);
  }

  let rail = 0;
  let direction = 1;

  for (let i = 0; i < message.length; i++) {
    fence[rail].push(message[i]);
    rail += direction;

    if (rail === 0 || rail === rails - 1) {
      direction = -direction;
    }
  }

  let encryptedMessage = "";
  for (let i = 0; i < rails; i++) {
    encryptedMessage += fence[i].join("");
  }
  error.innerText = "";
  cpyBtn.style.display = "block";
  return encryptedMessage;
}

function railFenceDecrypt(encryptedMessage, rails) {
  if (rails < 2) {
    error.innerText = "Number of rails must be 2 or more";
    cpyBtn.style.display = "none";
    return "Failed please try again!";
  }

  let fence = [];
  for (let i = 0; i < rails; i++) {
    fence.push([]);
  }

  let rail = 0;
  let direction = 1;

  for (let i = 0; i < encryptedMessage.length; i++) {
    fence[rail].push(null);
    rail += direction;

    if (rail === 0 || rail === rails - 1) {
      direction = -direction;
    }
  }

  let charIndex = 0;
  for (let i = 0; i < rails; i++) {
    for (let j = 0; j < fence[i].length; j++) {
      fence[i][j] = encryptedMessage[charIndex++];
    }
  }

  let decryptedMessage = "";
  rail = 0;
  direction = 1;

  for (let i = 0; i < encryptedMessage.length; i++) {
    decryptedMessage += fence[rail].shift();
    rail += direction;

    if (rail === 0 || rail === rails - 1) {
      direction = -direction;
    }
  }
  error.innerText = "";
  cpyBtn.style.display = "block";
  return decryptedMessage;
}

//mono
function monoalphabeticEncrypt(text, key) {
  if (key.length < 26) {
    error.innerText = "key length should be 26 character";
    cpyBtn.style.display = "none";
    return "Failed please try again!";
  }
  if (text.length === 0) {
    error.innerText = "Plaintext can't be empty";
    cpyBtn.style.display = "none";
    return "Failed please try again!";
  }
  const keyArray = key.split("");

  const charMap = {};
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < alphabet.length; i++) {
    charMap[alphabet[i]] = keyArray[i % keyArray.length];
  }

  const encryptedText = text
    .toLowerCase()
    .replace(/[a-z]/g, (char) => charMap[char]);
  cpyBtn.style.display = "block";
  error.innerText = "";
  return encryptedText;
}
function monoalphabeticDecrypt(text, key) {
  if (key.length < 26) {
    error.innerText = "key length should be 26 character";
    cpyBtn.style.display = "none";
    return "Failed please try again!";
  }
  if (text.length === 0) {
    error.innerText = "Ciphertext can't be empty";
    cpyBtn.style.display = "none";
    return "Failed please try again!";
  }
  const keyArray = key.split("");

  const charMap = {};
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < alphabet.length; i++) {
    charMap[keyArray[i % keyArray.length]] = alphabet[i];
  }

  const decryptedText = text
    .toLowerCase()
    .replace(/[a-z]/g, (char) => charMap[char]);
  cpyBtn.style.display = "block";
  error.innerText = "";
  return decryptedText;
}

function caesarCipherEncrypt(text, shift) {
  if (shift < 0) {
    shift += 26 * Math.floor((-1 * shift) / 26);
    shift += 26;
  }
  if (text.length == 0) {
    error.innerText = "Plain text can't be empty";
    cpyBtn.style.display = "none";
    return "Failed please try again!";
  }
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const uppercaseText = text.toUpperCase();
  let encryptedText = "";
  for (let i = 0; i < uppercaseText.length; i++) {
    const currentChar = uppercaseText[i];
    if (alphabet.includes(currentChar)) {
      const currentIndex = alphabet.indexOf(currentChar);
      const newIndex = (currentIndex + shift) % 26;
      encryptedText += alphabet[newIndex];
    } else {
      encryptedText += currentChar;
    }
  }
  error.innerText = "";
  cpyBtn.style.display = "block";
  return encryptedText;
}

function caesarCipherDecrypt(ciphertext, shift) {
  shift = shift % 26;
  if (shift < 0) {
    shift += 26 * Math.floor((-1 * shift) / 26);
    shift += 26;
  }
  if (ciphertext.length == 0) {
    error.innerText = "Cipher text can't be empty";
    cpyBtn.style.display = "none";
    return "Failed please try again!";
  }
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const uppercaseCiphertext = ciphertext.toUpperCase();
  let decryptedText = "";
  for (let i = 0; i < uppercaseCiphertext.length; i++) {
    const currentChar = uppercaseCiphertext[i];
    if (alphabet.includes(currentChar)) {
      const currentIndex = alphabet.indexOf(currentChar);
      const newIndex = (currentIndex - shift + 26) % 26;
      decryptedText += alphabet[newIndex];
    } else {
      decryptedText += currentChar;
    }
  }
  cpyBtn.style.display = "block";
  error.innerText = "";
  return decryptedText;
}
function oneTimePadEncrypt(plaintext, key) {
  if (plaintext.length !== key.length) {
    error.innerText = "Plaintext and key must be of the same length.";
    return "Failed please try again!";
  }
  if (plaintext.length == 0) {
    error.innerText = "plaintext can't be empty";
    cpyBtn.style.display = "none";
    return "Failed please try again!";
  }
  const plaintextCodes = Array.from(plaintext, (char) => char.charCodeAt(0));
  const keyCodes = Array.from(key, (char) => char.charCodeAt(0));
  console.log(plaintextCodes, keyCodes);
  const encryptedCodes = plaintextCodes.map(
    (code, index) => code ^ keyCodes[index]
  );
  console.log(encryptedCodes);
  cpyBtn.style.display = "block";
  error.innerText = "";
  return JSON.stringify(encryptedCodes);
}

function oneTimePadDecrypt(ciphertext, key) {
  if (ciphertext.length !== key.length) {
    error.innerText = "Ciphertext and key must be of the same length.";
    return "Failed please try again!";
  }
  if (ciphertext.length == 0) {
    error.innerText = "ciphertext can't be empty";
    cpyBtn.style.display = "none";
    return "Failed please try again!";
  }
  const ciphertextCodes = Array.from(ciphertext, (char) => char.charCodeAt(0));
  const keyCodes = Array.from(key, (char) => char.charCodeAt(0));
  const decryptedCodes = ciphertextCodes.map(
    (code, index) => code ^ keyCodes[index]
  );
  cpyBtn.style.display = "block";
  error.innerText = "";
  return JSON.stringify(decryptedCodes);
}

function prepareInput(text) {
  text = text.replace(/[^a-zA-Z]/g, "");

  text = text.toUpperCase();
  text = text.replace("J", "I");
  return text;
}

function generateKey(key) {
  key = prepareInput(key);

  const playfairMatrix = Array.from({ length: 5 }, () => Array(5).fill(""));
  const keySet = new Set();

  let i = 0,
    j = 0;
  for (const letter of key) {
    if (!keySet.has(letter)) {
      playfairMatrix[i][j] = letter;
      keySet.add(letter);
      j += 1;
      if (j === 5) {
        i += 1;
        j = 0;
      }
    }
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (const letter of alphabet) {
    if (letter !== "J" && !keySet.has(letter)) {
      playfairMatrix[i][j] = letter;
      keySet.add(letter);
      j += 1;
      if (j === 5) {
        i += 1;
        j = 0;
      }
    }
  }

  return playfairMatrix;
}

function findCharPosition(matrix, char) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (matrix[i][j] === char) {
        return { row: i, col: j };
      }
    }
  }
}

function playfairEncrypt(plaintext, key) {
  const matrix = generateKey(key);
  plaintext = prepareInput(plaintext);
  let cipherText = "";

  let i = 0;
  while (i < plaintext.length) {
    if (i === plaintext.length - 1) {
      plaintext += "X";
    } else if (plaintext[i] === plaintext[i + 1]) {
      plaintext = plaintext.slice(0, i + 1) + "X" + plaintext.slice(i + 1);
    }
    i += 2;
  }

  for (let i = 0; i < plaintext.length; i += 2) {
    const char1 = plaintext[i];
    const char2 = plaintext[i + 1];
    const { row: row1, col: col1 } = findCharPosition(matrix, char1);
    const { row: row2, col: col2 } = findCharPosition(matrix, char2);

    if (row1 === row2) {
      cipherText += matrix[row1][(col1 + 1) % 5] + matrix[row2][(col2 + 1) % 5];
    } else if (col1 === col2) {
      cipherText += matrix[(row1 + 1) % 5][col1] + matrix[(row2 + 1) % 5][col2];
    } else {
      cipherText += matrix[row1][col2] + matrix[row2][col1];
    }
  }
  cpyBtn.style.display = "block";
  error.innerText = "";
  return cipherText;
}
function playfairDecrypt(ciphertext, key) {
  const matrix = generateKey(key);
  ciphertext = prepareInput(ciphertext);
  let plaintext = "";

  let i = 0;
  // Loop through the ciphertext in pairs
  while (i < ciphertext.length - 1) {
    const char1 = ciphertext[i];
    const char2 = ciphertext[i + 1];
    const { row: row1, col: col1 } = findCharPosition(matrix, char1);
    const { row: row2, col: col2 } = findCharPosition(matrix, char2);

    if (row1 === row2) {
      plaintext +=
        matrix[row1][(col1 - 1 + 5) % 5] + matrix[row2][(col2 - 1 + 5) % 5];
    } else if (col1 === col2) {
      plaintext +=
        matrix[(row1 - 1 + 5) % 5][col1] + matrix[(row2 - 1 + 5) % 5][col2];
    } else {
      plaintext += matrix[row1][col2] + matrix[row2][col1];
    }

    i += 2;
  }

  // If the length is odd, append the last character to the plaintext without pairing
  if (i === ciphertext.length - 1) {
    const lastChar = ciphertext[i];
    const { row: row, col: col } = findCharPosition(matrix, lastChar);
    const inverseCol = (col - 1 + 5) % 5; // Decrypt the last character
    plaintext += matrix[row][inverseCol];
  }

  cpyBtn.style.display = "block";
  error.innerText = "";
  return plaintext;
}

function resetForm() {
  inputKey.value = "";
  inputText.value = "";
  error.innerText = "";
  result.innerText = "";
  copyDesc.innerText = "";
  cpyBtn.style.display = "none";
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      copyDesc.innerText = "Text copied to clipboard successfully";
    })
    .catch(() => {
      copyDesc.innerText = "Unable to copy text to clipboard";
    });
}
function isNotAlphabet(char) {
  const nonAlphabetRegex = /[^a-zA-Z]/;
  return nonAlphabetRegex.test(char);
}
function updateFormat(str, noSpacesStr) {
  let i = 0;
  let j = 0;
  let newText = "";
  for (let i = 0; i < str.length; i++) {
    if (isNotAlphabet(str[i])) {
      newText += str[i];
    } else {
      newText += noSpacesStr[j];
      j++;
    }
  }
  return newText;
}
