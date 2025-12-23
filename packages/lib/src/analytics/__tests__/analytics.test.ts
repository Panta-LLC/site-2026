import { initMixpanel, identify, trackEvent, pageview } from "../AnalyticsProvider";

jest.mock("mixpanel-browser", () => ({
  init: jest.fn(),
  identify: jest.fn(),
  people: { set: jest.fn() },
  track: jest.fn(),
}));

const mixpanel = require("mixpanel-browser");

describe("Analytics helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initMixpanel should call mixpanel.init when token provided", () => {
    initMixpanel("token-123");
    expect(mixpanel.init).toHaveBeenCalledWith("token-123", expect.any(Object));
  });

  it("identify should call identify and people.set when userId and traits provided", () => {
    identify("user_1", { email: "u@example.com" });
    expect(mixpanel.identify).toHaveBeenCalledWith("user_1");
    expect(mixpanel.people.set).toHaveBeenCalledWith({ email: "u@example.com" });
  });

  it("trackEvent should call mixpanel.track", () => {
    trackEvent("button_click", { label: "cta" });
    expect(mixpanel.track).toHaveBeenCalledWith("button_click", { label: "cta" });
  });

  it("pageview should call mixpanel.track with page_view", () => {
    pageview("/home");
    expect(mixpanel.track).toHaveBeenCalledWith("page_view", { path: "/home" });
  });
});
