// agent.ts — Claude Agents SDK + Composio
//
// Requires COMPOSIO_API_KEY in the environment (set via your Claude Code
// environment's secrets/env config — never commit it to this file).

import { Composio } from "@composio/core";
import { ClaudeAgentSDKProvider } from "@composio/claude-agent-sdk";
import { createSdkMcpServer, query } from "@anthropic-ai/claude-agent-sdk";

const composio = new Composio({ provider: new ClaudeAgentSDKProvider() });
const userId = "user_zomla8";

// Create a tool router session
const session = await composio.create(userId);
const tools = await session.tools();

const customServer = createSdkMcpServer({
  name: "composio",
  version: "1.0.0",
  tools,
});

for await (const content of query({
  prompt: "Star the composiohq/composio repo on GitHub",
  options: {
    mcpServers: { composio: customServer },
    permissionMode: "bypassPermissions",
  },
})) {
  if (content.type === "assistant") {
    console.log("Claude:", content.message);
  }
}
