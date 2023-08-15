from flask import Flask, request, jsonify
import openai

app = Flask(__name__)


openai.api_key = "YOUR_OPENAI_API_KEY"
@app.route('/generate_response',methods = ['POST'])

def generate_response():
    data = request.json
    prompt = data.get('prompt')


    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=1000
    )

    generated_response = response.choices[0].text.strip()
    return jsonify({"generated_response": generated_response})

if __name__ == '__main__':
    app.run(debug=True)