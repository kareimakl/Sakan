export async function fetchFromApi(endpoint) {
  try {
    const res = await fetch(`https://sakan.runasp.net/api/${endpoint}`);

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API fetch error:", error);
    return null;
  }
}
