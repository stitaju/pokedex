export const searchPokemonTypes = async (types:any, dispatch:any, setLoading:any) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch('http://localhost:5173/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ types }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    setTimeout(()=> {
            dispatch(setLoading(false));
    }, 800)

    return result;
  } catch (error) {
    console.error('Error posting data:', error);
              setTimeout(()=> {
            dispatch(setLoading(false));
    }, 800)
    return null;
  }
};
