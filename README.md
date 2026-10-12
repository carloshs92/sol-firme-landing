# Sol Firme · Landing

Página de presentación de [Sol Firme](https://github.com/carloshs92/bcrp-game), el juego gratis sobre la política monetaria del BCRP. Lleva a jugar, explica cómo se juega, invita a docentes y pide apoyo.

## Estructura

- `site/index.html`: toda la página (HTML y CSS en un solo archivo, sin build).
- `site/img/`: capturas reales del juego en tema Día y Noche (`*-dia.webp`, `*-noche.webp`), 780 px de ancho.
- `.github/workflows/deploy.yml`: cada push a `main` publica `site/` en GitHub Pages.

## Reglas

- Design system "Sol Firme Chicha": los colores son copia de `src/tokens.css` del juego. Si cambian allá, se copian acá. Un solo botón fucsia por pantalla, sombras duras sin desenfoque, contraste 4.5:1 en Día y Noche.
- Textos en español, cortos y con el tono peruano del juego.
- El aviso de no afiliación al BCRP va siempre en el pie.
- Personajes ficticios y sin caras humanas. Ninguna cifra que no tenga fuente.

## Enlace al juego

"Jugar ahora" y "Jugar gratis" llevan a la dirección donde esté publicado el juego. Hoy apuntan a `https://bcrp-game.carlos-hs-92.workers.dev/` (Cloudflare Workers); si el juego se publica en otro lugar, se cambian esos dos `href` en `site/index.html`.

## Ver en local

```bash
npx serve site
```

## Publicar

En Settings → Pages, elegir "GitHub Actions" como fuente una sola vez. Después cada merge a `main` publica en `https://carloshs92.github.io/sol-firme-landing/`.
