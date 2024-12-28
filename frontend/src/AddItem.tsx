import React, { useState, ChangeEvent, FormEvent } from "react";

interface Place {
  id: number;
  name: string;
}

interface AddItemProps {
  places: Place[]; // Lista dei luoghi per il select
}

const AddItem: React.FC<AddItemProps> = ({ places }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<number | undefined>(
    undefined
  );
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !description || !selectedPlace || !image) {
      alert("Tutti i campi sono obbligatori.");
      return;
    }

    // Crea un oggetto FormData
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("place_id", selectedPlace.toString());
    formData.append("image", image);

    try {
      const response = await fetch("/items", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Oggetto aggiunto con successo");
      } else {
        alert("Errore nel caricare l'oggetto");
      }
    } catch (error) {
      console.error(error);
      alert("Errore nella richiesta");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Aggiungi un oggetto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrizione</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Luogo</label>
          <select
            className="form-select"
            value={selectedPlace}
            onChange={(e) => setSelectedPlace(Number(e.target.value))}
            required
          >
            <option value="">Seleziona un luogo</option>
            {places.map((place) => (
              <option key={place.id} value={place.id}>
                {place.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Carica immagine</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Aggiungi Oggetto
        </button>
      </form>
    </div>
  );
};

export default AddItem;
