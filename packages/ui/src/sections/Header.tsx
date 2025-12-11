import React from "react";

type MenuItem = { title?: string; url?: string; internal?: { current?: string } };
type FooterCategory = { title?: string; links?: { label?: string; url?: string }[] };
type Notification = { enabled?: boolean; text?: string; url?: string; tone?: string };

export function Header({
  title,
  logo,
  menu = [],
  notificationBar,
}: {
  title?: string;
  logo?: { asset?: { url?: string }; alt?: string };
  menu?: MenuItem[];
  notificationBar?: Notification;
}) {
  return (
    <header className="w-full fixed top-0 left-0 bg-transparent">
      {notificationBar?.enabled && (
        <div
          className={`w-full text-sm px-4 py-2 text-center ${
            notificationBar.tone === "warning"
              ? "bg-yellow-50 text-yellow-900"
              : notificationBar.tone === "success"
                ? "bg-green-50 text-green-900"
                : "bg-neutral-50 text-neutral-800"
          }`}
        >
          {notificationBar.url ? (
            <a href={notificationBar.url} className="underline">
              {notificationBar.text}
            </a>
          ) : (
            <span>{notificationBar.text}</span>
          )}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {logo?.asset?.url ? (
            <img
              src={logo.asset.url}
              alt={logo.alt || title || "Site logo"}
              width={150}
              className="rounded"
            />
          ) : (
            <div className="w-9 h-9 bg-neutral-200 dark:bg-neutral-700 rounded" />
          )}
        </div>

        <nav className="md:flex gap-6 bg-transparent text-white">
          {menu &&
            menu.map((m, i) => {
              const href = m.url || m.internal?.current || "#";
              return (
                <a key={i} href={href} className="text-sm hover:underline">
                  {m.title}
                </a>
              );
            })}
        </nav>
      </div>
    </header>
  );
}

export default Header;
