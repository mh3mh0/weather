import card from "../src/components/card.js";

const cardsInserted = [];

const cardsContainer = document.querySelector("div.cards-container");

const closeButton = (event) => {
  if (
    event.target.nodeName === "svg" ||
    event.target.parentNode.nodeName === "svg"
  ) {
    if (event.target.parentElement.nodeName === "DIV") {
      const elId = parseInt(event.target.parentElement.dataset.id);
      const index = cardsInserted.indexOf(elId);
      cardsInserted.splice(index, 1);
      event.target.parentElement.remove();
    } else {
      const elId = parseInt(
        event.target.parentElement.parentElement.dataset.id
      );
      const index = cardsInserted.indexOf(elId);
      cardsInserted.splice(index, 1);
      event.target.parentElement.parentElement.remove();
    }
  }
};

cardsContainer.addEventListener("click", closeButton);

const renderData = () => {
  const input = document.querySelector("input");
  const submitButton = document.querySelector("button");

  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    if (!input.value) {
      input.classList.add("bad-input");
      input.placeholder = "Add a location";
      return;
    }

    // @ts-ignore
    const { cardContainer, id } = await card(input.value);
    if (!cardContainer) {
      input.value = "";
      input.classList.add("bad-input");
      input.placeholder = "Invalid location";
      return;
    }

    if (cardsInserted.includes(id)) {
      input.classList.add("bad-input");
      input.placeholder = "Already searched";
      input.value = "";
      return;
    }

    input.classList.remove("bad-input");
    cardsContainer.insertAdjacentElement("afterbegin", cardContainer);
    input.value = "";
    input.placeholder = "Add a location";
    cardsInserted.push(id);
  });
};

renderData();
