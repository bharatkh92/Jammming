const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};
const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};
const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

// add your spotify app developper client ID and redirectURI here
const clientId = "66658c358a2d4036983a5e036dad9f41";
const redirectUri = "http://127.0.0.1:5173/callback";
// const redirectUri = "https://codecademyjammingbharatkh92.netlify.app/callback";

// function to get auth code to later request access token for api calls
export const getUserAuth = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);
  const scope =
    "user-read-private user-read-email playlist-modify-private playlist-modify-public playlist-read-private user-library-read user-library-modify";
  const authEndpoint = new URL("https://accounts.spotify.com/authorize");
  // generated in the previous step
  window.localStorage.setItem("code_verifier", codeVerifier);
  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };
  authEndpoint.search = new URLSearchParams(params).toString();
  window.location.href = authEndpoint.toString();
};

// function to get access token using auth code
export const getToken = async (code, setUserProfile, setUserPlaylists) => {
  // stored in the previous step
  const codeVerifier = localStorage.getItem("code_verifier");

  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };

  try {
    const response = await fetch(url, payload);
    if (response.ok) {
      const tokenResult = await response.json();
      localStorage.setItem("spotify_access_token", tokenResult.access_token);
      localStorage.setItem("spotify_refresh_token", tokenResult.refresh_token);
      const profileResult = await fetchUserProfile(setUserProfile);
      const userPlaylistsResult = await fetchUserPlaylists(setUserPlaylists);
      return true;
    } else {
      console.log(`error response is ${response}`);
      return false;
    }
  } catch (e) {
    console.log(`error access token request failed ${e}`);
  }
};

export async function fetchWithAuth(
  endpoint,
  payload = {},
  isRefreshCalled = false
) {
  const spotify_access_token = localStorage.getItem("spotify_access_token");
  const defaultPayload = {
    ...payload,
    headers: {
      ...payload.headers,
      Authorization: `Bearer ${spotify_access_token}`,
    },
  };

  try {
    const response = await fetch(endpoint, defaultPayload);
    if (response.ok) {
      const result = await response.text();
      return result ? JSON.parse(result) : true;
    } else if (response.status === 401 && !isRefreshCalled) {
      isRefreshCalled = true;
      const refreshTokenResult = await getRefreshToken();
      if (refreshTokenResult) {
        return fetchWithAuth(endpoint, payload, isRefreshCalled);
      }
    }
  } catch (e) {
    console.log(`Error while fetchWithAuth ${e}`);
  }
}

export async function fetchUserProfile(setUserProfile) {
  const userProfileEndpoint = "https://api.spotify.com/v1/me";
  const payload = {
    method: "GET",
  };

  try {
    const result = await fetchWithAuth(userProfileEndpoint, payload);
    setUserProfile((prevData) => ({
      ...prevData,
      username: result.display_name,
      userId: result.id,
    }));
  } catch (e) {
    console.log(`error while fetching usser profile ${e}`);
  }
}

export async function fetchUserPlaylists(setUserPlaylists) {
  const userPlaylistEndpoint =
    "https://api.spotify.com/v1/me/playlists?limit=50";

  const payload = {
    method: "GET",
  };
  try {
    const result = await fetchWithAuth(userPlaylistEndpoint, payload);
    setUserPlaylists(result.items);
    return true;
  } catch (e) {
    console.log(`Error while fetching user playlists ${e}`);
  }
}

export async function getRefreshToken() {
  // refresh token that has been previously stored
  const refreshToken = localStorage.getItem("spotify_refresh_token");
  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
    }),
  };
  try {
    const response = await fetch(url, payload);
    const result = await response.json();
    if (response.ok) {
      localStorage.setItem("spotify_access_token", result.access_token);
      if (result.refresh_token) {
        localStorage.setItem("spotify_refresh_token", result.refresh_token);
      }
      return result.access_token;
    } else {
      return response.status;
    }
  } catch (e) {
    console.error(e);
  }
}

