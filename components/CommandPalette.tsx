"use client";

import { navLinks, changelog as changelogData } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import {
  BookOpen,
  Brush,
  Code2,
  Compass,
  Home,
  Link2,
  Mail,
  Moon,
  Sparkles,
  Sun,
  X,
  File,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FILE } from "dns";

type Action = {
  id: string;
  label: string;
  description?: string;
  icon: ReactNode;
  shortcut?: string;
  group: string;
  keywords: string[];
  run: () => any | Promise<any>;
  closeOnRun?: boolean;
};

const ICON_CLASS = "w-4 h-4 text-neutral-500 dark:text-neutral-400";

const navIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case "home":
      return <Home className={ICON_CLASS} />;
    case "projects":
      return <Sparkles className={ICON_CLASS} />;
    case "journey":
      return <Compass className={ICON_CLASS} />;
    case "wiki":
      return <BookOpen className={ICON_CLASS} />;
    case "art":
      return <Brush className={ICON_CLASS} />;
    case "resume":
      return <File className={ICON_CLASS} />;
    default:
      return <Compass className={ICON_CLASS} />;
  }
};

const GROUP_PRIORITY: Record<string, number> = {
  General: 0,
  "Go to": 1,
};

export type CommandPaletteProps = {
  changelog?: {
    entries: string[];
    dateSections?: { date: string; items: string[] }[];
    showBanner?: boolean;
  };
};

