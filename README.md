# Rink Grid

Ice hockey tactics board on a 60 × 30 m Swiss rink (IIHF surface, 8.5 m corners) with a one-metre coordinate grid.

- Drag players and the puck, build a play frame by frame, press Play.
- Arrows follow the usual playbook legend: skate, skate with puck, pass/dump, shot, skate backwards, opponent greyed out.
- Every play is also a small script (open **Script**), e.g. `HC 40,12 via 30,8` or `puck 54,15 shot`.

It's a single static `index.html` with no build step. Plays are saved in the browser (localStorage).

## Deploy on Cloudflare Pages

1. Workers & Pages → Create → Pages → Connect to Git → pick this repo.
2. Framework preset: **None**. Build command: *(leave empty)*. Build output directory: `/`.
3. Save and Deploy. Every push to `main` redeploys.

## Credits

Icons: [Phosphor Icons](https://phosphoricons.com) (MIT License), embedded as inline SVG.
Fonts: Barlow, Barlow Condensed and JetBrains Mono via Google Fonts (SIL Open Font License).
