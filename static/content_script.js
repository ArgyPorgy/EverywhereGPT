async function generateResponse(prompt){
    const response = await fetch("backend_url/generate_response",
    {
        method: "POST", headers : {
            "Content-type" : "application/json",
        }, 
    
      body: JSON.stringify({
        prompt : prompt,
      }),
    });

    const data = await response.json();

    return data.generate_response;
}





async function handleUserInput(event){
    const userinput = event.target.value.trim();
    if(userinput.startsWith("h:")){
        const prompt = userinput.slice(2).trim();
        const generate = await generateResponse(prompt);

        const responseElement= document.createElement('div');
        responseElement.innerText=generate;
        event.target.insertAdjacentElement('afterend',  responseElement);
        event.target.value = ''; 
    }
}