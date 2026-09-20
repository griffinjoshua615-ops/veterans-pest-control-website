# Veterans Pest Control LLC - Website

Source for the Veterans Pest Control, LLC website. Plain HTML, one stylesheet,
one small JavaScript file. No build step: open `index.html` to view it locally.

**Live:** https://griffinjoshua615-ops.github.io/veterans-pest-control-website/

---

## Two things need a human before this site performs

### 1. Turn on real lead capture (5 minutes)

Until this is done, the quote form opens the visitor's email app with the details
filled in, and offers call and text buttons. That works, but it depends on the
visitor pressing send in their own mail app.

To capture leads directly instead, open `site.js` and put an endpoint in the
first line of config:

```js
var FORM_ENDPOINT = "https://formsubmit.co/veteranspestcontrolllc@gmail.com";
```

With FormSubmit there is no account to create. The first submission triggers a
one-time confirmation email to that address. Click the link in it and every
submission after that arrives as a normal email. Any endpoint that accepts a
POST of form fields works the same way, so this is not a lock-in.

Nothing else needs changing. The form detects the endpoint and switches from
fallback mode to direct capture on its own.

### 2. Point the domain at the site (DNS change)

`veteranspestcontrolllc.com` is registered through Squarespace Domains and paid
through 6 February 2027, but it has no DNS record pointing anywhere, so it does
not load. The site currently lives on the GitHub Pages URL above, and every
canonical tag points there, because a canonical tag aimed at a domain that does
not resolve tells search engines the real page lives somewhere that does not
exist.

When the domain is pointed at GitHub Pages:

1. In the domain's DNS, add four `A` records for the apex pointing at
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`,
   and a `CNAME` for `www` pointing at `griffinjoshua615-ops.github.io`.
2. In this repository: Settings, Pages, Custom domain, enter the domain, save,
   then tick Enforce HTTPS once the certificate is issued.
3. Search and replace the GitHub Pages base URL with
   `https://veteranspestcontrolllc.com/` in every `.html` file, plus
   `sitemap.xml` and `robots.txt`.

Step 3 is the part that is easy to forget, and skipping it leaves the canonical
tags pointing at the old address.

---

## The biggest problem is not on the website

Competitor benchmark for a local pest control business is a complete, consistent
listing profile with 100 or more reviews at 4.7 stars or better. Businesses with
complete profiles are perceived as substantially more reputable and get many
times more views on Google Maps. Against that benchmark, the off-site footprint
is where this business is losing, and no amount of on-page work fixes it.

**1. The name, address and phone do not match across directories.** This is the
single most damaging local-SEO problem a service business can have, because
Google uses consistency across sources to decide the business is real.

| Source | Address | Phone |
|---|---|---|
| This website | 49 Craig Industrial Park, Selma, AL 36701 | (334) 893-4443 |
| BBB | PO Box 11082, Montgomery, AL 36111 | (334) 578-2844 |
| Angi | 3462 Dresden Drive, Montgomery, AL 36113 | not listed |

The site has been left on its current address and number, because that is what
the business supplied and the Selma-Dallas County Chamber listing is Selma-based
too. Eddie Bennett needs to decide which one is authoritative, and then every
listing needs to say exactly that, character for character.

**2. No Google Business Profile surfaced in search.** For pest control, the map
pack is where the leads are. A website cannot rank in the map pack; only a
Google Business Profile can. If one does not exist, creating and verifying it is
worth more than everything else in this document combined. If it does exist, it
needs to be claimed and its NAP matched to the site.

**3. Effectively no reviews.** BBB shows the business unrated with insufficient
information. Angi shows zero reviews. A steady habit of asking satisfied
customers for a Google review is the highest-return unpaid activity available
here. Note that review count and rating are not marked up on this site, and they
should not be until they are real: fabricating rating markup is both an FTC
problem and something Google penalizes directly.

**4. BBB lists the website as the Facebook page.** The actual site is not
attached to the BBB profile, so that listing sends nobody here.

---

## Also worth a decision

**Claims that need backing.** The site says "licensed and experienced" and
"17+ years". Pest control operators in Alabama are licensed through the
Department of Agriculture and Industries. Putting the actual license number in
the footer turns a claim into a verifiable fact, which is worth more than the
adjective.

**Hours consistency.** The old README described "24/7 response" while every page
says Monday to Friday, 8 AM to 5 PM. The pages are the source of truth here.

