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
import { getUserIdToken } from "../utils/firebase/firebase.utils";
import SavingSpinner from "../components/SavingSpinner";

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
        try {
          const firebaseIdToken = await getUserIdToken();
          dispatch(setToken(firebaseIdToken));
        } catch (error) {
          console.log(error);
        }
        try {
          const { data } = await signUser(authUser);
          dispatch(setUser({ ...authUser, id: data.user.id }));
          navigate("/dashboard");
          dispatch(setIsAuthenticated(true));
        } catch (error) {
          console.log(error);
        }
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <SavingSpinner active={isLoading} text={"Recognizing User"} />;
  }

  return (
    <>
      {isAuthenticated ? <UserHeader /> : <AuthHeader />}
      <main className="p-8">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
