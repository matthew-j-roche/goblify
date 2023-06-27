import React, { useEffect, useState } from 'react';

function GobJoke() {
  const [q, setQ] = useState(null)
  const [a, setA] = useState(null)
  const today = new Date().getDate()
  useEffect(() => {
    fetch('http://localhost:4000/gobjokes')
        .then(res => res.json())
        .then(json => {
            const todayGobJoke = json.find(g => g.id === today)
            console.log(todayGobJoke)
            setQ(todayGobJoke.q)
            setA(todayGobJoke.a)
        })
    }, [])

  return (
    <details>
      <summary>
        <em>{q}</em>
      </summary>
      <em>{a}</em>
    </details>
  );
}

export default GobJoke;
