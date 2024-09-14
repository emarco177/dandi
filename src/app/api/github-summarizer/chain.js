import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

export async function summarizeReadme(readmeContent) {
  const model = new ChatOpenAI({ temperature: 0 });

  const responseSchema = z.object({
    summary: z.string().describe("A concise summary of the GitHub repository"),
    cool_facts: z.array(z.string()).describe("A list of 2 interesting facts about the repository"),
  });

  const outputParser = StructuredOutputParser.fromZodSchema(responseSchema);

  const prompt = ChatPromptTemplate.fromTemplate(`
Summarize this github repository from this readme file content:

{readmeContent}

{format_instructions}

Provide your response in the format specified above.
`);

  const chain = RunnableSequence.from([
    {
      readmeContent: (input) => input.readmeContent,
      format_instructions: async () => outputParser.getFormatInstructions(),
    },
    prompt,
    model,
    outputParser,
  ]);

  const result = await chain.invoke({ readmeContent });
  return result;
}