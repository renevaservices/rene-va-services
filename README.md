# Rene VA Services – Frontend

A static, single-page marketing site for **Rene VA Services**, built with HTML5, CSS3, Bootstrap 5.3.3 and vanilla JavaScript. It has no build step and no backend.

## Run locally

Any static file server works. From this `Frontend` folder:

```bash
npx serve .
```

or

```bash
python -m http.server 8080
```

Then open the printed URL (for example http://localhost:8080). You can also open `index.html` directly in a browser.

## Structure

```
Frontend/
├── index.html                       Home page (all sections)
├── terms-of-service.html            Footer legal page
├── refund-cancellation-policy.html  Footer legal page
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css        Bootstrap 5.3.3 (local copy)
│   │   ├── style.css                Design tokens + all component styles
│   │   └── responsive.css           Breakpoint overrides (xl / lg / md / sm / <360)
│   ├── js/
│   │   ├── bootstrap.bundle.min.js  Bootstrap 5.3.3 (collapse + dropdown)
│   │   └── main.js                  Site interactions
│   ├── icons/
│   │   ├── bootstrap-icons.min.css  Bootstrap Icons 1.11.3 (local copy)
│   │   └── fonts/                   Icon webfonts
│   └── images/
│       ├── logo.png                 Supplied logo with only its white margin trimmed (same pixels)
│       ├── logo-original.jpg        The supplied logo file, untouched
│       ├── hero-banner.webp
│       ├── rene-labuschagne.webp    About-section portrait (supplied photo)
│       ├── digital-products.webp
│       └── samples/                 sample-inbox / sample-agreement / sample-branding .webp
└── README.md
```

Google Fonts (Playfair Display, Inter and Great Vibes) are loaded from fonts.googleapis.com. Everything else is local.

## Design tokens

Brand colours and fonts are CSS custom properties at the top of `assets/css/style.css` (`--navy`, `--gold`, `--cream`, `--font-serif` and so on). Change them there.

## JavaScript features (`assets/js/main.js`)

- Mobile menu (Bootstrap collapse). It closes after a link is chosen or when Escape is pressed.
- Smooth anchor scrolling. The offset comes from CSS `scroll-padding-top` (`--header-h`).
- The active nav link is highlighted as you scroll.
- The sticky header gets a shadow and a smaller logo once you scroll.
- Back-to-top button.
- Scroll-reveal animations using IntersectionObserver.
- `prefers-reduced-motion` is respected: animations and smooth scrolling are turned off.

## Before going live – please review

1. **Images:** the hero, about, digital-products and sample images were cut from the approved homepage mock-up. That keeps them visually identical, but they are low resolution (about 300–550px source width). Replace them with high-resolution photos using the same file names. The hero photo needs a clear area in its upper-middle, where the four task cards sit (`.task-list` in `style.css` is positioned in percentages of the photo).
2. **Digital Products Shop button:** this currently links to `#contact`. Point the `data-shop-link` anchor in `index.html` to the shop URL once it exists.
3. **Sample cards:** these link to `#contact` ("ask about a similar project") because there are no sample detail pages yet.
4. **Legal pages:** `terms-of-service.html` and `refund-cancellation-policy.html` contain general starter wording so the footer links work. The business owner should review and adjust it before launch.
5. **Plans section:** no prices are shown publicly. Each plan card has a **Request a Quote** button that opens WhatsApp (065 034 3195, via `wa.me/27650343195`) in a new tab with a pre-filled message naming the plan, e.g. "Quote request – Growth plan". The **Get a Custom Quote** button at the end of the section opens WhatsApp with a general quote-request message. The nav label is "Plans" (the anchor is still `#pricing`).
6. **Samples:** the section note reads "Sample scenarios | Mock examples, not past client engagements", and each card carries a "Mock example" tag. Image alt text starts with "Illustrative image" and the screen-reader label states it is not a past client engagement. Keep this labelling if samples are added or changed.
7. **Contact details:** renevaservices@gmail.com and WhatsApp 065 034 3195 (`wa.me/27650343195`) appear in the Contact section, the footer, the floating WhatsApp button (every page scroll position) and the schema.org data in `<head>`. If either changes, search the project for both values and update every occurrence, including the two legal pages.
8. **Open Graph image:** `og:image` points to `https://renevaservices.co.za/assets/images/hero-banner.webp`. That works once the site is deployed at the canonical domain.

## Browser testing done

Checked at 1920, 1440, 1366, 1024, 768, 576, 430, 390, 375 and 320px wide with no horizontal overflow. Also tested: mobile menu, Services dropdown, anchor scrolling with the menu open, active-link tracking, and that every asset loads (HTTP 200).

---

Designed & Developed by [CruzeTek IT Services](https://www.cruzetek.com)
