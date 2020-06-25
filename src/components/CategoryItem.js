import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ id, image, topic }) => {
  return (
    <>
      <div className="col-12 pt-1 pb-5 text-center">
        <Link
          to={{ pathname: "/game", topicId: id, topic: topic }}
          title="start quiz"
        >
          <img
            src={`${image}`}
            alt="quiz topic"
            className="img-fluid quiz-question-cover pb-2"
          />
          <br />
          <span className="text-dark">
            <strong>{topic}</strong>
          </span>
        </Link>
      </div>
    </>
  );
};

export default CategoryItem;
