# myrink library

Plays for the myrink tactics board. The app reads `library.json` from this
folder on GitHub (`https://raw.githubusercontent.com/strainix/myrink/main/library/`) and opens a play's script when you pick it in **⋯ → Library**.

## Layout

```
library.json            index the app reads: categories and plays
plays/<category>/*.txt  one myrink script per play
```

## Add a play

1. Build the play in myrink, open **Script** and copy it.
2. Save it as `library/plays/<category>/<number>-<name>.txt`. Start the file with comment lines
   (`# ...`) describing the play; the app shows the script as-is.
3. Add an entry to `plays` in `library/library.json` (paths are relative to `library/`):

```json
{
  "id": "breakout-up-the-wall",
  "category": "breakouts",
  "title": "Up the wall",
  "strength": "5v5",
  "when": "Wall open, F1 on the D. The default first option.",
  "tags": ["wall", "strong side"],
  "file": "plays/breakouts/01-up-the-wall.txt"
}
```

4. Commit and push to `main`. The app picks it up the next time the library is opened. No app update needed.

## Categories

Add a category to `categories` in `library.json` before using it. Suggested ids for later:

| id | title |
|---|---|
| `breakouts` | Breakouts |
| `forecheck` | Forecheck |
| `neutral-zone` | Neutral zone |
| `offensive-zone` | Offensive zone |
| `power-play` | Power play |
| `penalty-kill` | Penalty kill |
| `faceoffs` | Faceoffs |
| `drills` | Drills |

Categories with no plays are hidden in the app.

## Script conventions

- Home (H…) defends the left net and attacks right. x runs 0–59 left to right, y 0–29 bottom to top.
- Only players listed in the script are on the ice (use this for power plays and penalty kills).
- `strength` is from the home team's view: `5v5`, `5v4`, `4v5`, `6v5`, …
