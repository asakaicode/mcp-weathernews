import { z } from "zod";

const inputSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

type Input = z.infer<typeof inputSchema>;

export const getWeatherTool = {
  name: "getWeather",
  definition: {
    title: "Get Weather",
    description: "Fetches the current weather for a given location.",
    inputSchema: inputSchema.shape,
  },
  handler: async ({ latitude, longitude }: Input) => {
    // Simulate fetching weather data
    return {
      temperature: 22,
      condition: "Sunny",
      location: `Lat: ${latitude}, Lon: ${longitude}`,
    };
  },
};