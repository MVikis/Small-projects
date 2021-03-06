import React, { useEffect, useState } from 'react'
import Form from '../Universal/Form'
import ReactCountryFlag from "react-country-flag"
import {countries} from 'country-data';
import Card from './Card'
import './Card-style.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Title } from '../Universal/Title';




export default function APIApp(){

    const [data,setData] = useState({name:'', country:[]});
    const [foundData, setBool]= useState(false)
   
  async function Get(name){
   
      try{
      let response = await fetch(`https://api.nationalize.io?name=${name}`)
      .then(response => response.json())
      .then(data => setData(data));
        setBool(true)
      }
      catch{

      }
  }
const ReturnFlag=(country)=>{
 return(
  <ReactCountryFlag countryCode={country.country_id} svg/>
 )
}

    return(
        <div id="api" className="overlay flex">
             <div className="home-title">
                 <h2><span>nationalize.io</span></h2>
                 </div>
           <Form AddItem={Get}/>
           <div>
               <CSSTransition in={foundData} timeout={{ appear: 1000, enter:1000, exit: 300 }} classNames="item">
               <h3 className="name-style">{data.name}</h3>
               </CSSTransition>

        <TransitionGroup style={{marginBottom:'100px'}} className="flex">
           {data.country.map((country, index )=>
           <CSSTransition 
           key={index}
           timeout={{enter:500,exit:300}}
           classNames="item">
  <Card number={Math.ceil(country.probability * 100)} name={countries[country.country_id].name} img={`http://catamphetamine.gitlab.io/country-flag-icons/3x2/${country.country_id}.svg`} />
  </CSSTransition>  )}
  </TransitionGroup>   
            </div>
        </div>
    )
}