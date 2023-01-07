import React from "react";

function useLocalStorage(itemName, initialValue) {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [item, setItem] = React.useState(initialValue);
  
// React.useEffect(() => {
//   setTimeout(() => {
//     try {
//     const localStorageItem = localStorage.getItem(itemName);
//     let parsedItem;

//     if(!localStorageItem) {
//       localStorage.setItem(itemName, JSON.stringify(initialValue));
//       parsedItem = initialValue;
//     } else {
//       parsedItem = JSON.parse(localStorageItem);
//     }

//     setItem(parsedItem);
//     setLoading(false);
//   } catch(error) {
//     setError(error);
//   }
//   }, 1000);
// }, []);
// eslint-disable-next-line
    React.useEffect(() => {
        setTimeout(() => {
            let localStorageItem = localStorage.getItem(itemName);
            fetch('https://gist.githubusercontent.com/guss1215/75da40fe9adb8cc383caea7058cacad3/raw/522c2eaa4e04d9aff93f67a11208d9da73f6f6dd/MyBackend.json')
            .then(response => response.json())
            .then(itemName => localStorageItem = itemName);
             
            //= localStorage.getItem(itemName);
            let parsedItem;

            if(!localStorageItem) {
            localStorage.setItem(itemName, JSON.stringify(initialValue));
            parsedItem = initialValue;
            } else {
            parsedItem = JSON.parse(localStorageItem);
            }
            setItem(parsedItem);
            setLoading(false);
// eslint-disable-next-line
        }, 1000)}, []);


    const saveItem = (newTodos) => {
      try{
        const stringifiedTodos = JSON.stringify(newTodos);
        localStorage.setItem(itemName, stringifiedTodos);
        setItem(newTodos);
      } catch(error) {
        setError(error);
      }
    };
  
    return {
      item,
      saveItem,
      loading,
      error,
    };
  }

  export { useLocalStorage };