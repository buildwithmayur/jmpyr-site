# JMPYR concept website

A static sample site for JMPYR The Jewelries Empire (Madhav Nagar, Katni), made for a sales pitch. It's plain HTML, CSS and JavaScript, with no build step.

## Pages
- `index.html`: home page with the lit-ring hero, gift finder, featured pieces, gifts, store details, reviews and Instagram posts
- `jewellery.html`: all 35 pieces, with filters by type and sorting
- `gifts.html`: bouquets, personalised gifts, wedding gifts and the **Build a hamper** tool
- `visit.html`: map, opening hours, ways to order and FAQ

## Change the details in one place
Open `assets/js/data.js` and edit `CONFIG`:
- `whatsapp`: their number with country code, digits only (e.g. `919876543210`). While it's empty, WhatsApp opens with the message already typed and the visitor picks the chat.
- `agency`: your studio name, shown in the concept note and the footer.
- `hours`, `address`: store details.

Products and prices are in `PRODUCTS` in the same file. Product photos are in `assets/img/products/`, named by product slug.

## Deploy on Vercel
Drag the folder into vercel.com/new, or run `npx vercel` inside it. No settings are needed.

After deploying, change `og:image` in the four HTML files to the full address (e.g. `https://your-site.vercel.app/assets/img/og.jpg`), so WhatsApp shows the preview image when you share the link.

## Before it goes live for real
- Remove `<meta name="robots" content="noindex, nofollow">` from each page and delete `robots.txt`.
- Remove the "Concept site" note at the top of each page.
- Confirm the claims and details listed in the handover notes (hours, payment methods, product claims).
