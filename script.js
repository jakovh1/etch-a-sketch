const grid = document.querySelector(".grid");
const addSizeInput = document.querySelector(".add-size-input");
const setGridSizeContainer = document.querySelector(".set-resolution-container");
const message = document.querySelector(".message");
const toolIcon = document.querySelector(".tool-icon");
const eraserSlider = document.querySelector("#eraser-slider");
let eraser = false;
let pen = false;

insertGrid(30);

addSizeInput.addEventListener('click', () => {

    if (setGridSizeContainer.children.length == 0) {

        let numberInput = document.createElement("input");
        numberInput.setAttribute("type", "number");
        numberInput.setAttribute("id", "size-input");
        numberInput.setAttribute("name", "size-input");
        numberInput.setAttribute("min", "16");
        numberInput.setAttribute("max", "100");
        numberInput.setAttribute("placeholder", "16-100");

        let setSizeButton = document.createElement("button");
        setSizeButton.setAttribute("class", "set-size");
        setSizeButton.textContent = "Set Resolution";

        setGridSizeContainer.appendChild(numberInput);
        setGridSizeContainer.appendChild(setSizeButton);

        numberInput.focus();

        numberInput.addEventListener('keypress', (e) => {

            if (numberInput.value >= 16 && numberInput.value <= 100 && e.key === 'Enter') {
                
                grid.innerHTML = "";

                insertGrid(numberInput.value);

                setGridSizeContainer.innerHTML = "";
            }
        })

        setSizeButton.addEventListener('click', () => {

            if (numberInput.value >= 16 && numberInput.value <= 100) {
                
                grid.innerHTML = "";

                insertGrid(numberInput.value);

                setGridSizeContainer.innerHTML = "";
            }
        })
    }

})

document.addEventListener('keypress', (e) => {

    if (e.key === 'e' || e.key === 'E') {
        eraser = true;
        pen = false;

        toolIcon.style.background = "url('./eraser.svg') no-repeat center center";
        message.textContent = 'Press "p" for pen.';
    }

    if (e.key === 'p' || e.key === 'P') {
        eraser = false;
        pen = true;

        toolIcon.style.background = "url('./pencil.svg') no-repeat center center";
        message.textContent = 'Press "e" for eraser.';
    }

    if (e.key === 'n' || e.key === 'N') {
        eraser = false;
        pen = false;

        toolIcon.style.background = "none";
        message.textContent = 'Press "p" for pen.';
    }


})

function insertGrid(num) {

    let width = `calc(100% / ${num})`;
    let height = `calc(100% / ${num})`;

    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            let pixel = document.createElement("div");

            pixel.setAttribute("class", "pixel-container");
            pixel.setAttribute("data-x", num*(j+1));

            pixel.style.width = width;
            pixel.style.height = height;
    
            grid.appendChild(pixel);
    
        }
    }

    const pixels = document.querySelectorAll(".pixel-container");


    pixels.forEach(pixel => {
        pixel.addEventListener('mouseenter', (e) => {
            //console.log(e);

            if (pen) {

                pixel.classList.add("hovered");

            } else if (eraser) {

                pixel.classList.remove("hovered");

            }
            
        })
    })

    eraserSlider.addEventListener('input', (e) => {
        
        pixels.forEach(pixel => {
            
            if(e.target.value > (pixel.getAttribute("data-x")-(num*(1/3))) && e.target.value < (pixel.getAttribute("data-x")+(num*(1/4)))) {
                pixel.classList.remove("hovered");
            }

            // if(e.target.value > (pixel.getAttribute("data-x")-(num/2)) && e.target.value < (pixel.getAttribute("data-x")+(num/2))) {
            //     pixel.classList.remove("hovered");
            // }
        })

    })


    let sliderWidth = Math.ceil(Number(getComputedStyle(grid).width.slice(0, -2)));
    eraserSlider.style.width = `${sliderWidth+5}px`;
    eraserSlider.setAttribute("max", num*num);

}

window.addEventListener('resize', () => {

    let sliderWidth = Math.ceil(Number(getComputedStyle(grid).width.slice(0, -2)));
    eraserSlider.style.width = `${sliderWidth+5}px`;
    
})