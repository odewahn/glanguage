import React, { useState, useEffect } from "react";

const Main = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((users) => {
        console.log(users);
        setUsers(users);
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      Here's an example of using an API.
      <ul>
        {users.map((user) => {
          return (
            <li>
              {user.id} -> {user.username}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Main;
