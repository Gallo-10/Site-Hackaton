import './App.css';
import Header from './components/header/index.jsx';
import Upload from './components/upload-section/index.jsx';
import { useState } from 'react';

function App() {
  const [resultImage, setResultImage] = useState(''); // Estado para armazenar a imagem base64

  return (
    <div className="header-container">
      <>
        <Header />
      </>
      {/* Passa setResultImage para o componente Upload */}
      <Upload setResultImage={setResultImage} />

      {/* Renderiza a imagem apenas se resultImage estiver definido */}
      {resultImage && (
        <img src={`data:image/png;base64,${resultImage}`} alt="Result" />
      )}
    </div>
  );
}

export default App;
