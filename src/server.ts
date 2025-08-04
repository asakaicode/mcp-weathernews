import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { getWeatherTool } from './tools/getWeather.js'

async function main() {
  const server = new McpServer({
    name: 'weather-server',
    version: '1.0.0',
  })

  server.registerTool(
    getWeatherTool.name,
    getWeatherTool.definition,
    getWeatherTool.handler,
  )

  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
