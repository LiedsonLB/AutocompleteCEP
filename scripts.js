//elementos//
const addresForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");
const BtnSubmit = document.querySelector("#save-btn");

const closeButton = document.querySelector("#close-message");

const fadeElement = document.querySelector("#fade");

//validate cep input
cepInput.addEventListener("keypress", (e) => {

    const onlynumbers = /[0-9]/;
    const key = String.fromCharCode(e.keyCode);

    //allow only numbers
    if(!onlynumbers.test(key)) {
        e.preventDefault();
        return;
    }
})

// Get address event
cepInput.addEventListener("keyup", (e) => {

    const inputValue = e.target.value

    //check if we have correct lenght
    if(inputValue.length === 8){
        getAddress(inputValue);
    }

})

// Get customer address form API
const getAddress = async (cep) => {
    toggleLoader();

    cepInput.blur();

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

    const response = await fetch(apiUrl);

    const data = await response.json();

    // show error and reset form
    if(data.erro === "true") {
        addresForm.reset();
        toggleLoader();
        toggleMessage("CEP inválido, tente novamente");
        return;
    }

    addressInput.value = data.logradouro;
    cityInput.value = data.localidade;
    neighborhoodInput.value = data.bairro;
    regionInput.value = data.uf;

    toggleLoader();
};

// show or hide loader
const toggleLoader = () => {
    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
};

// show or hide message
const toggleMessage = (msg) => {

    const messageElement = document.querySelector("#message");

    const messageElementText = document.querySelector("#message p");

    messageElementText.innerHTML = msg

    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
};

// close message modal
closeButton.addEventListener("click", () => toggleMessage());
