export const savePrediction = (prediction) => {
    const predictions = JSON.parse(localStorage.getItem('predictions')) || [];
    localStorage.setItem('predictions', JSON.stringify([...predictions, prediction]));
}

export const getPredictions = () => {
    return JSON.parse(localStorage.getItem('predictions')) || [];
}
export const clearPredictions = () => {
    localStorage.removeItem('predictions');
}
