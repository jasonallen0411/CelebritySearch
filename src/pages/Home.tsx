import {
  IonContent,
  IonHeader,
  IonPage,
  IonItem,
  IonInput,
  IonButton,
  IonTitle,
  IonSlides,
  IonSlide,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonLabel,
  IonToolbar
} from "@ionic/react";
import React, { Component } from "react";
import axios from "axios";
import "./Home.css";
import "./WikiSearch.tsx";
import defaultExport from './WikiSearch';
import { render } from "react-dom";
import { element, any } from "prop-types";
import {wikiSearch} from "./wikiActions";
// import {connect, DispatchProp} from "react-redux";
import { async } from "q";

export interface OwnProps {
  props: any;
}

const slideOpts = {
  initialSlide: 1,
  speed: 400
};

export const SlidesExample: React.FC = () => (
  <IonContent>
    <IonSlides pager={true} options={slideOpts}>
      <IonSlide>
        <h1>Slide 1</h1>
      </IonSlide>
      <IonSlide>
        <h1>Slide 2</h1>
      </IonSlide>
      <IonSlide>
        <h1>Slide 3</h1>
      </IonSlide>
    </IonSlides>
  </IonContent>
);



// const Home: React.FC = () => {
class Home extends Component {
  wSearch: any;

  constructor(
    //public wSearch: WikiSearch,
    props: any
    ){
    super(props);
    

    this.state = {
      wikis: [],
      itunes: [],
      movies: []
    };
    this.wSearch = React.createRef();
  }
  
  
 
  wikiSearch(){
    // axios.get(`https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=${'BATMAN'}&limit=20`,
    //     {
    //     headers: { "Content-Type":"application/json; charset=UTF-8"}
    //     })
    //     .then(res => {
    //     const wiki = res.data;
    //     console.log(wiki);
    //     return ({ wikis: wiki || [] });
    //     // this.setState({ wikis: wiki || [] });
    //     })
    //     .catch(err => console.error(err.message))
    // }
    let input = document.getElementById("input")! as HTMLInputElement;
    let wikiStuff = document.getElementById("wikiStuff")!;
    let wikiStuff1 = document.getElementById("wikiStuff1")!;
    let wikiURL =
      "https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=" +
      // "https://en.wikipedia.org//w/api.php?action=parse&format=json&origin=*&page=" +
      // "https://en.wikipedia.org//w/api.php?action=query&list=search&srsearch=" +
      input.value + "&format=json&origin=*";
    axios
      .get(wikiURL, {
        headers: { "Content-Type": "application/json; charset=UTF-8" }
      })
      .then(res => {
        const wiki = res.data;
        console.log(wiki);
        wikiStuff.style.display = "block";
        wikiStuff1.style.display = "block";
        wikiStuff.innerHTML = "";
        wikiStuff.append(wiki[1]);
        return { wikis: wiki || [] };
        // this.setState({ wikis: wiki || [] });
      })
      .catch(err => console.error(err.message));
  };

  itunesSearch = () => {
    // axios.get(`https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=${'BATMAN'}&limit=20`,
    //     {
    //     headers: { "Content-Type":"application/json; charset=UTF-8"}
    //     })
    //     .then(res => {
    //     const wiki = res.data;
    //     console.log(wiki);
    //     return ({ wikis: wiki || [] });
    //     // this.setState({ wikis: wiki || [] });
    //     })
    //     .catch(err => console.error(err.message))
    // }
    let input = document.getElementById("input")! as HTMLInputElement;
    let ituneStuff = document.getElementById("ituneStuff")!;
    let ituneStuff1 = document.getElementById("ituneStuff1")!;
    let itunesURL =
      "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=" +
      input.value +
      "&limit=20";
    axios
      .get(itunesURL, {
        headers: { "Content-Type": "application/json; charset=UTF-8" }
      })
      .then(res => {
        const itune = res.data;
        console.log(itune);
        ituneStuff.style.display = "block";
        ituneStuff1.style.display = "block";
        ituneStuff.innerHTML = "";
        ituneStuff.append(
          "Artist Name: " +
          itune.results[0].artistName +
          ", Track Name: " +
          itune.results[0].trackName +
          ", Track Price: $" +
          itune.results[0].trackPrice
        );
        return { itunes: itune || [] };
        // this.setState({ wikis: wiki || [] });
      })
      .catch(err => console.error(err.message));
  };

