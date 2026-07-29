// Builds the gallery grid from the "artworks" array defined in data.js.
// Nothing in this file needs editing to add or remove pieces.

document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("work");

  if (!window.artworks || !Array.isArray(window.artworks)) {
    console.error("gallery.js: 'artworks' array not found — check that data.js loaded before gallery.js.");
    return;
  }

  artworks.forEach((piece) => {
    const figure = document.createElement("figure");
    figure.className = "piece";

    const frame = document.createElement("div");
    frame.className = "frame";
    frame.tabIndex = 0;

    if (piece.image) {
      // Real artwork image
      const img = document.createElement("img");
      img.src = `images/${piece.image}`;
      img.alt = piece.title || "";
      img.loading = "lazy";
      frame.appendChild(img);
    } else {
      // No image yet — show a colored placeholder tile instead.
      // Height is varied per piece so you can preview the masonry
      // effect even before real images are added; once you add an
      // image, its natural proportions take over automatically.
      frame.style.setProperty("--tile-color", piece.tileColor || "#ccc");
      const seed = (piece.title || "").length;
      const placeholderHeight = 220 + ((seed * 47) % 220); // ~220-440px
      frame.style.height = `${placeholderHeight}px`;
      const note = document.createElement("span");
      note.className = "placeholder-note";
      note.textContent = "image";
      frame.appendChild(note);
    }

    const caption = document.createElement("figcaption");
    caption.className = "label";

    const title = document.createElement("span");
    title.className = "label-title";
    title.textContent = piece.title || "Untitled";

    const meta = document.createElement("span");
    meta.className = "label-meta";
    meta.textContent = [piece.medium, piece.year].filter(Boolean).join(" · ");

    caption.appendChild(title);
    caption.appendChild(meta);

    figure.appendChild(frame);
    figure.appendChild(caption);
    gallery.appendChild(figure);
  });
});
