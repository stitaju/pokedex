import axios from 'axios';

interface FavoriteData {
  id: number;
  name: string;
  addedBy: string;
}

export const addFavoritePokemon = async (favoriteData: FavoriteData) => {
  try {
    const response = await axios.post(
      'http://localhost:5173/api/favorites',
      favoriteData
    );
    console.log('Favorite added:', response.data);
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Add a new function to delete a favorite
export const deleteFavoritePokemon = async (id: number, addedBy: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:5173/api/favorites?id=${id}&addedBy=${addedBy}`
    );
    console.log('Favorite deleted:', response.data);
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error('Error deleting favorite:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const checkFavoriteStatus = async (
  pokemonId: number,
  userId: string
): Promise<boolean> => {
  try {
    const response = await axios.get(
      `http://localhost:5173/api/favorites?addedBy=${userId}`
    );
    const favorites = response.data;

    const isFavorite = favorites.some(
      (fav: any) => fav.id === pokemonId
    );
    return isFavorite;
  } catch (error) {
    console.error('Failed to fetch favorites:', error);
    // Assuming it's not a favorite if fetching fails
    return false;
  }
}; 

export const fetchFavoriteData = async (
  // pokemonId: number,
  userId: string
): Promise<boolean> => {
  try {
    const response = await axios.get(
      `http://localhost:5173/api/favorites?addedBy=${userId}`
    );
    const favorites = response.data;
    return favorites;
  } catch (error) {
    console.error('Failed to fetch favorites:', error);
    // Assuming it's not a favorite if fetching fails
    return false;
  }
}; 