import firebase from 'firebase/app';
import 'firebase/auth';
import { getDatabase, ref, set  } from "firebase/database";



const getFavoriteLocationsByUser = (userID, {auth, database}) => {
    const currentUser = auth.currentUser;

    console.log(auth);
    console.log(database);


    if (!currentUser) {
        return Promise.reject('Utilisateur non connecté.');
    }

    // Initialisation de la base de données Firebase uniquement ici
    //const database = firebase.database();

    return database
        .ref(`users/${userID}/favorites`)
        .once('value')
        .then((snapshot) => {
            return snapshot.val();
        })
        .catch((error) => {
            console.error('Erreur lors de la récupération des lieux favoris : ', error);
            return null;
        });
};

const addFavoriteLocation = (favoriteID, latitude, longitude, { auth }) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
        return Promise.reject('Utilisateur non connecté.');
    }

    const database = getDatabase();
    const userID = currentUser.uid;

    return set(ref(database, `users/${userID}/favorites/${favoriteID}`), {
        latitude: latitude,
        longitude: longitude,
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