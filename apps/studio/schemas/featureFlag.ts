import { defineType, defineField } from "sanity";

export default defineType({
  name: "featureFlag",
  title: "Feature Flag",
  type: "document",
  fields: [
    defineField({ name: "key", type: "string" }),
    defineField({ name: "enabled", type: "boolean" }),
    defineField({ name: "description", type: "text" }),
  ],
});
