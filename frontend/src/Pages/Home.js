import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { getCurrentUser, userLogin } from "../redux/actions/userActions";

const Home = () => {
  const dispatch = useDispatch();
  /* 
  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // const userData = { email: user.email, token: idTokenResult.token };
        dispatch(getCurrentUser(idTokenResult.token));
      }
    });
    // clean up to prevent memory leak
    return unsubscribed();
  }, []); */
  return <div className="container">Home page</div>;
};

export default Home;
