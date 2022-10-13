window.addEventListener('load', ()=> {
    const mainBody = document.getElementById('mem');
    mainBody.style.backgroundColor = randomHexColorCode();
    // mainBody.style.backgroundColor = "black";
    const container = document.getElementById('div-1');
    const length = 154;
    var result           = '';
    // abcdefghijklmnopqrstuvwxyz
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    let colorArr = new Array(length).fill(0);
    for (let index = 0; index < length; index++) {
     colorArr[index] = (randomHexColorCode());   
    }
    const verticalLength = 150;

for (let index = 0; index < verticalLength; index++) {
    for ( var i = 0; i < length; i++ ) {
          let myElm = document.createElement("p");	
          myElm.innerText = characters.charAt(Math.floor(Math.random() * charactersLength));
          (index+i) > length ? myElm.style.color = colorArr[index+i-length] : myElm.style.color = colorArr[index+i];		
          container.appendChild(myElm);
       }
}
})


const randomHexColorCode = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};