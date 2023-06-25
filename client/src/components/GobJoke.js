import React, { useEffect } from 'react';

function GobJoke(props) {
  useEffect(() => {
    const fetchGobJoke = async () => {
      try {
        const date = new Date();
        const day = date.getDate();
        const response = await fetch(`/gobjokes/${day}`);
        // const joke = await response.json();
        // setJoke(joke);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGobJoke();
  }, []);

  return (
    <details>
      <summary>
        <em>{props.q}</em>
      </summary>
      <em>{props.a}</em>
    </details>
  );
}

export default GobJoke;
