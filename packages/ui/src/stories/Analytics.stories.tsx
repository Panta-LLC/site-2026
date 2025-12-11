import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { trackEvent } from "@panta/lib";

const meta: Meta = {
  title: "Analytics/TrackEvent",
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <div style={{ padding: 20 }}>
      <button
        onClick={() => {
          // This will call the shared trackEvent helper. In Storybook you can mock mixpanel-browser.
          trackEvent("storybook_click", { source: "storybook" });
          // show a transient UI confirmation
          // eslint-disable-next-line no-alert
          alert("trackEvent called: storybook_click");
        }}
      >
        Send trackEvent
      </button>
    </div>
  ),
};
