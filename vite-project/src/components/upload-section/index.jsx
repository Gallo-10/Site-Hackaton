import './style.css';
import React, { useState } from 'react';

const App = () => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        setFiles([...selectedFiles]); // Armazena todos os arquivos selecionados
    };

    const uploadFiles = async () => {
        const formData = new FormData();

        files.forEach((file, index) => {
            formData.append('images', file);  // Envia todos os arquivos na chave 'images'
        });

        try {
            const response = await fetch('http://localhost:8080/predict', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            console.log('Resultado da predição:', result);
        } catch (error) {
            console.error('Erro ao enviar os arquivos:', error);
        }
    };


    return (
        <header className="jjj">
            <div className="uploader-container">
                <label htmlFor="uploadImgs" className="upload-label">
                    <div className="upload-icon">
                        <img src="https://img.icons8.com/clouds/100/000000/upload.png" alt="upload icon" />
                    </div>
                    <p>Choose Your Images to Upload</p>
                    <span>Or Drop Your Images Here</span>
                </label>
                <input
                    id="uploadImgs"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="uploader"
                />
                <button className="upload-button" onClick={uploadFiles}>Upload</button>
            </div>
        </header>
    );
};

export default App;
