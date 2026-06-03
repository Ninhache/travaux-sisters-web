import type { CSSProperties } from "react";

/**
 * Couleur de badge déterministe à partir d'un slug de catégorie.
 *
 * Les catégories proviennent du back (slugs dynamiques : "vos-projets-travaux",
 * "emploi-formation", …), on ne peut donc pas se reposer sur une table de
 * couleurs codée en dur. On dérive une teinte stable du slug : la même
 * catégorie aura toujours la même couleur, et deux catégories différentes
 * obtiennent des teintes distinctes.
 */

/** Hash stable (djb2) d'une chaîne vers un entier positif. */
function hashString(value: string): number {
  let hash = 5381;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 33) ^ value.charCodeAt(i);
  }
  return Math.abs(hash);
}

/** Teinte (0-359) dérivée du slug. */
function hueFromSlug(slug: string): number {
  return hashString(slug) % 360;
}

/**
 * Style inline pour un badge de catégorie : dégradé coloré + texte blanc lisible.
 * La luminosité est volontairement basse (45-55%) pour garder un bon contraste
 * avec le `text-white` du badge.
 */
export function getCategoryStyle(slug: string): CSSProperties {
  const hue = hueFromSlug(slug || "default");
  const from = `hsl(${hue} 65% 45%)`;
  const to = `hsl(${(hue + 28) % 360} 70% 55%)`;

  return {
    background: `linear-gradient(135deg, ${from}, ${to})`,
    borderColor: "transparent",
    color: "#fff",
  };
}

/**
 * Conservé pour compatibilité : renvoie uniquement le dégradé de fond.
 * @deprecated Préférer {@link getCategoryStyle} qui gère aussi la couleur du texte.
 */
export function getCategoryGradient(slug: string): CSSProperties {
  const { background } = getCategoryStyle(slug);
  return { background };
}
