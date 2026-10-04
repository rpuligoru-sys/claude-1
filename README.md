# Wedding invitation builder

Form (`public/index.html`) -> saved on Netlify (Functions + Blobs) -> guests open `/i/<link-name>`.

## Deploy (about 10 minutes)
1. Create a new GitHub repository and upload everything in this folder (keep the folder structure).
2. In Netlify: Add new site -> Import an existing project -> GitHub -> pick the repo. Leave the build settings as they are (`netlify.toml` sets them) and click Deploy.
3. Open your `*.netlify.app` address, fill the form, submit. You get a guest link and a private edit link.

## Test on your computer (optional)
`npm i -g netlify-cli` then `npm i` then `netlify dev`

## Add a new design
In `public/themes.css` copy one `[data-theme=...]` line, change the name and colours/fonts, add the font to the link in `invite.html`, and add a radio option in `index.html`. Also add the name to the allowed list in `invite.html`.

## Not included yet
Admin page, background music, Telugu/Hindi text, live preview before submitting.

## Preview images, scroll scenes and songs
- Previews: add `public/previews/<theme>.webp` (gold, floral, royal, temple). They replace the drawn previews in the form.
- Temple scroll theme: add your tall image as `public/scenes/temple.webp` (about 800px wide, 2500-4000px tall). It pans as guests scroll. Until then a saffron gradient shows.
- Custom scene for any design: customers can upload a tall background in the form; it turns on the same scroll effect.
- Songs: customers can upload an MP3 (under 2.5 MB). To offer ready-made songs, put MP3s in `public/music/` and list them in `public/music/list.json`, e.g. `[["song1.mp3","Shubhakaryam"]]`.
- Music starts when the guest taps Open invitation, with a small button to mute.
