import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: state.auth.photoURL,
      });
      let user = auth.currentUser;
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
          photoURL: user.photoURL,
        })
      );
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user log ", user);
      })
      .catch((error) => {
        console.log("error", error);
        console.log("error.message", error.message);
      });
  };

export const authStateChangeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        nickname: user.displayName,
        userId: user.uid,
        photoURL: user.photoURL,
      };
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    } else {
      // User is signed out
      // ...
    }
  });
};

export const authSignOutUser = () => async (dispatch, useState) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
  } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
  }
};
export const authUpdateAvatar =
  ({ photoURL, isAuth }) =>
  async (dispatch, getState) => {
    console.log("isAuth", isAuth);
    if (isAuth) {
      const userUpdateProfile = {
        photoURL: photoURL,
      };

      dispatch(authSlice.actions.updateAvatar(userUpdateProfile));
      return;
    }
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("photoURL,", photoURL);
        await updateProfile(auth.currentUser, { photoURL });
        console.log("auth.currentUser", auth.currentUser);
        const userUpdateProfile = {
          photoURL: photoURL,
        };

        await updateProfile(auth.currentUser, userUpdateProfile);

        dispatch(authSlice.actions.updateAvatar(userUpdateProfile));
      }
    });
  };
