// resultImage.js
import { useState } from 'react';

export const useResultImage = () => {
    const [resultImage, setResultImage] = useState('');

    return [resultImage, setResultImage];
};
