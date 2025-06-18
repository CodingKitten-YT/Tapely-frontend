# Tapely - Cassette Customizer

Tapely is a web application that allows users to customize a 3D model of a vintage cassette tape. Users can change the materials of different parts of the cassette, including SIDEA, SIDEB, BASE, and ACCENTS.

## Project Structure

```
Tapely-frontend
├── src
│   ├── assets
│   │   └── tape2.glb
│   ├── components
│   │   ├── Canvas.tsx
│   │   ├── CustomizerUI.tsx
│   │   └── Model.tsx
│   ├── App.css
│   └── App.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

To get started with the Tapely project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Tapely-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Features

- Load and display a 3D model of a cassette tape.
- Customize the materials of the cassette tape:
  - SIDEA
  - SIDEB
  - BASE
  - ACCENTS

## Technologies Used

- React
- Three.js
- Vite
- TypeScript

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.