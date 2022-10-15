// import { saveAsPng, saveAsJpeg } from 'save-html-as-image';

// const path = require('save-html-as-image');


let endImage = [];


window.addEventListener('load', ()=> {
//     const mainBody = document.getElementById('mem');
//     mainBody.style.backgroundColor = randomHexColorCode();
//     // mainBody.style.backgroundColor = "black";
//     const container = document.getElementById('div-1');
//     const length = 154;
//     var result = '';
//     // abcdefghijklmnopqrstuvwxyz
//     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     var charactersLength = characters.length;
//     let colorArr = new Array(length).fill(0);
//     for (let index = 0; index < length; index++) {
//      colorArr[index] = (randomHexColorCode());   
//     }
//     const verticalLength = 150;

// for (let index = 0; index < verticalLength; index++) {
//     for ( var i = 0; i < length; i++ ) {
//           let myElm = document.createElement("p");	
//           myElm.innerText = characters.charAt(Math.floor(Math.random() * charactersLength));
//           (index+i) > length ? myElm.style.color = colorArr[index+i-length] : myElm.style.color = colorArr[index+i];		
//           container.appendChild(myElm);
//        }
// }
})

const randomHexColorCode = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};

    //Neeeeeeeeew

function onImageChange(event) {
    const imageFile = URL.createObjectURL(event.target.files[0]);
    createImage(imageFile, convertImage);

    

    
    //old
}

function createImage(imageFile, callback) {
    const image = document.createElement('img');
    image.onload = () => callback(image);
    image.setAttribute('src', imageFile);
}

function convertImage(image) {
    const canvas = drawImageToCanvas(image);
    const ctx = canvas.getContext('2d');
    
    let result = [];
    for (let y = 0; y < canvas.height; y++) {
      result.push([]);
      let rawData = [];
      for (let x = 0; x < canvas.width; x++) {
        let data = ctx.getImageData(x, y, 1, 1).data;
        result[y].push(data[0]);
        result[y].push(data[1]);
        result[y].push(data[2]);
      //   console.log(y)
      //   console.log(result[y]);
        const pixel = {
          R: data[0], 
          G: data[1], 
          B: data[2],
        }
        rawData.push(pixel);
      }
      endImage.push(rawData);
    }
    
    const arrayCode = `
      #define IMAGE_WIDTH ${canvas.width}
      #define IMAGE_HEIGHT ${canvas.height}
      #define BYTES_PER_PIXEL 3
      uint8_t imageData[IMAGE_HEIGHT][IMAGE_WIDTH * BYTES_PER_PIXEL] = ${convertArray(result)};
    `;
  //   console.log("Array: ",JSON.parse(JSON.stringify(convertArray(result))))
    // document.getElementById('result').innerHTML = arrayCode;

    // console.log("herevertical length")
    // console.log(endImage.length); //vertical length
    // console.log("horizontal length")
    // console.log(endImage[0].length); //horizontal length


    const height = endImage.length;
    const width = endImage[0].length;

    const mainBody = document.getElementById('mem');
    // mainBody.style.backgroundColor = randomHexColorCode();
    // mainBody.style.backgroundColor = "white";
    const container = document.getElementById('div-1');
    for (let i = 0; i < height; i++) {
        const newRow = document.createElement("div");        
        for (let index = 0; index < width; index++) {
            let newLet = document.createElement("p");	
            newLet.innerText = "A";
            newLet.style.color = `rgb(${endImage[i][index].R}, ${endImage[i][index].G}, ${endImage[i][index].B})`;
            // newLet.style.color = rgb(155,1555,155);

            newRow.appendChild(newLet);
        }
        container.appendChild(newRow);
        // container.appendChild(document.createElement("br"))
    }

//     const length = 154;
//     // abcdefghijklmnopqrstuvwxyz
//     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     var charactersLength = characters.length;
//     let colorArr = new Array(length).fill(0);
//     for (let index = 0; index < length; index++) {
//      colorArr[index] = (randomHexColorCode());   
//     }
//     const verticalLength = 150;

// for (let index = 0; index < verticalLength; index++) {
//     for ( var i = 0; i < length; i++ ) {
//           let myElm = document.createElement("p");	
//           myElm.innerText = characters.charAt(Math.floor(Math.random() * charactersLength));
//           (index+i) > length ? myElm.style.color = colorArr[index+i-length] : myElm.style.color = colorArr[index+i];		
//           container.appendChild(myElm);
//        }
// }
    const node = document.getElementById('div-1');
    // path.saveAsPng
    path.saveAsPng(node);
    path.saveAsPng(node, { filename: 'testscreen', printDate: true });


}
  
function drawImageToCanvas(image) {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
    // console.log(endImage);
  
    return canvas;
}

function convertArray(array) {
    return JSON.stringify(array).replace(/\[/g, '{').replace(/\]/g, '}');
}


// function exportHtmlPage(){
//     const node = document.getElementById('div-1');
// // path.saveAsPng
// path.saveAsPng(node);
// path.saveAsPng(node, { filename: 'testscreen', printDate: true });

// }