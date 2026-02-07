export const generateWhatsAppLink = (
    phone: string,
    product: { name: string; price: number; refId: string },
    quantity: number
) => {
    const total = product.price * quantity;

    const message = `Hello Prasad Cold Coco! 👋
I would like to place an order:

📦 *Product*: ${product.name}
🔢 *Quantity*: ${quantity}
💰 *Est. Total*: ₹${total}
🆔 *Ref ID*: ${product.refId}

📍 *Action Required*:
Please confirm availability and delivery charges for my location.`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encodedMessage}`;
};
