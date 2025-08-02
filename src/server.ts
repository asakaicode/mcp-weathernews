import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getWeatherTool } from "./tools/getWeather.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "weather-server",
  version: "1.0.0",
});

server.registerTool(
  getWeatherTool.name,
  getWeatherTool.definition,
  getWeatherTool.handler
);

const transport = new StdioServerTransport();
await server.connect(transport);