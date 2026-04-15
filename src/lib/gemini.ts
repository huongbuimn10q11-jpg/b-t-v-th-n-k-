import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateMagicArt(
  base64Image: string,
  stylePrompt: string,
  description: string
): Promise<string | null> {
  try {
    // Remove the data:image/png;base64, prefix if it exists
    const base64Data = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: 'image/png',
            },
          },
          {
            text: `You are a magical AI artist for children. 
            I have provided a sketch drawn by a child. 
            Please transform this sketch into a beautiful, high-quality artwork.
            Style: ${stylePrompt}
            Child's description: ${description}
            
            The output should be a single high-quality image that captures the essence of the child's drawing but makes it look professional and magical.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    return null;
  } catch (error) {
    console.error("Error generating magic art:", error);
    return null;
  }
}
