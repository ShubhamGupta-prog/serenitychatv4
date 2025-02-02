import { SessionsClient } from "@google-cloud/dialogflow"
import { NextResponse } from "next/server"

const projectId = process.env.DIALOGFLOW_PROJECT_ID!
const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS!

if (!projectId || !keyFilename) {
  throw new Error("DIALOGFLOW_PROJECT_ID or GOOGLE_APPLICATION_CREDENTIALS is not set")
}

const sessionClient = new SessionsClient({ projectId, keyFilename })

export async function POST(request: Request) {
  const { message, sessionId } = await request.json()

  try {
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId)

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: "en"
        },
      },
    }

    const [response] = await sessionClient.detectIntent(request)
    const result = response.queryResult

    if (result && result.fulfillmentText) {
      return NextResponse.json({ response: result.fulfillmentText })
    } else {
      return NextResponse.json({ response: "I'm sorry, I didn't understand that." })
    }
  } catch (error) {
    console.error("Error processing message:", error)
    return NextResponse.json({ error: "An error occurred while processing your message." }, { status: 500 })
  }
}

