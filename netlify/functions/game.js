export async function handler (event, context) {
    const key = '0dfc1b8b7b814b3997d47a5395a4c8bb'
    const apiUrl = 'https://api.rawg.io/api/games'
    const randomPage = Math.floor(Math.random() * 1000) + 1
  
    try {
      const response = await fetch(`${apiUrl}?key=${key}&page=${randomPage}&page_size=1`)
      const data = await response.json()
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch data' }),
      }
    }
  }
  