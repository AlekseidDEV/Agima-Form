const wrapperCont = document.querySelector(".wrapp_content_form");
const descriptionBlock = document.querySelector(".block_description_text");
const checkBox = document.querySelector(".checkbox");
const inputFile = document.getElementById("fileInput");
const textFileName = document.querySelector(".file_name");
const closeFileBtn = document.querySelector(".close_file");

const form = document.querySelector(".form");
const messageInput = document.querySelector(".input_message");

const sendForm = (persen) => {
  return fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(persen),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    }
  })
};

const validateForm = (elems) => {
  let succes = true;

  elems.forEach((elem) => {
    if (elem.value === "") {
      succes = false;
    }
  });

  return succes;
};

const submitForm = (e) => {
  if ((e.target.nodeName = "FORM")) {
    e.preventDefault();
    const inputs = document.querySelectorAll(".input");

    const formData = new FormData(form);
    const formBody = {};

    formData.forEach((value, key) => {
      formBody[key] = value;
    });

    if (validateForm(inputs) && checkBox.checked === true) {
      sendForm(formBody)
       .then(() => {
            inputs.forEach((input) => {
                input.value = ''
            })
       })
       .catch('упс, ошибка')
    } else {
      alert("заполните поля");
    }
  }
};

const hideFileBtn = () => {
  const labelBtnWrapp = document.querySelector(".text_input_file");

  if (messageInput.value !== "") {
    inputFile.removeAttribute("type");
    labelBtnWrapp.style.color = "grey";
  } else {
    inputFile.setAttribute("type", "file");
    labelBtnWrapp.style.color = "#000000";
  }
};

const blockAppearence = (e) => {
  if (e.target.id === "question") {
    form.style.display = "none";
    descriptionBlock.style.display = "flex";
  } else if (e.target.id === "exit_btn") {
    descriptionBlock.style.display = "none";
    form.style.display = "flex";
  }
};

const closeFile = () => {
  closeFileBtn.addEventListener("click", () => {
    inputFile.value = "";
    closeFileBtn.style.display = "none";
    textFileName.textContent = "";
  });
};

const getFile = () => {
  if (inputFile.files.length > 0) {
    const fileName = inputFile.files[0].name;
    textFileName.textContent = `${fileName}`;
    closeFileBtn.style.display = "flex";
    closeFile();
  } else {
    textFileName.textContent = "Файл не выбран";
  }
};

inputFile.addEventListener("change", getFile);
form.addEventListener("submit", submitForm);
messageInput.addEventListener("input", hideFileBtn);
wrapperCont.addEventListener("click", blockAppearence);
