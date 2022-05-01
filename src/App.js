import React, { useState, useReducer, useEffect } from "react";
import Map from "./components/Map";
import Options from "./components/Options";
import Reducer from "./reducer";
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
const allEvents = "https://eonet.gsfc.nasa.gov/api/v2.1/events";
const eventCategories = "https://eonet.gsfc.nasa.gov/api/v2.1/categories";
const categoryUrl = "https://eonet.gsfc.nasa.gov/api/v2.1/categories/";

function App() {
  const initState = {
    categories: [],
    activeCategory: [],
    icon: ""
  };

  const [state, dispatch] = useReducer(Reducer, initState);
  const [loading, setLoading] = useState([]);
  const [events, setEvents] = useState([]);


  useEffect(() => {
    const setCategories = async () => {
      let res = await fetch(eventCategories);
      let json = await res.json();
      json.categories.forEach(async (event, index) => {
        let res = await fetch(event.link);
        let categoryJson = await res.json();
        let hasEvents = false;
        if (categoryJson.events.length > 0) {
          hasEvents = true;
        }
        dispatch({
          type: "SetCategories",
          title: event.title,
          id: event.id,
          hasEvents: hasEvents,
          numOfEvents: categoryJson.events.length
        });
      });
    };
    setCategories();
  }, []);

  useEffect(() => {
    const fetchActiveEvents = async () => {
      setLoading(true);
      let activeEvents = [];
      if (
        state.activeCategory.length === 1 &&
        state.activeCategory[0].value === 0
      ) {
        let res = await fetch(allEvents);
        let json = await res.json();
        setEvents(json.events);
      } else if (state.activeCategory.length === 0) {
        setEvents([]);
      } else {
        state.activeCategory.forEach(async (activeEvent, index) => {
          const res = await fetch(categoryUrl + activeEvent.value);
          const { events } = await res.json();
          events.forEach((event) => {
            activeEvents.push(event);
          });
          setEvents(activeEvents);
        });
      }
      setLoading(false);
    };

    fetchActiveEvents();
  }, [state.activeCategory]);
  function onChange(value) {
    dispatch({ type: "SetActiveCategory", value: value });
  }

  return (
    <div className="App">
      <h1>Natural Events Tracker</h1>
      <Options categories={state.categories} onChange={onChange} />
      <div id="map-container">
        {!loading ? <Map activeEvents={events} /> : <h3>loading...</h3>}
      </div>
    </div >


  );
}

export default App;
