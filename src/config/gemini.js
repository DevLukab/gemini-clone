import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyC16Z1JOX2aQJsO_0tn-p7BbG59EowGWqY";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);
        
        if (!result || !result.response) {
            throw new Error("La respuesta de Gemini es inválida");
        }

        const responseText = await result.response.text(); // Esperamos la respuesta correctamente
        console.log("Respuesta de Gemini:", responseText);

        return responseText; // Retornamos el texto de la respuesta
    } catch (error) {
        console.error("Error en run():", error);
        return "Error en la generación de la respuesta.";
    }
}

export default run;
