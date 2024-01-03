import firebase from 'firebase/app';
import 'firebase/auth';
import { getDatabase, ref, set, child, get} from "firebase/database";

const getFavoriteLocationsByUser = (userID) => {

  const database = getDatabase();
  const dbRef = ref(database);
  const userFavoritesRef = child(dbRef, `users/${userID}/favorites`);

  return get(userFavoritesRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des lieux favoris(FavoriteManager.js) : ', error);
      return null;
    });
};

const addFavoriteLocation = (favoriteID, latitude, longitude, userID ) => {

    const database = getDatabase();

    return set(ref(database, `users/${userID}/favorites/${favoriteID}`), {
        latitude: latitude,
        longitude: longitude,
        localisation: favoriteID,
    })
    .then(() => {
        console.log('Lieu favori ajouté avec succès');
    })
    .catch((error) => {
        console.error('Erreur lors de l\'ajout du lieu favori : ', error);
        return Promise.reject(error);
    });
};

export {
    getFavoriteLocationsByUser,
    addFavoriteLocation
};