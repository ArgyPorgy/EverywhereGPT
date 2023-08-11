async function input(event){
    const userinput = event.target.value.trim();
    if(userinput.startsWith("h:")){
        const prompt = userinput.slice(2).trim();
        const generate = await generateresponse(prompt);

        const response= document.createElement('div');
        response.innerText=generate;
        event.target.insertAdjacentElement('afterend', response);
        event.target.value = ''; 
    }
}