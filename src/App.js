import React, { Component } from 'react';
import './App.css';
import Form from './components/Form'
import Recipes from './components/Recipes'

const API_KEY="my_api_key";

class App extends Component {
  state={
    recipes:[]
  }
  getRecipe=async(e)=> {
    const recipeName = e.target.recipeName.value;
    e.preventDefault();
    const api_url=await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=5`);

    const data = await api_url.json();
    this.setState({
      recipes:data.recipes
    });
    console.log(this.state.recipes)
  }

  componentDidMount=()=>{
    const json=localStorage.getItem("recipes");
    const recipes=JSON.parse(json);
    this.setState({recipes:recipes})
  }

  componentDidUpdate=()=>{
    const recipes=JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes",recipes);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
           <h1 className="App-title">Food Recipes</h1>
        </header>
        <Form getRecipe={this.getRecipe}/>
        <Recipes recipes={this.state.recipes}/>
      </div>
    );
  }
}

export default App;
