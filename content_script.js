const key = "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";

const iconHTML = `<img src="https://i.ibb.co/C6YL1tN/icon1-removebg-preview.png" alt="EverywhereGPT" width="30px" height="30px">`;

const inputElementSelector = `input[type=text], input[type=search], textarea, [contenteditable=true], textbox, [aria-label="Message Body"],[role=textbox],body.editable.LW-avf,tweet-box.rich-editor.notie,content,share-box,.Am Al editable LW-avf,div[g_editable="true"], Ar Au,r3,r7,.public-DraftStyleDefault-block,.public-DraftStyleDefault-block,.r-mk0yit,.r-13qz1uu,.css-1dbjc4n,share-creation-state__text-editor-redesigned .ql-editor,ql-editor,.css-1dbjc4n r-16y2uox r-bnwqim r-13qz1uu r-1g40b8q, div.ql-editor ql-blank, div > .ql-editor ql-blank,.Am.Al.editable,.Am.aO9.Al.editable,[data-text="true"]`;

function build(inputAll){
    inputAll.forEach(input => {
        const button = document.createElement('button');
        button.innerHTML= iconHTML;
        button.classList.add("floating-button");
        document.body.appendChild(button);

        function syncButtonPosition() {
            const inputFieldBoundingClientRect = input.getBoundingClientRect();
            button.style.top = `${inputFieldBoundingClientRect.y - 38}px`;
            button.style.left = `${inputFieldBoundingClientRect.x + inputFieldBoundingClientRect.width - 38}px`;
          }

          syncButtonPosition();
          window.addEventListener('click', syncButtonPosition());

          
function makeButtonDraggable(button) {
  let isDragging = false;
  let offset = { x: 0, y: 0 };

  button.addEventListener("mousedown", (e) => {
    isDragging = true;
    offset.x = e.clientX - button.getBoundingClientRect().left;
    offset.y = e.clientY - button.getBoundingClientRect().top;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    button.style.left = `${e.clientX - offset.x}px`;
    button.style.top = `${e.clientY - offset.y}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

makeButtonDraggable(button);


          button.addEventListener('click', async() => {
            button.disabled = "true";

            const editable = input.getAttribute('[contenteditable=true]');
            const inputText = editable? input.innerText : input. value;

            if(inputText){
                const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions",{
                    method: "POST", headers : {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${key}`,
                    },
                    body: JSON.stringify({
                        prompt: inputText,
                        max_tokens: 1000
                      })
          });

          const data = await response.json();
          console.log("here is the data fetched from openai : ", data);

          const output = data.choices[0].text;

          if(editable){
            input.innerText=output;
          }else{
            input.value = output;
          }
        }else{
          
          }
          button.disabled= null;
        });
    });


}

function main(){
    const inputAll = document.querySelectorAll(inputElementSelector);
    console.log("input elements are : ", inputAll);
  
    build(inputAll);
   
    
}

window.addEventListener('load',main);