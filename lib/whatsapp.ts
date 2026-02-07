export const generateWhatsAppLink = (
    phone: string,
    product: { name: string; price: number; refId: string },
    quantity: number
) => {
    const total = product.price * quantity;

    // Using Unicode escapes to prevent encoding issues on Windows
    const wave = "\uD83D\uDC4B";
    const box = "\uD83D\uDCE6";
    const num = "\uD83D\uDD22";
    const bag = "\uD83D\uDCB0";
    const id = "\uD83C\uDD94";
    const pin = "\uD83D\uDCCD";
    const rupee = "\u20B9";

    const message = `Hello Prasad Cold Coco! ${wave}
I would like to place an order:

${box} *Product*: ${product.name}
${num} *Quantity*: ${quantity}
${bag} *Est. Total*: ${rupee}${total}
${id} *Ref ID*: ${product.refId}

${pin} *Action Required*:
Please confirm availability and delivery charges for my location.`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encodedMessage}`;
};
