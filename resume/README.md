# Resume authoring — LaTeX

`Terry_Felton_Resume_November2026.tex` is the authoritative source. It is adapted from the October 2026 `.tex` in Google Drive → Resumes → Archive, after reviewing the May, July and August sources. The earlier November HTML-to-PDF source is superseded; its previous revision remains in Git history.

Preserve professional dates, verified accomplishments, readable typography and one-page layout. Describe Garage's admin capability separately from finance ownership. Never put personal application records, employer code or credentials in the resume.

## Build

Install [Tectonic](https://tectonic-typesetting.github.io/) and Poppler (`pdfinfo`, `pdftotext`). Tectonic 0.17.0 is installed at `~/.local/bin/tectonic` on the development PC; its first compilation downloads the TeX resources it needs. Ordinary XeLaTeX distributions and Overleaf can also compile the `.tex` document; the npm command uses Tectonic.

```sh
npm run resume
npm run build
```

If Tectonic is outside PATH, set `TECTONIC_BIN` to its absolute path. `npm run resume` compiles into ignored `resume/build/`, verifies a one-page PDF and expected extractable text, then replaces the published PDF under `files/`. Compilation or validation failure leaves the previously published PDF intact. Inspect the rendered PDF after content/layout edits; the text/page checks cannot establish visual quality or full PDF accessibility.

The public website build copies the PDF but does not compile LaTeX in Cloudflare. Commit source and compiled PDF together. Update the existing November PDF in Google Drive in place, preserve archived originals, and upload/update its `.tex` beside it. The Drive copies are manually maintained.

This PDF uses a traditional single-column text layout. Extractable text and links have been checked; full tagged-PDF accessibility has not been implemented.
