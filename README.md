# Rink Grid

Ice hockey tactics board on a 60 × 30 m Swiss rink (IIHF surface, 8.5 m corners) with a one-metre coordinate grid.

- Drag players and the puck, build a play frame by frame, press Play.
- Arrows follow the usual playbook legend: skate, skate with puck, pass/dump, shot, skate backwards, opponent greyed out.
- Every play is also a small script (open **Script**), e.g. `HC 40,12 via 30,8` or `puck 54,15 shot`.

It's a static site with no build step, and an installable app (PWA): it works offline and can be added to the home screen or desktop. Plays are saved in the browser (localStorage).

## Install as an app

- **Android / Chrome / Edge:** open the site, then ⋯ menu in the app → **Install app** (or the install icon in the address bar).
- **iPhone / iPad:** open the site in Safari → Share → **Add to Home Screen**. The app's ⋯ menu shows these steps too.

On Android the installed app opens full screen (no status or navigation bar). In a browser, ⋯ → **Full screen** does the same where the browser supports it. iOS always keeps its status bar.

## Updating

After changing files, bump `VERSION` in `sw.js` (e.g. `v1` → `v2`) so installed apps fetch the new version.

## Deploy on Cloudflare Pages

1. Workers & Pages → Create → Pages → Connect to Git → pick this repo.
2. Framework preset: **None**. Build command: *(leave empty)*. Build output directory: `/`.
3. Save and Deploy. Every push to `main` redeploys.

## Files

- `index.html` – the app
- `manifest.webmanifest`, `icons/` – app name and icons
- `sw.js` – offline support
- `_headers` – Cloudflare Pages cache headers

## Credits

Icons: [Phosphor Icons](https://phosphoricons.com) (MIT License), embedded as inline SVG.
Fonts: Barlow, Barlow Condensed and JetBrains Mono via Google Fonts (SIL Open Font License).
