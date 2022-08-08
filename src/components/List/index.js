import { observer } from "mobx-react";
import React, { useEffect } from "react";
import Item from "../Item";
import model from "./model";
import "./styled.css";

const List = () => {
  useEffect(() => {
    model.onInit();
  }, [model.currentPage]);
  return (
    <div>
      <h2>List of Heroes</h2>
      <div className="List">
        {model.items.length > 0 ? (
          model.items.map((item) => (
            <Item
              key={item._id}
              props={item}
              image={model.images.find((img) => img.id === item._id)}
            />
          ))
        ) : (
          <div>List is Empty</div>
        )}
      </div>
      <div className="Pages">
        {model.pages.map((page) => (
          <div
            key={page}
            onClick={() => model.changePage(page)}
            className="PageButton"
          >
            {page}
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(List);
