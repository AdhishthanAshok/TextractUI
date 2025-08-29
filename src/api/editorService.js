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

export const detectEntities = async (imageBase64, imageType, timeout = 120000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    console.log("API Called with timeout limit : ", timeout)
    try {
        const res = await fetch(`${BASE_URL}/detect-entities`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                image_base64: imageBase64,
                image_type: imageType
            }),
            signal: controller.signal
        });
        console.log("PAYLOAD : ", imageBase64, imageType)
        clearTimeout(timeoutId); // clear if successful

        const data = await res.json();
        console.log("Data : ", imageBase64, imageType)
        if (!data) {
            throw new Error(data.message || "Detection failed");
        }
        return data;
    } catch (err) {
        clearTimeout(timeoutId); // ensure timeout is cleared on any error

        if (err.name === "AbortError") {
            console.error("Request timed out after 2 minutes");
            throw new Error("Request timed out after 2 minutes");
        }

        console.error(err);
        throw err;
    }
};