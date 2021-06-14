import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

const RedirectToHome = ({ history }) => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, [1000]);
    //redirect to home if count === 0
    count === 0 && history.push("/");
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="container p-5">
      <h3>Not Authorized... Redirecting in {count} seconds </h3>
    </div>
  );
};

export default withRouter(RedirectToHome);
