import { Outlet, NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth, signOutUser } from "../utils/firebase/firebase.utils";
import { resetUser, setToken, setUser } from "../store/user/user.slice";
import { useDispatch } from "react-redux";
import { useSignUserViaGoogleMutation } from "../store/user/user.api";
import { setAllTasks } from "../store/tasks/tasks.slice";

function MainLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const activeStyle =
    "block p-4 bg-white border-b-2 border-gray-800 font-semibold";
  const [signUser, { fetchIsLoading, fetchError }] =
    useSignUserViaGoogleMutation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const firebaseIdToken = await authUser.getIdToken();
        dispatch(setToken(firebaseIdToken));
        const { data } = await signUser(authUser);
        dispatch(setUser({ ...authUser, id: data.user.id }));
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        //User is signed out
        navigate("/");
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default MainLayout;
