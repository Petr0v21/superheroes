import { observer } from "mobx-react";
import React from "react";
import model from "./model";
import "./styled.css";

const InputComponent = (props) => {
  return (
    <div className={props.class ?? "InputComponent"}>
      {props.class === "Textarea" ? (
        <textarea
          value={props.store[props.name]}
          name={props.name}
          type="text"
          placeholder={props.placeholder}
          required={props.required}
          onChange={(event) => model.addField(event)}
        />
      ) : (
        <input
          value={props.store[props.name]}
          name={props.name}
          type="text"
          placeholder={props.placeholder}
          required={props.required}
          onChange={(event) => model.addField(event)}
        />
      )}
    </div>
  );
};

const CreateHeroForm = () => {
  return (
    <form className="Form">
      <h2>Create Post Hero</h2>
      <InputComponent
        store={model.hero}
        name="nickname"
        placeholder="Nickname"
      />
      <InputComponent
        store={model.hero}
        name="real_name"
        placeholder="Real Name"
      />
      <InputComponent
        class="Textarea"
        store={model.hero}
        name="origin_description"
        placeholder="Description"
      />
      <InputComponent
        store={model.hero}
        name="superpowers"
        placeholder="Superpower"
      />
      <InputComponent
        store={model.hero}
        name="catch_phrase"
        placeholder="Catch Phrase"
      />
      <div className="GallaryChoose">
        {model.files.map((img, index) => (
          <div key={index} className="ImageChoose">
            <img alt="uploadImage" src={URL.createObjectURL(img)} />
            <div
              className="Button_Delete"
              onClick={() => {
                model.cleanFile(index);
              }}
            >
              Delete
            </div>
          </div>
        ))}
      </div>
      <input
        className="custom-file-input"
        type="file"
        name="file"
        accept="image/png, image/jpeg"
        multiple
        onChange={(event) => {
          model.addImage(event);
          event.target.value = null;
        }}
      />
      <button className="Button" onClick={() => model.addHero()}>
        Create
      </button>
    </form>
  );
};

export default observer(CreateHeroForm);
