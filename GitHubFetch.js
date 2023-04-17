import { useState, useEffect } from "react";
import './GitHubFetch.css';

export default function GitHubFetch() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/FelloMan/repos")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setRepos(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>Github Repositories</h1>
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                {repo.name} 
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

 