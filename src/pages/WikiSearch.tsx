import React, {Component} from 'react';
import axios from 'axios';
import './Home.css';

class WikiSearch extends Component {

    constructor(props: any){
        super(props);

        this.state = {
            wikis: []
		};
    }
    
    
        wikiSearch(){
            let input = document.getElementById("input")! as HTMLInputElement;
            let wikiStuff = document.getElementById("wikiStuff")!;
            let wikiURL =
              "https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=" +
              input.value +
              "&limit=20";
            let itunesURL =
              "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=" +
              input.value +
              "&limit=20";
            axios
              .get(wikiURL, {
                headers: { "Content-Type": "application/json; charset=UTF-8" }
              })
              .then(res => {
                const wiki = res.data;
                console.log(wiki);
                wikiStuff.innerHTML = "";
                wikiStuff.append("Wikipedia Info: " + wiki[1]);
                return { wikis: wiki || [] };
                // this.setState({ wikis: wiki || [] });
              })
              .catch(err => console.error(err.message));
          };

        //   render(){
        //     return this.props.children;
        //   }
    
    
};
  
export default WikiSearch;