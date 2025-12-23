// Mock for Next.js navigation hooks for use in Storybook
export function usePathname() {
  return typeof window !== "undefined" ? window.location.pathname : "/";
}

export function useSearchParams() {
  if (typeof window === "undefined") {
    return null;
  }
  const search = window.location.search;
  return {
    toString: () => search.substring(1),
    get: (key: string) => {
      const params = new URLSearchParams(search);
      return params.get(key);
    },
  };
}

