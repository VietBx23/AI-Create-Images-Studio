import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from "../types";

// Initialize the Gemini API client
// Note: In a production environment, API calls should ideally be proxied through a backend
// to keep the API key secure. For this demo, we use the env var directly.
// FIX: Use process.env.API_KEY directly as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates an image based on the provided prompt and aspect ratio.
 * uses gemini-2.5-flash-image model.
 */
export const generateImageFromText = async (
  prompt: string,
  aspectRatio: AspectRatio
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        },
      },
    });

    // Iterate through parts to find the image data
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
            // Construct the Data URI
            const mimeType = part.inlineData.mimeType || 'image/png';
            return `data:${mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("Không tìm thấy dữ liệu hình ảnh trong phản hồi từ AI.");

  } catch (error: any) {
    console.error("Gemini Image Generation Error:", error);
    if (error.message) {
        throw new Error(`Lỗi tạo ảnh: ${error.message}`);
    }
    throw new Error("Đã xảy ra lỗi không xác định khi tạo hình ảnh.");
  }
};