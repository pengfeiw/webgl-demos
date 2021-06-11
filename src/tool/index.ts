export const createSlider = (labelText: string, value: string, min: string, max: string, onInput: (value: string) => void) => {
    const divElement = document.createElement("div");
    const labelElement = document.createElement("label");
    labelElement.textContent = labelText;
    const slideElement = document.createElement("input");
    slideElement.setAttribute("type", "range");
    slideElement.setAttribute("min", min);
    slideElement.setAttribute("max", max);
    slideElement.addEventListener("input", () => onInput(slideElement.value));
    slideElement.defaultValue = value;

    divElement.appendChild(labelElement);
    divElement.appendChild(slideElement);
    document.body.appendChild(divElement);
};
