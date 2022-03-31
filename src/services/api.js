export default async function currencies() {
  try {
    const CURRENCIES_URL = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(CURRENCIES_URL);
    const result = await response.json();
    return result;
  } catch (e) {
    throw new Error('erro ao carregar conversões');
  }
}
