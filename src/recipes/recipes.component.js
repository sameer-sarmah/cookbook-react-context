import React, { Component } from "react";
import { RecipeDetail } from './recipe-detail/recipe-detail.component';
import {RecipeList} from './recipe-list/recipe-list.component';
import { RecipeService } from './../services/recipe.service'
import './recipes.component.css';
import {Context} from "./../context/context"

export class RecipeComponent extends Component {
   recipes=[];
   selectedRecipe={};
   recipeSvc=new RecipeService();

   constructor(props){
    super(props);
    this.recipes=this.recipeSvc.getRecipes();
    if(!!this.recipes && this.recipes instanceof Array && this.recipes.length>0){
     this.selectedRecipe= this.recipes[0]; 
    }
   } 

   setSelectedRecipe(recipeID){
    this.selectedRecipe=this.recipeSvc.getRecipe(recipeID);
    this.setState({
        recipes: this.recipes,
        selectedRecipe: this.selectedRecipe
       });
   }

    render() {
        const panel = (
            <Context.Consumer> 
                {({recipes,selectedRecipe,getRecipe,setSelectedRecipe,addToCart})=>(
                <div className="flex-item flex-row-container height100pc width100pc" >
                    <div className="width30pc" >{<RecipeList  {...this.props} recipes={recipes}/>}</div>
                    <div className="width70pc">{<RecipeDetail  {...this.props} selectedRecipe={selectedRecipe}
                        getRecipe={getRecipe}  setSelectedRecipe={setSelectedRecipe} addToCart={addToCart}
                    />}</div>
                </div>)}
            </Context.Consumer>
        );
        return panel;
    }
}

