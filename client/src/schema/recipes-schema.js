import { normalize, schema } from "normalizr";

const recipe = new schema.Entity(
  "recipes",
  {},
  {
    idAttribute: "_id",
  },
);

export function normalizeRecipes(recipes) {
  return normalize(recipes, [recipe]);
}
