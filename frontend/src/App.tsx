import React, { useState, useEffect } from "react";
import AddItem from "./AddItem";

interface Item {
  id: number;
  name: string;
  description: string;
  category: string;
  location: number;
  image: string | null;
}

interface Place {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [newItem, setNewItem] = useState<Item | null>(null);
  const [newPlace, setNewPlace] = useState<string>("");

  useEffect(() => {
    // Carica gli oggetti e i luoghi all'avvio
    fetch("http://localhost:3001/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));

    fetch("http://localhost:3001/places")
      .then((response) => response.json())
      .then((data) => setPlaces(data))
      .catch((error) => console.error("Error fetching places:", error));
  }, []);

  const handleAddItem = () => {
    if (newItem) {
      fetch("http://localhost:3001/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      })
        .then((response) => response.json())
        .then((data) => {
          setItems([...items, { ...newItem, id: data.id }]);
          setNewItem(null); // Reset input
        })
        .catch((error) => console.error("Error adding item:", error));
    }
  };

  const handleDeleteItem = (id: number) => {
    fetch(`http://localhost:3001/items/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setItems(items.filter((item) => item.id !== id));
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  const handleAddPlace = () => {
    if (newPlace) {
      fetch("http://localhost:3001/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newPlace }),
      })
        .then((response) => response.json())
        .then((data) => {
          setPlaces([...places, { id: data.id, name: newPlace }]);
          setNewPlace("");
        })
        .catch((error) => console.error("Error adding place:", error));
    }
  };

  const handleDeletePlace = (id: number) => {
    fetch(`http://localhost:3001/places/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setPlaces(places.filter((place) => place.id !== id));
      })
      .catch((error) => console.error("Error deleting place:", error));
  };

  // Immagine di esempio da usare quando non c'è un'immagine
  const defaultImage = "https://via.placeholder.com/150";

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Object Tracker</h1>

      {/* Form per aggiungere un luogo */}
      <div className="mb-4">
        <div className="form-group">
          <label htmlFor="formNewPlace">New Place</label>
          <input
            type="text"
            className="form-control"
            id="formNewPlace"
            value={newPlace}
            onChange={(e) => setNewPlace(e.target.value)}
            placeholder="Enter place name"
          />
        </div>
        <button onClick={handleAddPlace} className="btn btn-primary">
          Add Place
        </button>
      </div>

      <h2 className="my-4">Places</h2>
      <div className="row">
        {places.map((place) => (
          <div className="col-md-3 mb-3" key={place.id}>
            <div className="p-3 border">
              <h5>{place.name}</h5>
              <button
                className="btn btn-danger"
                onClick={() => handleDeletePlace(place.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form per aggiungere un oggetto */}
      <div className="mb-4">
        <div className="form-group">
          <label htmlFor="formNewItem">New Item</label>
          <input
            type="text"
            className="form-control"
            id="formNewItem"
            placeholder="Enter item name"
            onChange={(e) =>
              setNewItem({ ...newItem, name: e.target.value } as Item)
            }
          />
        </div>
        {/* Altri campi per descrizione, categoria, ecc. */}
        <button onClick={handleAddItem} className="btn btn-primary">
          Add Item
        </button>
      </div>
      <AddItem places={places} />

      <h2 className="my-4">Items</h2>
      <div className="row">
        {items.map((item) => (
          <div className="col-md-3 mb-3" key={item.id}>
            <div className="p-3 border">
              <h5>{item.name}</h5>
              <p>{item.description}</p>
              {/* Visualizzazione dell'immagine */}
              <img
                src={item.image || defaultImage}
                alt={item.name}
                className="img-fluid mb-3"
                style={{ width: "100%" }}
              />
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteItem(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
