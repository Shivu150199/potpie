import data from '../data.json';
import dependency from '../dependency.json';
export const fetch = async (url) => {
  if (url === '/graph') {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      ok: true,
      json: async () => (data)
    };
  }

  if (url === '/dependencies') {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      ok: true,
      json: async () => (dependency)
    };
  }

  throw new Error('Not found');
};