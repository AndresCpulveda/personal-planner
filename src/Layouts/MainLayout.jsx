import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase/firebase.utils";
import {
  setIsAuthenticated,
  setToken,
  setUser,
} from "../store/user/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { useSignUserViaGoogleMutation } from "../store/user/user.api";
import UserHeader from "../components/UserHeader";
import AuthHeader from "../components/AuthHeader";
import { selectIsAuthenticated } from "../store/user/user.selectors";

function MainLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [signUser, { isError, isLoadingg, isSuccess, isUninitialized }] =
    useSignUserViaGoogleMutation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (!authUser) {
        //User is signed out
        navigate("/");
      } else {
        const firebaseIdToken = await authUser.getIdToken();
        dispatch(setToken(firebaseIdToken));
        const { data } = await signUser(authUser);
        dispatch(setUser({ ...authUser, id: data.user.id }));
        setTimeout(() => {
          navigate("/dashboard");
          dispatch(setIsAuthenticated(true));
        }, 1000);
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
      {isAuthenticated ? <UserHeader /> : <AuthHeader />}
      <Outlet />
    </>
  );
}

export default MainLayout;
