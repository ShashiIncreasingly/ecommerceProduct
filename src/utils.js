export const fetchProducts = async (url) => {
    try {
        const response = await fetch(url);
 
        if (!response.ok) {
            // If the response status is not in the range 200-299, treat it as an error
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
 
        const responseData = await response.json();
 
        return { responseData, error: null };
    } catch (error) {
        return { responseData: null, error: { status: "Error", message: error.message } };
    }
};
 