  movieSearch = () => {
    // axios.get(`https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=${'BATMAN'}&limit=20`,
    //     {
    //     headers: { "Content-Type":"application/json; charset=UTF-8"}
    //     })
    //     .then(res => {
    //     const wiki = res.data;
    //     console.log(wiki);
    //     return ({ wikis: wiki || [] });
    //     // this.setState({ wikis: wiki || [] });
    //     })
    //     .catch(err => console.error(err.message))
    // }
    let input = document.getElementById("input")! as HTMLInputElement;
    let movieStuff = document.getElementById("movieStuff")!;
    let imageArea = document.getElementById("imageArea")!;
    let movieStuff1 = document.getElementById("movieStuff1")!;
     let moviePoster = document.getElementById("moviePoster")!;
     let w500 = "https://image.tmdb.org/t/p/w500";
     let original = "https://image.tmdb.org/t/p/original";


    let movieURL =
      "https://api.themoviedb.org/3/search/person?api_key=84c329a92566be57845322a19ff707ac&query=" +
      input.value;
    axios
      .get(movieURL, {
        headers: { "Content-Type": "application/json; charset=UTF-8" }
      })
      .then(res => {
        const movies = res.data;
        console.log(movies);
        movieStuff.style.display = "block";
        movieStuff1.style.display = "block";
        movieStuff.innerHTML = "";
        //moviePoster.setAttribute("src", w500 + movies.results[0].known_for[0].poster_path)
        for (var i = 0; i < movies.results[0].known_for.length; i++){
          if(movies.results[0].known_for[i]){
            imageArea.innerHTML += '<img src="' + w500 + movies.results[0].known_for[i].poster_path + '" />';
            movieStuff.append(
              "Name: " +
               movies.results[0].name +
              "Popularity: " +
               movies.results[0].popularity +
              "Known for: " +
               //moviePoster.setAttribute("src", w500 + movies.results[0].known_for[i].poster_path) +
               movies.results[0].known_for[i].poster_path +
              "Title: " +
               movies.results[0].known_for[i].title +
              "Release Date: " +
               movies.results[0].known_for[i].release_date
            );
          }
        }
        // movieStuff.append(
        //   "Name: " +
        //    movies.results[0].name +
        //   "Popularity: " +
        //    movies.results[0].popularity +
        //   "Known for: " +
        //     moviePoster.setAttribute("src", w500 + movies.results[0].known_for[0].poster_path) +
        //    movies.results[0].known_for[0].poster_path +
        //   "Title: " +
        //    movies.results[0].known_for[0].title +
        //   "Release Date: " +
        //    movies.results[0].known_for[0].release_date
        // );
        return { movie: movies || [] };
        // this.setState({ wikis: wiki || [] });
      })
      .catch(err => console.error(err.message));
  };

  // state = {
  //   wikis: []
  // }

  // componentDidMount() {
  //   axios.get(`https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=${'BATMAN'}&limit=20`,
  //             {
  //               headers: { "Content-Type":"application/json; charset=UTF-8"}
  //             })
  //       .then(res => {
  //       const wiki = res.data;
  //       this.setState({ wikis: wiki || [] });
  //     }).catch(err => console.error(err.message))
  // }

  // componentDidUpdate(prevState: object, currentState:object) {
  //   console.log(currentState)
  // }


  


  render() {
    return (
      
      <IonPage>
        {/* <IonHeader>
          <IonToolbar>
            <IonTitle>Ionic Blank</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        {/* <WikiSearch ref={this.wSearch} /> */}
        <IonContent className="ion-padding">
          <div className="page">
            <h1 className="mainHeader">Celebrity Search</h1>
            <IonItem className="inputItem">
              <IonInput id="input"></IonInput>
            </IonItem>
            <div className="getInfoBtn">
              <IonButton id="infoBtn" onClick={() => {this.wikiSearch(); this.itunesSearch(); this.movieSearch()}}>
                Get Info
              </IonButton>
            </div>
            {/* {this.props.wikis && (<ul>
            { this.state.wikis.map((wiki, index) => <li key={index}>{wiki}</li>)}
            </ul>)} */}

            <IonSlides pager={true} options={slideOpts}>
              <IonSlide>
                {/* <span id="wikiStuff1">Wikipedia Info: <h2 id="wikiStuff"></h2></span> */}
                <IonCard className="cards">
                  <IonCardHeader>
                    <IonCardSubtitle></IonCardSubtitle>
                    <IonCardTitle><h1 id="wikiStuff1">Wikipedia Info: </h1></IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>
                  <h2 id="wikiStuff"></h2>
                  </IonCardContent>
                </IonCard>
              </IonSlide>
              <IonSlide>
                {/* <span id="ituneStuff1">iTunes Info:  <h2 id="ituneStuff"></h2></span> */}
                <IonCard className="cards">
                  <IonCardHeader>
                    <IonCardSubtitle></IonCardSubtitle>
                    <IonCardTitle><h1 id="ituneStuff1">iTunes Info: </h1></IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>
                  <h2 id="ituneStuff"></h2>
                  </IonCardContent>
                </IonCard>
              </IonSlide>
              <IonSlide>
                {/* <span id="movieStuff1">Movies Info:  <h2 id="movieStuff"></h2></span> */}
                <IonCard className="cards">
                  <IonCardHeader>
                    <IonCardSubtitle></IonCardSubtitle>
                    <IonCardTitle><h1 id="movieStuff1">Movie Info: </h1></IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>
                    <div id="imageArea"></div>
                    {/* <img id="moviePoster" /> */}
                    <h2 id="movieStuff"></h2>
                  </IonCardContent>
                </IonCard>
              </IonSlide>
            </IonSlides>

            {/* <h2 id="wikiStuff"></h2>
            <h2 id="ituneStuff"></h2> */}
          </div>
        </IonContent>
      </IonPage>
    );
  }
}



// };

export default Home;

//itunes url:
//https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=${input.value}&limit=20
//wikipediaurl:
//https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=${input.value}&limit=20
//themoviedb url: 
//https://api.themoviedb.org/3/search/movie?api_key=84c329a92566be57845322a19ff707ac&query=${input.value}&limit=20
