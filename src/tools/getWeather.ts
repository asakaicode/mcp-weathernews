import { z } from 'zod'

const inputSchemaShape = {
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
}

const inputSchema = z.object(inputSchemaShape)
type Input = z.infer<typeof inputSchema>

export const getWeatherTool = {
  name: 'getWeather',
  definition: {
    title: 'Get Weather',
    description: 'Fetches the current weather for a given location.',
    inputSchema: inputSchemaShape,
  },
  handler: async ({ latitude, longitude }: Input) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}`,
      )
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()

      return getCurrentWeather(JSON.stringify(data))
    } catch (error) {
      console.error('Error fetching weather data:', error)
      throw new Error('Failed to fetch weather data')
    }
  },
}

/**
 * OpenWeatherMapのデータから現在の天気情報を取得する関数
 * @param jsonData APIから受け取ったJSON文字列
 */
const getCurrentWeather = (
  jsonData: string,
): { currentWeather: string; currentTemperature: string } => {
  // 1. JSON文字列をオブジェクトにパースし、型を適用する
  const weatherData: WeatherData = JSON.parse(jsonData)

  // 2. 必要な情報にアクセスする
  const current = weatherData.current
  const tempInKelvin = current.temp

  // weatherプロパティは配列なので、最初の要素を取得する
  const weatherInfo = current.weather[0]
  const weatherDescription = weatherInfo.description
  const weatherIcon = weatherInfo.icon

  // 3. 気温をケルビンから摂氏に変換
  const tempInCelsius = tempInKelvin - 273.15

  return {
    currentWeather: weatherDescription,
    currentTemperature: tempInCelsius.toFixed(1),
  }
}
