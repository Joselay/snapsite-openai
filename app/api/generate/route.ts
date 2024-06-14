import { NextResponse } from "next/server";
import OpenAi from "openai";

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are an expert TailwindCSS developer. A user will provide you with a low-fidelity wireframe of an application and you will return a single HTML file that uses TailwindCSS to create the website. Use creative license to make the application more complete. If you need to insert an image, use the service placehold.co to create a placeholder image. Response only with the HTML file.`;

export async function POST(request: Request) {
  const { image } = await request.json();

  if (!image) {
    return NextResponse.json("No image provided", { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      max_tokens: 4096,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: image,
            },
          ],
        },
      ],
    });
    return NextResponse.json(completion);
  } catch (error) {
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
