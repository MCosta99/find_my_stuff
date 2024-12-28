# Descrizione Completa dell'App di Gestione Oggetti

Questa applicazione permette di tenere traccia degli oggetti, associando informazioni come nome, descrizione, luogo e un'immagine. Gli utenti possono aggiungere, visualizzare e gestire gli oggetti, con un'interfaccia frontend realizzata in **React** (con **TypeScript** e **Bootstrap**) e un backend basato su **Node.js** con **Express** e **SQLite**. Le immagini vengono caricate utilizzando **Multer**.

## Struttura dell'app

### 1. **Frontend (React + TypeScript + Bootstrap)**

Il frontend è sviluppato utilizzando **React** con **TypeScript** per una tipizzazione forte. Per il design, viene utilizzato **Bootstrap CSS**, che offre componenti pronti all'uso come bottoni, form, e griglie. L'app permette agli utenti di:

- Aggiungere nuovi oggetti attraverso un form.
- Visualizzare la lista degli oggetti già aggiunti, inclusi nome, descrizione, luogo e immagine.

#### Funzioni principali:

- **Aggiungi Oggetto**: Gli utenti possono inserire il nome, la descrizione, selezionare il luogo e caricare un'immagine.
- **Lista Oggetti**: Gli utenti possono vedere tutti gli oggetti aggiunti, con l'immagine associata (se presente).

### 2. **Backend (Node.js + Express + SQLite)**

Il backend è sviluppato con **Node.js** utilizzando il framework **Express** per gestire le richieste HTTP. Il database utilizzato è **SQLite**, un database leggero che memorizza le informazioni sugli oggetti e sui luoghi.

#### Funzioni principali:

- **Aggiungere un oggetto**: Gli oggetti vengono aggiunti al database insieme ai dettagli come nome, descrizione, luogo e immagine.
- **Caricamento immagini**: Le immagini vengono caricate nella cartella `uploads` tramite il middleware **Multer**.
- **Gestire luoghi**: Ogni oggetto è associato a un luogo, che viene memorizzato nel database.

### 3. **Caricamento Immagini (Multer)**

Il backend utilizza **Multer** per gestire il caricamento dei file. Le immagini vengono caricate in una cartella specifica (`uploads`) e memorizzate con un nome unico generato utilizzando il timestamp. Ogni oggetto ha un percorso relativo all'immagine che viene memorizzato nel database.

### 4. **Struttura del Progetto**

L'app è suddivisa in due parti principali: **frontend** e **backend**. Ecco la struttura della cartella del progetto:

```
/project-root
  ├── /backend
  │    ├── /uploads           # Cartella per le immagini caricate
  │    ├── /public            # File statici (index.html, JS, CSS)
  │    ├── server.ts          # File del server Express
  │    ├── /database          # Script di gestione del database SQLite
  │    └── /models            # Modelli per la gestione dei dati
  └── /frontend
       ├── /src
       │    ├── /components    # Componenti React per l'interfaccia utente
       │    ├── App.tsx        # Componente principale dell'app
       │    ├── /assets        # Risorse come immagini, icone, etc.
       │    └── vite.config.ts # Configurazione di Vite per la build
       ├── /public             # File statici (index.html)
       └── package.json        # Configurazioni di Vite e dipendenze
```

### 5. **Flusso di Lavoro**

1. **Aggiungi Oggetto (Frontend)**:
   - L'utente compila un form con il nome, la descrizione, il luogo e carica un'immagine.
   - Il form invia una richiesta `POST` al backend, con i dati e l'immagine inclusi in un oggetto `FormData`.
2. **Caricamento dell'Immagine (Backend)**:

   - Il server riceve la richiesta e, tramite **Multer**, gestisce il caricamento dell'immagine nella cartella `uploads`.
   - I dettagli dell'oggetto (nome, descrizione, luogo) vengono memorizzati nel database SQLite, insieme al percorso dell'immagine.

3. **Visualizza Oggetti (Frontend)**:
   - Quando l'utente visualizza la lista degli oggetti, il frontend invia una richiesta `GET` al backend per recuperare tutti gli oggetti dal database.
   - Ogni oggetto viene mostrato con il nome, la descrizione, il luogo e l'immagine (se presente).

### 6. **Tecnologie Utilizzate**

- **React**: Per costruire l'interfaccia utente.
- **TypeScript**: Per una tipizzazione forte nel frontend e nel backend.
- **Bootstrap**: Per la progettazione dell'interfaccia utente (form, bottoni, griglie).
- **Node.js**: Per il backend.
- **Express**: Per gestire le richieste HTTP.
- **SQLite**: Per memorizzare i dati degli oggetti e dei luoghi.
- **Multer**: Per caricare e gestire le immagini nel backend.
- **Vite**: Per la build e la gestione del frontend.

### 7. **Configurazione di Vite per il Build**

Quando esegui il build del frontend con **Vite**, i file statici (JS, CSS, e HTML) vengono generati nella cartella `public`. Questi file vengono poi serviti dal server backend, che li espone tramite il middleware `express.static`.

### 8. **Gestione degli Errori**

L'app è progettata per gestire vari tipi di errori:

- **Frontend**: Mostra alert e messaggi di errore se ci sono problemi con la richiesta o il caricamento dell'immagine.
- **Backend**: Gestisce errori come file mancanti o formati non validi, e risponde con messaggi adeguati.

### 9. **Estensioni Future**

- **Autenticazione**: Aggiungere un sistema di login per gli utenti, in modo che solo gli utenti autenticati possano aggiungere o modificare oggetti.
- **Ricerca e Filtri**: Implementare funzionalità per cercare oggetti e filtrarli per nome, luogo, o altri criteri.
- **Gestione del luogo**: Aggiungere la possibilità di aggiungere, modificare o cancellare luoghi dal database.

---

Questa è la descrizione completa dell'applicazione di gestione oggetti con frontend in React e backend in Node.js. Il sistema è progettato per essere estensibile e facilmente modificabile per aggiungere nuove funzionalità in futuro.
