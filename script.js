const imageCanvas = document.getElementById("image-canvas");
const filtercontainer = document.querySelector(".filter");
const imageinput = document.getElementById("image-input");
const canvasctx = imageCanvas.getContext("2d");
const resetbtn = document.querySelector("#reset-btn");
const downloadbtn = document.querySelector("#download-btn");
const presetcontainer = document.querySelector(".presets");

let file = null;
let img = null;

let filters =
{
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"

    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    huerotation: {
        value: 100,
        min: -180,
        max: 180,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 100,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
}

function CreateFilterElement(name, unit="%", min=0, max=200, value=100)
{
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.name = name;
    input.min = min;
    input.max = max;
    input.value = value;

    const p = document.createElement("p");
    p.innerText = name;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", (event)=>{
       
        filters[name].value = input.value;
        applyFilters();


    });
    return div;
}

function CreateFilters()
{
    Object.keys(filters).forEach(key=>{

    const filterElement = CreateFilterElement(key, filters[key].unit, filters[key].min, filters[key].max, filters[key].value);
    filtercontainer.appendChild(filterElement);

})
}
CreateFilters();
// Object.keys(filters).forEach(key=>{

//     const filterElement = CreateFilterElement(key, filters[key].unit, filters[key].min, filters[key].max, filters[key].value);
//     filtercontainer.appendChild(filterElement);

// })

imageinput.addEventListener("change", (event)=>{
    const placeholder = document.querySelector(".placeholder");
    const file = event.target.files[0];
    img = new Image();
    img.src = URL.createObjectURL(file);    
    placeholder.style.display = "none";
    img.onload = function(){
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasctx.drawImage(img, 0, 0);
    }

     
});

function applyFilters()
{
    canvasctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    canvasctx.filter = `brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.huerotation.value}${filters.huerotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})`; 
    
    canvasctx.drawImage(img, 0, 0);
    
}

resetbtn.addEventListener("click", ()=>{
    filters =
{
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"

    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    huerotation: {
        value: 100,
        min: -180,
        max: 180,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 100,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },




    }
    applyFilters();

    filtercontainer.innerHTML = "";
    CreateFilters();


});

downloadbtn.addEventListener("click", ()=>{
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
});

const presets = {
    normal: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        huerotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    drama: {
        brightness: 95,
        contrast: 140,
        saturation: 130,
        huerotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 105,
        contrast: 90,
        saturation: 70,
        huerotation: -10,
        blur: 1,
        grayscale: 10,
        sepia: 35,
        opacity: 100,
        invert: 0
    },

    oldschool: {
        brightness: 95,
        contrast: 110,
        saturation: 60,
        huerotation: 0,
        blur: 0.5,
        grayscale: 40,
        sepia: 50,
        opacity: 100,
        invert: 0
    },

    cinematic: {
        brightness: 90,
        contrast: 130,
        saturation: 120,
        huerotation: -15,
        blur: 0,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    blackwhite: {
        brightness: 100,
        contrast: 120,
        saturation: 0,
        huerotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    }
};



Object.keys(presets).forEach(key=>{
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = key;
    button.style.textTransform = "capitalize";
    button.style.color = "var(--color-white)";
    presetcontainer.appendChild(button);

    button.addEventListener("click", ()=>{
        
        const preset = presets[key];
        Object.keys(preset).forEach(filterKey=>{
            filters[filterKey].value = preset[filterKey];
        });

        applyFilters();
        filtercontainer.innerHTML = "";
        CreateFilters();
    });
      
});

