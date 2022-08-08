import { makeAutoObservable } from "mobx";

class ListHeroesModel {
  hero = {};
  files = [];
  constructor() {
    makeAutoObservable(this);
  }

  cleanFile(index) {
    console.log(this.files);
    console.log(index);
    this.files = this.files.filter((img) => img !== this.files[index]);
    console.log(this.files);
  }

  addField(event) {
    this.hero[event.target.name] = event.target.value;
    console.log(this.hero);
  }

  addImage(event) {
    console.log(event.target.files.length);
    for (let i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
    console.log(this.files);
    console.log(event.target.files);
  }
  addHero() {
    const formData = new FormData();
    console.log(this.files);
    for (let val in this.hero) {
      console.log(`${val}`, this.hero[val]);
      formData.append(`${val}`, this.hero[val]);
    }
    if (Object.keys(this.files) !== 0) {
      for (let i = 0; i < this.files.length; i++) {
        formData.append("images", this.files[i]);
      }
    }
    if (Object.keys(this.hero).length > 0) {
      fetch("/heros/create", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
}

export default new ListHeroesModel();
