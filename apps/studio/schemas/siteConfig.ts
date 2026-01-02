export default {
  name: "siteConfig",
  title: "Site Configuration",
  type: "document",
  __experimental_actions: ["update", "create", "delete", "publish"],
  fields: [
    {
      name: "title",
      title: "Site Title",
      type: "string",
    },
    {
      name: "logo",
      title: "Site Logo",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    },
    {
      name: "menu",
      title: "Main menu",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "url", type: "url", title: "URL" },
            { name: "internal", type: "slug", title: "Internal slug" },
          ],
        },
      ],
    },
    {
      name: "footer",
      title: "Footer (categorized)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Category title" },
            {
              name: "links",
              title: "Links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", type: "string", title: "Label" },
                    { name: "url", type: "url", title: "URL" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      description: "Primary contact email address",
    },
    {
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
      description: "Primary contact phone number",
    },
    {
      name: "notificationBar",
      title: "Notification Bar",
      type: "object",
      fields: [
        { name: "enabled", type: "boolean", title: "Enabled" },
        { name: "text", type: "string", title: "Text" },
        { name: "url", type: "url", title: "Optional URL" },
        {
          name: "tone",
          title: "Tone",
          type: "string",
          options: {
            list: [
              { title: "Info", value: "info" },
              { title: "Success", value: "success" },
              { title: "Warning", value: "warning" },
            ],
          },
        },
      ],
    },
  ],
};
