import axios from 'axios'

export const wikiSearch = (searchText) => {
    let wikiURL =
      "https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=" +
      searchText +
      "&limit=20";
    axios
      .get(wikiURL, {
        headers: { "Content-Type": "application/json; charset=UTF-8" }
      })
      .then(res => {
        return res.data;
      })
      .catch(err => console.error(err.message));
  };

//   let input = document.getElementById("input")! as HTMLInputElement;
//     let wikiStuff = document.getElementById("wikiStuff")!;