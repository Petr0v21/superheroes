import { makeAutoObservable, runInAction } from "mobx";

class ListModel {
  pages = [];
  currentPage = 1;
  items = [];
  images = [];
  constructor() {
    makeAutoObservable(this);
  }

  onInit() {
    fetch("/heros/list", {
      method: "POST",
      body: JSON.stringify({ page: this.currentPage }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          console.log(json);
          runInAction(() => {
            this.items = json.list;
            this.pages = json.pages;
            this.images = json.images;
          });
        }
      });
  }

  changePage(page) {
    this.currentPage = page;
    console.log(this.currentPage);
    this.onInit();
  }
}

export default new ListModel();
