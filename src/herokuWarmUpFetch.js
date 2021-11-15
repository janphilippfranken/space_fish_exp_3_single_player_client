const URL = "https://space-fish.herokuapp.com"; // heroku deploy
// const URL = "http://localhost:5000/"; local

export const herokuWarmUpFetch = cb => {
    let t = setInterval(() => {
        fetch(URL) 
        .then(res => cb())
        .catch(err => {
            clearInterval(t);
            return herokuWarmUpFetch();
        });
    }, 1000)
};