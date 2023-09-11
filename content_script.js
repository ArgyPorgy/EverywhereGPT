//IMP : input your OpenAI API key here
const key = "";

const iconHTML = `<img src="https://i.ibb.co/C6YL1tN/icon1-removebg-preview.png" alt="EverywhereGPT" width="30px" height="30px">`;


// const gmailselector = document.querySelector('.T-I T-I-KE L3')

const inputElementSelector = 'input[type=text], canvas, .kix-canvas-tile-content, textarea, [contenteditable="true"], textbox, [role="textbox"], body.editable.LW-avf, tweet-box.rich-editor.notie, content, share-box, .Am.Al.editable.LW-avf, div[g_editable="true"], .Am.Al.editable, .ProseMirror[contenteditable=true], [contenteditable=true], .Am.Al.editable.LW-avf.tS-tW, .Am.aO9.Al.editable.LW-avf.tS-tW,.notranslate.public-DraftEditor-content,.public-DraftStyleDefault-block.public-DraftStyleDefault-ltr,div[aria-activedescendant],div.ql-editor, div.ql-editor.ql-blank';

const inputAll = document.querySelectorAll(inputElementSelector);

// Detect if the code is running in an iframe
if (window.self !== window.top) {
  // If it's an iframe, find the iframe element
  const iframe = document.querySelector('iframe'); 

  // Check if an iframe was found
  if (iframe) {
    // Access the iframe's content
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    console.log(iframeDocument);

    // // Select inputs within the iframe's content
    // const inputAll = iframeDocument.querySelectorAll(inputElementSelector);

  }
}

  
const button = document.createElement('button');
button.innerHTML = iconHTML;
button.classList.add("floating-button");
document.body.appendChild(button);



button.style.display = 'none';



function build(){

        document.addEventListener('mousedown', (event) => {
          const activeInput = event.target;

          function syncButtonPosition() {
            // const active = document.activeElement;
            const inputFieldBoundingClientRect = activeInput.getBoundingClientRect();
           button.style.position = "absolute";
           button.style.top = `${inputFieldBoundingClientRect.y + 50}px`;
           button.style.left = `${inputFieldBoundingClientRect.x + inputFieldBoundingClientRect.width - 100}px`;
          }
          
          if (activeInput.matches(inputElementSelector)) {
            button.style.display = 'block';
            syncButtonPosition();
            
          
          }
          // window.addEventListener('click', syncButtonPosition());

          button.addEventListener('click', async() => {
            button.disabled = "true";

            // const editable = activeInput.getAttribute('[contenteditable=true]');
            makeButtonDraggable(button);
            const editable = activeInput.getAttribute('contenteditable') === 'true';
            let inputText = '';
            if (editable) {
              // For contenteditable elements like Gmail compose box
              inputText = activeInput.innerText;
          } else {
              // For standard text inputs
              inputText = activeInput.value;
          }

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

          if (data && data.choices && data.choices.length > 0) {
            const output = data.choices[0].text;
            // console.log(`OpenAI API response →`, data);
            // console.log(`OpenAI API output →`, output);

          if(editable){
            // console.log("its editable");
            activeInput.innerText=output;
          }else{
            // console.log("its not editable");
            activeInput.value = output;
          }}
        }else{
          // console.log("no input bby");
         
          }
          button.disabled= null;
        });

      });



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



// buttonShown = true;

}

function main(){

    build();
   
    
}

window.addEventListener('load',main);