---

## What changed in this pass

### Pages added (competitor parity)

National operators run a pest library, per-service pages and location pages. The
site had one gallery page and no location pages, so it could not rank for the
searches that actually convert, such as "termite control Selma AL".

- **Eight pest pages** (`pest-termites.html` and so on), 700 to 790 words each:
  signs to look for, why it matters on an Alabama property, our process, what the
  owner can do themselves, what the price depends on, when to act, and three
  questions. Each carries BreadcrumbList, Service and FAQPage structured data.
- **Three service-area pages** for Selma, Montgomery and Prattville, each with
  PestControlService structured data scoped to that city and county.
- Cost sections explain the variables that move a price. No prices, response
  times, guarantee terms or license numbers are stated anywhere, because those
  are the business owner's to supply. Say the word and they go in.
- The Identify Pests gallery now links through to each pest page, and the home
  page carries a service-area strip.
- 18 pages total, all in the sitemap.

### Lead capture
- The quote form no longer uses `action="mailto:"` with `method="post"`. That
  construction is ignored by most mobile browsers without telling the visitor
  anything, so submissions from phones went nowhere silently.
- The form now validates, shows success and failure inline, and either posts to
  a configured endpoint or opens a correctly URL-encoded email with call and
  text buttons beside it.
- Added a hidden honeypot field so bots are dropped without a CAPTCHA.
- Added an "How urgent?" field, including a real-estate closing option, so
  emergencies can be triaged ahead of prevention enquiries.

### Mobile
- Sticky Call now / Free quote bar fixed to the bottom of the screen on phones.
- Page weight, measured over a local server at a 390px viewport:

  | Page     | Before  | After | Reduction |
  |----------|---------|-------|-----------|
  | Home     | 3923 KB | 339 KB| 91%       |
  | Identify | 3392 KB | 486 KB| 86%       |
  | Contact  | 1407 KB | 167 KB| 88%       |

### Images
- `hero.jpg` was a 2.5 MB PNG with a `.jpg` extension. It is now a real
  progressive JPEG at 169 KB, with a WebP alongside it.
- `logo.png` was 1024x1024 at 1.4 MB for something displayed 68px tall. Now
  320px and 136 KB.
- The eight pest photographs are served through `<picture>` with WebP first,
  lazy loaded, with width and height set so the page does not jump while it
  loads.
- Added favicon, Apple touch icon, and 192/512 icons with a web manifest.

### Search
- Canonical tags and `og:url` on every page pointed at the unresolving domain.
  They now point at the live URL. See the DNS section above.
- Added `og:image` to every page, plus `sitemap.xml` and `robots.txt`.
- New `faq.html` with ten questions and `FAQPage` structured data, generated
  from the page's own content so the markup cannot drift from the copy.

### Accessibility
- Skip-to-content link, `id="main"` landmark, visible focus rings.
- Mobile menu now reports `aria-expanded`, opens with Enter or Space, closes on
  Escape and after a link is followed.
- Contrast checked: navy on the success panel 14.0:1, error ink 8.3:1, white on
  the call bar 15.4:1, navy on gold 7.5:1. WCAG AA needs 4.5:1.

### Repository
- Removed four zip archives totalling 47 MB, ten unreferenced `_photo.png`
  files, an unused `images/` directory, and eight unreferenced icon PNGs.
  Working tree went from 60 MB to 1.7 MB.
- Note: this removes them going forward. The old blobs still sit in git history,
  so a fresh `git clone` still downloads roughly 94 MB. Shrinking that needs a
  history rewrite, which rewrites every commit hash. Not worth doing unless
  clone time becomes a real problem.

---

## Files

```
index.html services.html identify.html faq.html why.html about.html contact.html
pest-termites.html pest-bed-bugs.html pest-cockroaches.html pest-ants.html
pest-rodents.html pest-mosquitoes.html pest-spiders.html pest-wasps.html
pest-control-selma-al.html pest-control-montgomery-al.html
pest-control-prattville-al.html
styles.css
site.js          form handling, mobile menu, config at the top
sitemap.xml robots.txt site.webmanifest
*.jpg / *.webp      photographs, WebP served first
logo.png favicon-32.png apple-touch-icon.png icon-192.png icon-512.png
```

## Credits

Maintained for Veterans Pest Control, LLC. Please do not redistribute without
permission.
