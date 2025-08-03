// 天気情報の型
interface Weather {
  id: number;
  main: string;
  description: string; // 「くもり」「晴れ」などの詳細
  icon: string;
}

// 現在の天気の型
interface CurrentWeather {
  dt: number;
  temp: number; // 気温 (ケルビン)
  feels_like: number;
  pressure: number;
  humidity: number;
  weather: Weather[]; // 配列になっている点に注意
}

// OpenWeatherMap APIレスポンス全体の型
interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  current: CurrentWeather;
  hourly: any[]; // 必要に応じて詳細な型を定義
  daily: any[]; // 必要に応じて詳細な型を定義
}