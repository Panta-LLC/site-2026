import { defineType, defineField } from "sanity";

export default defineType({
  name: "experiment",
  title: "Experiment",
  type: "document",
  fields: [
    defineField({ name: "key", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "variants", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "active", type: "boolean" }),
  ],
});
