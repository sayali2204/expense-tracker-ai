import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

import { expenseTools } from "./tools/expenses.js";

const server = new Server(
  {
    name: "expense-tracker-mcp",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {
        list: true,
        call: true
      }
    }
  }
);

/* ---------- tools/list ---------- */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: expenseTools.map(tool => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema
    }))
  };
});

/* ---------- tools/call ---------- */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const tool = expenseTools.find(t => t.name === request.params.name);

  if (!tool) {
    throw new Error(`Tool not found: ${request.params.name}`);
  }

  return await tool.execute(request.params.arguments);
});

const transport = new StdioServerTransport();
await server.connect(transport);
