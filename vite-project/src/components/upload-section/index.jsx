import './style.css';
import React, { useState } from 'react';
import { useResultImage } from './resultImage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from './firebase.mjs';
import mime from 'mime'; // Certifique-se de instalar a biblioteca mime-types
import { v4 } from 'uuid';

const App = ({ setResultImage }) => {
    const [files, setFiles] = useState([]);
    const [clicked, setClicked] = useState(false);

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
            console.log('Resultado da predição:', result.latitude);
            setResultImage(result.image); // Atualiza o resultImage com a imagem base64 recebida
        } catch (error) {
            console.error('Erro ao enviar os arquivos:', error);
        }


        try {
            const contentType = mime.getType(formData.name) || 'application/octet-stream';
            const storageRef = ref(storage, `images/${v4()}`);
            const metadata = { contentType };
            const snapshot = await uploadBytes(storageRef, formData, metadata);
            console.log('Uploaded a blob or file!', snapshot);
            const url = await getDownloadURL(snapshot.ref);
            const valRef = collection(db, 'images');
            await addDoc(valRef, { Url: url });
            console.log('File available at', url);
        } catch (error) {
            console.error('Error uploading file:', error);
        }

    };

    const handleUploadClick = () => {
        setClicked(true);  // Inicia a animação

        // Remove a animação após 300ms para permitir que ela seja reiniciada em futuros cliques
        setTimeout(() => {
            setClicked(false);
        }, 300);

        // Chama a função de upload
        uploadFiles();
    };

    return (
        <header className="jjj">
            <div className="uploader-container">
                <label htmlFor="uploadImgs" className="upload-label">
                    <div className="upload-icon">
                        <img src="https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-Transparent-PNG.png" alt="upload icon" />
                    </div>
                    <p>Escolha as imagens para enviar</p>
                    <span>Ou arraste as imagens aqui</span>
                </label>
                <input
                    id="uploadImgs"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="uploader"
                />
                <button
                    className={`upload-button ${clicked ? 'upload-button-animation' : ''}`}
                    onClick={handleUploadClick}
                >
                    Upload
                </button>
            </div>
        </header>
    );
};

export default App;
