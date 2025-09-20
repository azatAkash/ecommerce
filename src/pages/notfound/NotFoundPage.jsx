import React from "react";
import Header from "../../components/Header";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <>
      <title>Not Found</title>
      <Header />
      <div className="not-found-page">
        <div className="not-found-error-container">
          <p className="not-found-error-number">404</p>
          <p className="not-found-error-description">OOPS! PAGE NOT FOUND</p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
