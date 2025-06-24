export async function getLevelConfig(id) {
  const response = await fetch(`/api/levels/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch level configuration');
  }
  return response.json();
}

export async function postLevelResult({ levelId, score, userId }) {
  const response = await fetch(`/api/levels/${levelId}/result`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ score, userId })
  });
  if (!response.ok) {
    throw new Error('Failed to post level result');
  }
  return response.json();
}
