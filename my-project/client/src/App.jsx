import React, { useEffect, useState } from 'react';

const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState("Naimur Rahman");

  useEffect(() => {
    const fetchUserByName = async (userName) => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userName}`);
        
        if (!response.ok) {
          throw new Error('User not found');
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        setError(error.message);
      }
    };

    // Call the function with the user's name
    fetchUserByName(userName); 
  }, [userName]); // Depend on userName to refetch when it changes

  const createUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error creating user');
      }

      const newUser = await response.json();
      setUser(newUser);
      setError(''); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>User Details</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={createUser}>Create User</button>
      {user ? (
        <div>
          {user.title && user.description ? (
            user.title.map((title, index) => (
              <div key={index}>
                <img src={user.image} alt={user.name} style={{ width: '100px', height: 'auto' }} /> {/* Display the image */}
                <strong>Title:</strong> {title}<br />
                <strong>Description:</strong> {user.description[index] || 'No Description'}<br /><br />
              </div>
            ))
          ) : (
            <p>No titles or descriptions available.</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