export default function CommandPalette({
  changelog,
}: CommandPaletteProps = {}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [changelogOpen, setChangelogOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const announce = useCallback((message: string) => {
    setStatus(message);
  }, []);

  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(null), 2000);
    return () => clearTimeout(timer);
  }, [status]);

  const resolvedChangelog =
    changelog ??
    (Array.isArray(changelogData)
      ? {
          entries: changelogData.flatMap((section) => section.items),
          dateSections: changelogData,
        }
      : { entries: [], dateSections: [] });
  const changelogEntries = resolvedChangelog.entries ?? [];
  const changelogSections = (resolvedChangelog.dateSections ?? []).filter(
    (section) => Array.isArray(section.items) && section.items.length > 0,
  );
  const hasChangelog = true;

  const actions = useMemo<Action[]>(() => {
    const general: Action[] = [
      {
        id: "copy-link",
        label: "Copy link",
        description: "Copy the current page URL",
        icon: <Link2 className={ICON_CLASS} />,
        shortcut: "L",
        group: "General",
        keywords: ["copy", "share", "url", "link"],
        closeOnRun: false,
        run: async () => {
          try {
            await navigator.clipboard.writeText(window.location.href);
            announce("Link copied");
          } catch {
            announce("Clipboard unavailable");
          }
        },
      },
      {
        id: "visit-resume",
        label: "My Resume",
        description: "Check out my resume",
        icon: <Link2 className={ICON_CLASS} />,
        shortcut: "R",
        group: "General",
        keywords: ["resume", "portfolio"],
        closeOnRun: false,
        run: () =>
          window.open(
            "https://resume.bhavyadang.in/",
            "_blank",
            "noopener,noreferrer",
          ),
      },
      {
        id: "send-email",
        label: "Send email",
        description: "Send me a message.",
        icon: <Mail className={ICON_CLASS} />,
        shortcut: "E",
        group: "General",
        keywords: ["email", "contact", "hello", "message"],
        run: () => window.open("mailto:bhavya.dang1207@gmail.com", "_self"),
      },
      {
        id: "toggle-theme",
        label:
          theme === "light" ? "Switch to dark mode" : "Switch to light mode",
        description:
          theme === "light"
            ? "I know your eyes are hurting already."
            : "Why though?",
        icon:
          theme === "light" ? (
            <Moon className={ICON_CLASS} />
          ) : (
            <Sun className={ICON_CLASS} />
          ),
        shortcut: "T",
        group: "General",
        keywords: ["theme", "dark", "light", "toggle", "mode"],
        closeOnRun: false,
        run: () => {
          toggleTheme();
          announce(`Switched to ${theme === "light" ? "dark" : "light"} mode`);
        },
      },
      ...(hasChangelog
        ? [
            {
              id: "see-changelog",
              label: "See recent changelog",
              description: "View the latest updates",
              icon: <BookOpen className={ICON_CLASS} />,
              shortcut: "C",
              group: "General",
              keywords: ["changelog", "updates", "recent", "changes"],
              closeOnRun: false,
              run: () => setChangelogOpen(true),
            },
          ]
        : []),
      {
        id: "view-source",
        label: "View source",
        description: "View the source code of this website on GitHub",
        icon: <Code2 className={ICON_CLASS} />,
        shortcut: "S",
        group: "General",
        keywords: ["github", "code", "source", "repo"],
        run: () =>
          window.open(
            "https://github.com/bhavya-dang/my-website",
            "_blank",
            "noopener,noreferrer",
          ),
      },
    ];

    const goTo: Action[] = navLinks.map((link) => ({
      id: `nav-${link.label.toLowerCase()}`,
      label: link.label,
      description: link.href.startsWith("http")
        ? "Opens in a new tab"
        : `Navigate to ${link.label}`,
      icon: navIcon(link.label),
      shortcut: `G ${link.label.charAt(0).toUpperCase()}`,
      group: "Go to",
      keywords: ["navigate", "go", link.label.toLowerCase()],
      run: () => {
        if (link.href.startsWith("http")) {
          window.open(link.href, "_blank", "noopener,noreferrer");
          announce(`Opened ${link.label}`);
        } else {
          router.push(link.href);
          announce(`Navigated to ${link.label}`);
        }
      },
    }));

    return [...general, ...goTo];
  }, [announce, router, theme, toggleTheme, hasChangelog]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return actions;
    return actions.filter((action) =>
      [action.label, action.description ?? "", action.keywords.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [actions, query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const runAction = useCallback(
    (action: Action) => {
      const shouldClose = action.closeOnRun ?? true;
      try {
        const result = action.run();
        if (result instanceof Promise) {
          result.finally(() => shouldClose && setOpen(false));
        } else if (shouldClose) {
          setOpen(false);
        }
      } catch {
        announce("Unable to perform command");
      }
    },
    [announce],
  );

  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) =>
          filtered.length === 0 ? 0 : (prev + 1) % filtered.length,
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) =>
          filtered.length === 0
            ? 0
            : (prev - 1 + filtered.length) % filtered.length,
        );
      } else if (event.key === "Enter") {
        event.preventDefault();
        const target = filtered[activeIndex];
        if (target) runAction(target);
      } else if (event.key === "Escape") {
        event.preventDefault();
        if (changelogOpen) {
          setChangelogOpen(false);
        } else {
          setOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, activeIndex, runAction, changelogOpen]);

  useEffect(() => {
    if (!open && changelogOpen) {
      setChangelogOpen(false);
    }
  }, [open, changelogOpen]);

  useEffect(() => {
    if (!changelogOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setChangelogOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [changelogOpen]);

  const grouped = useMemo(() => {
    const map = new Map<string, Action[]>();
    filtered.forEach((action) => {
      const list = map.get(action.group) ?? [];
      list.push(action);
      map.set(action.group, list);
    });
    return Array.from(map.entries()).sort(
      (a, b) => GROUP_PRIORITY[a[0]] - GROUP_PRIORITY[b[0]],
    );
  }, [filtered]);

  const listContent =
    filtered.length === 0 ? (
      <div className="px-4 py-10 text-center text-sm text-neutral-500 dark:text-neutral-400">
        No commands found.
      </div>
    ) : (
      grouped.map(([group, list]) => (
        <div key={group}>
          <p className="px-4 pb-1 pt-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-neutral-400">
            {group}
          </p>
          <div className="px-2">
            {list.map((action) => {
              const index = filtered.indexOf(action);
              const active = index === activeIndex;
              return (
                <button
                  key={action.id}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => runAction(action)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                    active
                      ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white"
                      : "text-neutral-600 hover:bg-neutral-100/60 dark:text-neutral-300 dark:hover:bg-neutral-800/60"
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
                    {action.icon}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{action.label}</p>
                    {action.description && (
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {action.description}
                      </p>
                    )}
                  </div>
                  {action.shortcut && (
                    <kbd className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-[0.65rem] font-semibold text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
                      {action.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))
    );

  return (
    <>
      <button
        type="button"
        className="hidden px-4 py-1 rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 text-xs md:text-base md:flex"
        onClick={() => setOpen(true)}
      >
        ⌘&nbsp;·&nbsp;K
      </button>

      {mounted && open
        ? createPortal(
            <div className="fixed inset-0 z-[999] flex items-start justify-center pt-24">
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setOpen(false)}
                aria-hidden="true"
              />
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Command palette"
                className="relative w-[min(92vw,620px)] overflow-hidden rounded-2xl border border-neutral-200 bg-white text-neutral-900 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
              >
                <div className="flex items-center gap-2 border-b border-neutral-100 bg-white/80 px-4 py-3 text-sm dark:border-neutral-800 dark:bg-neutral-950/60">
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Type a command or search…"
                    className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-white dark:placeholder:text-neutral-500"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <kbd className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-[0.65rem] font-semibold text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
                    esc
                  </kbd>
                </div>

                <div className="max-h-[60vh] overflow-y-auto px-2 py-2">
                  {listContent}
                </div>

                <div className="border-t border-neutral-100 px-4 py-3 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                  <p>Use ↑ ↓ to navigate, Enter to run, Esc to close.</p>
                  <p>
                    Shortcut:{" "}
                    <span className="font-semibold text-neutral-700 dark:text-neutral-200">
                      ⌘ K
                    </span>{" "}
                    /{" "}
                    <span className="font-semibold text-neutral-700 dark:text-neutral-200">
                      Ctrl K
                    </span>
                  </p>
                  <div
                    aria-live="polite"
                    className="mt-2 min-h-[1.25rem] text-sm text-violet-600 dark:text-violet-300"
                  >
                    {status ?? "\u00A0"}
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}

      {mounted && changelogOpen && hasChangelog
        ? createPortal(
            <div className="fixed inset-0 z-[1100] flex items-center justify-center px-4">
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                aria-hidden="true"
                onClick={() => setChangelogOpen(false)}
              />
              <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-neutral-200 bg-white/90 p-6 shadow-2xl backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/90">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                      Changelog
                    </p>
                  </div>
                  <button
                    onClick={() => setChangelogOpen(false)}
                    aria-label="Close changelog"
                    className="rounded-full border border-neutral-200 bg-white p-2 text-neutral-600 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 max-h-[60vh] space-y-4 overflow-y-auto pr-1">
                  {(changelogSections.length > 0
                    ? changelogSections
                    : [{ date: "", items: changelogEntries }]
                  ).map((section, sectionIdx) => (
                    <div
                      key={`section-${section.date || sectionIdx}`}
                      className="space-y-2"
                    >
                      {section.date ? (
                        <p className="text-sm font-mono font-semibold text-neutral-700 dark:text-neutral-200">
                          {section.date}
                        </p>
                      ) : null}
                      <div className="space-y-2 border-l border-neutral-200 pl-3 dark:border-neutral-800">
                        {section.items.map((entry, idx) => (
                          <div
                            key={`${entry}-${idx}`}
                            className="rounded-lg border border-neutral-100 bg-neutral-50 px-3 py-2 text-sm text-neutral-800 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                          >
                            {entry}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
