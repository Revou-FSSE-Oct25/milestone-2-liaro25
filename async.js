const fetchTodoJson = () => {
  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((jsonData) => {
      console.log("responseJson", jsonData);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

fetchTodoJson();
