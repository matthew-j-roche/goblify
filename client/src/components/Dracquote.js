import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';

function Dracquote() {
    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    } = useAuth();
    console.log(authUser);
    console.log(isLoggedIn);

    const [dracquote, setDracquote] = useState('');
    useEffect(() => {
        const fetchDracquote = async () => {
          try {
            // Generate a random ID between 1 and 16
            const int = Math.floor(Math.random() * 16) + 1;
            console.log(int)

            const response = await fetch(`/dracquotes/${int}`);
            if (response.ok) {
              const quote = await response.text();
              setDracquote(quote.drac_q);
            } else {
              console.error('Failed to fetch Draculanalytics quote');
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchDracquote();
      }, []);
    
      return (
        <details>
          <summary>
            <em>Count Draculanalytics inspirational quote?</em>
          </summary>
          <em>"You may go anywhere you wish in
              the castle, except where the doors
              are locked. It is old and has
              many bad memories."</em>
        </details>
      );
    }
    
    export default Dracquote;
