const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;

export const saveData = async (payload) => {
    try {
        const res = await fetch(`${BASE_URL}/save-data`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            throw new Error("Error sending data to backend");
        }

        return await res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const detectEntities = async (imageBase64, imageNaturalSize) => {
    try {
        // const testingData = "bfibjhefiwb234u918129038120933"
        const res = await fetch(`${BASE_URL}/detect-entities`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                // image: testingData,
                image: imageBase64,
                imageNaturalSize: imageNaturalSize
            })
        });

        const data = await res.json();
        if (!data.status) {
            throw new Error(data.message || "Detection failed");
        }
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};