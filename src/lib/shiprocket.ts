export async function getShiprocketToken() {
    const response = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: process.env.SHIPROCKET_EMAIL,
            password: process.env.SHIPROCKET_PASSWORD,
        }),
    });

    const data = await response.json();
    return data.token;
}

export async function calculateShipping(pincode: string, weightGrams: number) {
    const token = await getShiprocketToken();
    const actualWeight = (weightGrams + 500) / 1000; // KG, adding 500g as per user rule

    const response = await fetch(
        `https://apiv2.shiprocket.in/v1/external/courier/serviceability?pickup_postcode=641028&delivery_postcode=${pincode}&weight=${actualWeight}&cod=0`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();
    return data;
}
