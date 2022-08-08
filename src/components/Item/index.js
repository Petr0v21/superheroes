import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { ItemModel } from "./model";
import listModel from "../List/model";
import "./styled.css";

const Images = ({ update, model, viewAllHero }) => {
  if (update) {
    return (
      <div>
        {model.formValues.images.map(
          (image, index) =>
            index >= model.lengthImages &&
            image !== null && (
              <div key={index + 956} className="ImageGaleryUpdate">
                <img
                  key={index}
                  alt="base64image"
                  src={URL.createObjectURL(image)}
                />
                <button
                  className="Button_Delete"
                  onClick={() => {
                    model.deleteChooseImage(index);
                  }}
                >
                  DeleteImg
                </button>
              </div>
            )
        )}
        {model.image.map(
          (img, index) =>
            index >= 1 && (
              <div key={index + 324} className="ImageGaleryUpdate">
                <img
                  key={index}
                  alt="base64image"
                  src={`data:image/jpeg;base64,${img.data}`}
                />
                <button
                  className="Button_Delete"
                  onClick={() => {
                    model.deleteImage(index - 1);
                  }}
                >
                  DeleteImg
                </button>
              </div>
            )
        )}
      </div>
    );
  } else {
    if (viewAllHero) {
      return (
        <div>
          {model.image.map(
            (img, index) =>
              !!index && (
                <img
                  key={index}
                  alt="base64image"
                  src={`data:image/jpeg;base64,${img.data}`}
                />
              )
          )}
        </div>
      );
    } else if (model.image.length > 1) {
      return model.image.map(
        (img, index) =>
          index === 1 && (
            <img
              key={index}
              alt="base64image"
              src={`data:image/jpeg;base64,${img.data}`}
            />
          )
      );
    } else {
      return model.image.map(
        (img, index) =>
          index === 0 && (
            <img
              key={index}
              alt="base64image"
              src={`data:image/jpeg;base64,${img.data}`}
            />
          )
      );
    }
  }
};
const Item = ({ props, image }) => {
  const model = new ItemModel({ props, listModel, image });
  const [update, setUpdate] = useState(false);
  const [viewAllHero, setViewallHero] = useState(false);
  useEffect(() => {}, [model.formValues]);
  return (
    <form className="Post" onClick={() => setViewallHero(!viewAllHero)}>
      <div className="gallary">
        <Images update={update} model={model} viewAllHero={viewAllHero} />
        {update && (
          <input
            className="custom-file-input"
            type="file"
            name="image"
            multiple
            onChange={(event) => {
              model.changeImage(event);
            }}
          />
        )}
      </div>
      <div>
        <div className="InputComponent">
          <input
            value={model.formValues["nickname"]}
            name="nickname"
            placeholder="nickname"
            type="text"
            onChange={model.onChange}
            disabled={!update}
          />
        </div>
        {(update || viewAllHero) && (
          <div>
            <div className="InputComponent">
              <input
                value={model.formValues["real_name"]}
                name="real_name"
                placeholder="real_name"
                type="text"
                onChange={model.onChange}
                disabled={!update}
              />
            </div>
            <div className="InputComponent">
              <input
                value={model.formValues["origin_description"]}
                name="origin_description"
                placeholder="origin_description"
                type="text"
                onChange={model.onChange}
                disabled={!update}
              />
            </div>
            <div className="InputComponent">
              <input
                value={model.formValues["superpowers"]}
                name="superpowers"
                placeholder="superpowers"
                type="text"
                onChange={model.onChange}
                disabled={!update}
              />
            </div>
            <div className="InputComponent">
              <input
                value={model.formValues["catch_phrase"]}
                name="catch_phrase"
                placeholder="catch_phrase"
                type="text"
                onChange={model.onChange}
                disabled={!update}
              />
            </div>
            {update && (
              <button className="Button" onClick={() => model.updateHero()}>
                Update
              </button>
            )}
          </div>
        )}
      </div>
      <div className="ButtonsPad">
        {/* <div className="Button" onClick={() => setViewallHero(!viewAllHero)}>
          {viewAllHero ? "Close" : "Open"}
        </div> */}
        <button className="Button_Delete" onClick={() => model.deleteHero()}>
          Delete
        </button>
        {update ? (
          <button
            className="Button"
            onClick={() => {
              model.cleanUpdate(props);
              setUpdate(!update);
            }}
          >
            Close
          </button>
        ) : (
          <div className="Button" onClick={() => setUpdate(!update)}>
            Change
          </div>
        )}
      </div>
    </form>
  );
};

export default observer(Item);
