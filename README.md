# Filmland Website Documentation

## English Version

### Project Overview

This project involves the development of a website for movies and series with two sections: a user section and an admin section. Additionally, a model is integrated to analyze comments and determine their sentiment (negative, positive, or neutral).

### Technology Stack
- **Backend**: ASP.NET, FastAPI (Python), SQL Server
- **Frontend**: React, HTML, CSS, JavaScript
- **Machine Learning**: BERT, PyTorch Lightning, Transformers, Hazm, Scikit-learn, Pandas
- **Deployment**: Uvicorn, Colab (Google)

### Tools and Libraries
- **Logging**: Serilog
- **API Development**: REST API, Swagger
- **Version Control**: GitHub
- **Database Interaction**: Dapper (Micro ORM)
- **HTTP Requests**: Axios
- **UI Design**: Swiper, Bootstrap, Tailwind
- **Middleware**: CORS Middleware
- **Tokenization**: Hugging Face Tokenizers
- **Optimization**: AdamW Algorithm
- **Model Saving**: joblib
- **Async Handling**: nest_asyncio

### System Architecture

<img src="https://github.com/user-attachments/assets/bfdb23e9-b154-4dbe-b767-4a2fc3809548" width="400"/>


### Screenshots

To provide a more detailed view of the project, this section showcases screenshots of various features:


<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
  <h3>User Panel</h3>
  <img src="https://github.com/user-attachments/assets/a4484f57-1aa0-4ff0-8057-cc1e0f19b6b7" width="49%"/>
  <img src="https://github.com/user-attachments/assets/b2832989-8164-42d6-aa5a-bdcf879e2468" width="49%"/>
  <img src="https://github.com/user-attachments/assets/fa0e1b46-c662-4788-b003-df678f6b2135" width="49%"/>
  <img src="https://github.com/user-attachments/assets/9ba0adfd-55bd-4013-9737-ecd6cface862" width="49%"/>
  <img src="https://github.com/user-attachments/assets/f814ef32-c200-4bd7-92ab-242e660befd1" width="49%"/>
  <img src="https://github.com/user-attachments/assets/e674b280-e98c-45b3-9768-1113ba108f3c" width="49%"/>
  <img src="https://github.com/user-attachments/assets/9dadca40-0459-48c8-a672-7ea0822b9f2e" width="49%"/>

  <h3>Admin Panel</h3>
  <img src="https://github.com/user-attachments/assets/17779a0b-7698-4603-8990-39f8a296d7d7" width="49%"/>
  <img src="https://github.com/user-attachments/assets/17779a0b-7698-4603-8990-39f8a296d7d7" width="49%"/>
  <img src="https://github.com/user-attachments/assets/83f89631-c7a3-40da-83b7-029e8d375fd7" width="49%"/>
</div>






### User Panel

- **Login and Registration**: Users can log in or sign up to access the platform.
- **Subscription Purchase**: Users can buy subscriptions to access download links for films and series.
- **Search and Filter**: Users can search for and filter content to find their desired films or series.
- **Commenting**: Users can post comments, which undergo:
  - **Review by Model**: The model evaluates the sentiment (negative, positive, or neutral).
  - **Offensive Language Detection**: Comments containing inappropriate language are not displayed.

### Admin Panel

- **Site Management**:
  - Modify all aspects of the site.
- **Content Management**:
  - Add, edit, or delete films and series.
- **Homepage Customization**:
  - Update banners, mini banners, and Group cards displayed on the homepage.
- **Actor Management**:
  - Add actors and link them to one or multiple films/series.
- **Download Links**:
  - Add multiple download links to films and series.

---

## Deutsche Version

### Projekt Übersicht

Dieses Projekt umfasst die Entwicklung einer Website für Filme und Serien mit zwei Bereichen: einem **Benutzerbereich** und einem **Admin-Bereich**. Zudem wird ein Modell integriert, das Kommentare analysiert und deren Sentiment (negativ, positiv oder neutral) bestimmt.

### Technologiestack
- **Backend**: ASP.NET, FastAPI (Python), SQL Server
- **Frontend**: React, HTML, CSS, JavaScript
- **Machine Learning**: BERT, PyTorch Lightning, Transformers, Hazm, Scikit-learn, Pandas
- **Deployment**: Uvicorn, Colab (Google)

### Werkzeuge und Bibliotheken
- **Logging**: Serilog
- **API-Entwicklung**: REST API, Swagger
- **Versionskontrolle**: GitHub
- **Datenbank-Interaktion**: Dapper (Micro ORM)
- **HTTP-Anfragen**: Axios
- **UI-Design**: Swiper, Bootstrap, Tailwind
- **Middleware**: CORS Middleware
- **Tokenisierung**: Hugging Face Tokenizers
- **Optimierung**: AdamW-Algorithmus
- **Modell-Speicherung**: joblib
- **Async-Handling**: nest_asyncio

### Systemarchitektur
<img src="https://github.com/user-attachments/assets/bfdb23e9-b154-4dbe-b767-4a2fc3809548" width="400" />


### Benutzerbereich

- **Anmeldung und Registrierung**: Benutzer können sich anmelden oder registrieren, um Zugang zur Plattform zu erhalten.
- **Abonnement kaufen**: Benutzer können ein Abonnement erwerben, um Zugriff auf die Download-Links für Filme und Serien zu erhalten.
- **Suche und Filter**: Benutzer können Inhalte durchsuchen und filtern, um die gewünschten Filme oder Serien zu finden.
- **Kommentarfunktion**: Benutzer können Kommentare hinterlassen, die:
  - **Vom Modell analysiert** werden: Das Modell bewertet das Sentiment (negativ, positiv oder neutral).
  - **Auf beleidigende Sprache überprüft** werden: Kommentare mit unangemessener Sprache werden nicht angezeigt.

### Admin-Bereich

- **Website-Management**:
  - Änderungen an allen Bereichen der Website vornehmen.
- **Inhaltsverwaltung**:
  - Filme und Serien hinzufügen, bearbeiten oder löschen.
- **Anpassung der Startseite**:
  - Banner, Mini-Banner und Kategorienkarten auf der Startseite aktualisieren.
- **Schauspielerverwaltung**:
  - Schauspieler hinzufügen und mit einem oder mehreren Filmen/Serien verknüpfen.
- **Download-Links**:
  - Mehrere Download-Links zu Filmen und Serien hinzufügen.

