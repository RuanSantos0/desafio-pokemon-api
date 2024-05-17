import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
      console.log({response})
      const sortedArray = [...response.data.results]

      sortedArray.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })

      setList(sortedArray);
    });
  }, []);

  return (
    <>
      <h3>Desafio Ruan Gondim</h3>
      <h1>Consumir API do pokemon</h1>
      <hr />

      {list.map((item) => (
        <Pokemon key={item.name} data={item} />
      ))}
    </>
  );
}

const Pokemon = ({ data }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    //charmander
    axios.get(data.url).then((response) => {
      setDetails(response.data);
    });
  }, []);

  if (details === null) {
    return <div>-</div>;
  }

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
       <img src={details.sprites.front_default} style={{width: 30, marginRight: 20 }}/>
      <span>
        <b>{details.name}</b> - EXP {details.base_experience}
      </span>
      
       
      
    </div>
  );
};

export default App;
