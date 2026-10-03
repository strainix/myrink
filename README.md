# myrink

Ice hockey tactics board on a 60 × 30 m Swiss rink (IIHF surface, 8.5 m corners) with a one-metre coordinate grid.

- Drag players and the puck, build a play frame by frame, press Play.
- Arrows follow the usual playbook legend: skate, skate with puck, pass/dump, shot, skate backwards, opponent greyed out.
- **⋯ → New play** starts from a faceoff or an empty rink. **Add player** puts players on the ice; tap one to switch Home/Away, set his position (LW C RW LD RD G, or # for a numbered skater) or remove him. There's no fixed roster: leave players out for power plays and penalty kills.
- Every play is also a small script (open **Script**), e.g. `HC 40,12 via 30,8`, `puck HLD via 0,9` (bank pass), `H7 18,6` (numbered skater) or `HLW off`.
- **⋯ → Library** opens ready-made plays from the [`library/`](library/) folder of this repo.

It's a static site with no build step, and an installable app (PWA): it works offline and can be added to the home screen or desktop. Plays are saved in the browser (localStorage).

## Library

The app fetches `library/library.json` and the play scripts straight from GitHub
(`raw.githubusercontent.com/strainix/myrink/main/library/`), so pushing a new play to `main`
makes it show up in the app without a redeploy. See [`library/README.md`](library/README.md) for how to add plays.

## Install as an app

- **Android / Chrome / Edge:** open the site, then ⋯ menu in the app → **Install app** (or the install icon in the address bar).
- **iPhone / iPad:** open the site in Safari → Share → **Add to Home Screen**. The app's ⋯ menu shows these steps too.

On Android the installed app opens full screen (no status or navigation bar). In a browser, ⋯ → **Full screen** does the same where the browser supports it. iOS always keeps its status bar.

## Deploy on Cloudflare Pages

1. Workers & Pages → Create → Pages → Connect to Git → pick this repo.
2. Framework preset: **None**. Build command: *(leave empty)*. Build output directory: `/`.
3. Save and Deploy. Every push to `main` redeploys.

After changing the app, bump `VERSION` in `sw.js` (e.g. `v5` → `v6`) so installed apps fetch the new version.

## Files

- `index.html` – the app
- `manifest.webmanifest`, `icons/` – app name and icons
- `sw.js` – offline support (also keeps the last library copy for offline use)
- `_headers` – Cloudflare Pages cache headers
- `library/` – the play library

## Credits

Icons: [Phosphor Icons](https://phosphoricons.com) (MIT License), embedded as inline SVG.
Fonts: Barlow, Barlow Condensed and JetBrains Mono via Google Fonts (SIL Open Font License).
