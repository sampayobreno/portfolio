import { NextResponse } from "next/server";
import { SYSTEM_KNOWLEDGE, getAssistantKnowledgeResult } from "@/lib/portfolioAssistant";

export async function POST(request) {
  try {
    const body = await request.json();
    const { message = "", lang = "en", history = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    // Curated knowledge result with contextual follow-ups and action pills
    const curated = getAssistantKnowledgeResult(message, lang, history);

    // Live Gemini call with multi-turn conversation memory if API key provided
    if (geminiKey) {
      try {
        const contents = [];
        if (Array.isArray(history) && history.length > 0) {
          history.slice(-6).forEach((turn) => {
            if (turn && turn.text) {
              contents.push({
                role: turn.sender === "user" ? "user" : "model",
                parts: [{ text: turn.text }]
              });
            }
          });
        }

        contents.push({
          role: "user",
          parts: [{ text: message }]
        });

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: SYSTEM_KNOWLEDGE }]
              },
              contents,
              generationConfig: {
                temperature: 0.35,
                maxOutputTokens: 500
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({
              reply,
              actions: curated.actions || [],
              followUps: curated.followUps || [],
              detectedLang: curated.detectedLang || lang,
              source: "gemini"
            });
          }
        }
      } catch (err) {
        console.warn("Gemini API call failed, falling back to curated knowledge:", err);
      }
    }

    // Live OpenAI call with multi-turn conversation memory if API key provided
    if (openaiKey) {
      try {
        const chatMessages = [
          { role: "system", content: SYSTEM_KNOWLEDGE }
        ];

        if (Array.isArray(history) && history.length > 0) {
          history.slice(-6).forEach((turn) => {
            if (turn && turn.text) {
              chatMessages.push({
                role: turn.sender === "user" ? "user" : "assistant",
                content: turn.text
              });
            }
          });
        }

        chatMessages.push({
          role: "user",
          content: message
        });

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: chatMessages,
            temperature: 0.35,
            max_tokens: 500
          })
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data?.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              reply,
              actions: curated.actions || [],
              followUps: curated.followUps || [],
              detectedLang: curated.detectedLang || lang,
              source: "openai"
            });
          }
        }
      } catch (err) {
        console.warn("OpenAI API call failed, falling back to curated knowledge:", err);
      }
    }

    // Seamless instant curated response with rich navigation actions & evolving follow-ups
    return NextResponse.json({
      reply: curated.reply,
      actions: curated.actions || [],
      followUps: curated.followUps || [],
      detectedLang: curated.detectedLang || lang,
      source: "curated"
    });
  } catch (error) {
    console.error("Assistant API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