export async function spotifySearch(searchText) {
  const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    searchText
  )}&type=track`;

  try {
    const result = await fetchWithAuth(searchEndpoint);
    // refreshing token after expiry
    if (result) {
      return result.tracks.items;
    } else {
      console.log(`Error while searching ${result}`);
    }
  } catch (e) {
    console.log(`error while seraching ${e}`);
  }
}

export async function createUserPlaylist(userId, playlistName) {
  const createPlaylistEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: playlistName,
      description: "",
      public: false,
    }),
  };

  try {
    const result = await fetchWithAuth(createPlaylistEndpoint, payload);
    return result.id;
  } catch (e) {
    console.log(`error while saving playlist ${e}`);
  }
}

export async function addTracksToPlaylist(uriArray, playlistId) {
  const addTracksEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: uriArray,
      position: 0,
    }),
  };

  try {
    const result = await fetchWithAuth(addTracksEndpoint, payload);
    if (result) {
      return result.snapshot_id;
    }
  } catch (e) {
    console.log(`Error while adding tracks to playlist ${e}`);
  }
}

export async function saveUserPlaylist(userId, playlistName, trackUris) {
  const newPlaylistId = await createUserPlaylist(userId, playlistName);
  if (newPlaylistId) {
    const addTracksResult = await addTracksToPlaylist(trackUris, newPlaylistId);
    return addTracksResult ? true : false;
  }
}

export async function fetchPlaylistTracks(playlistId) {
  const playlistItemsEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  try {
    const result = await fetchWithAuth(playlistItemsEndpoint);
    if (result) {
      return result.items;
    }
  } catch (e) {
    console.log(`Error while fetching tracks ${e}`);
  }
}

export async function doesPlaylistExist(playlistId) {
  // to check Playlist existence we need to check if user follows a Playlist.
  const playlistFollowersEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains`;
  const payload = {
    method: "GET",
  };

  try {
    const result = await fetchWithAuth(playlistFollowersEndpoint, payload);
    if (result) {
      console.log(result);
      return result[0];
    }
  } catch (e) {
    console.log(`Error while checking playlist exist ${e}`);
  }
}

export async function removeUserPlaylist(playlistId) {
  const removePlaylistEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/followers`;
  const payload = {
    method: "DELETE",
  };

  try {
    const result = await fetchWithAuth(removePlaylistEndpoint, payload);
    if (result) {
      return true;
    }
  } catch (e) {
    console.log(`Error while deleting the playlist ${e}`);
  }
}

export async function getUserLikedSongs(setLikedSongs) {
  const likedSongsEndpoint = `https://api.spotify.com/v1/me/tracks?limit=50`;
  const payload = {
    method: "GET",
  };
  try {
    const result = await fetchWithAuth(likedSongsEndpoint, payload);
    if (result) {
      const resultTracks = result.items.map(Object => Object.track)
      setLikedSongs(resultTracks);
    }
  } catch (e) {
    console.log(`Error while fetching liked songs ${e}`);
  }
}

export async function removeLikedSongs(id) {
  const removeLikedSongEndpoint = `https://api.spotify.com/v1/me/tracks?ids=${id}`;
  const payload = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      ids: [id],
    },
  }

  try {
    const result = await fetchWithAuth(removeLikedSongEndpoint, payload);
    return result;
  }catch(e) {
    console.log(`Error while removing liked song ${e}`);
  }
}

export async function addToLikedSongs(id) {
  const addToLikedSongsEndpoint = `https://api.spotify.com/v1/me/tracks?ids=${id}`;
  const payload = {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      ids: [id],
    },
  }

  try {
    const result = await fetchWithAuth(addToLikedSongsEndpoint, payload);
    return result;
  }catch(e) {
    console.log(`Error while adding liked song ${e}`);
  }
}

export async function checkLikedSongs(id) {
  const checkLikedSongsEndpoint = `https://api.spotify.com/v1/me/tracks/contains?ids=${id}`;
  const payload = {
    method: "GET",
  }

  try {
    const result = await fetchWithAuth(checkLikedSongsEndpoint, payload);
    return result;
  }catch(e) {
    console.log(`Error while checking if liked song exists ${e}`);
  }
}