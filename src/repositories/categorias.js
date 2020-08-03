import config from '../config';

const URL_CATEGORIES = `${config.URL_BACKEND_TOP}/categorias`;

async function getAll() {
  const response = await fetch(URL_CATEGORIES);

  if (response.ok) {
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  throw new Error('Não foi possível pegar os dados :(');
}

async function getAllWithVideos() {
  const response = await fetch(`${URL_CATEGORIES}?_embed=videos`);

  if (response.ok) {
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  throw new Error('Não foi possível pegar os dados :(');
}

export default {
  getAllWithVideos,
  getAll,
};
