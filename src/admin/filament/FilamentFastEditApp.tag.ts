import {
  tag,
  div,
  h1,
  p,
  button,
  strong,
  span,
  header,
  section,
  a,
} from "taggedjs";
import { BarcodeScannerPanel } from "../shared/BarcodeScanner.tag.js";
import { extractBarcodeToken } from "../shared/barcode-utils.js";
import {
  loadFilamentTypes,
  updateFilamentInventory,
} from "../shared/firebase.js";
import { toast } from "../shared/toast.js";
import { describeFilamentType, getFilamentTypeMatchKeyForToken } from "./filament-match-utils.js";
import { slugifyLocation } from "./location-utils.js";

const BARCODE_FORMATS = [
  "code_128",
  "code_39",
  "code_93",
  "ean_13",
  "ean_8",
  "itf",
  "upc_a",
  "upc_e",
];

const scanCooldownMs = 1200;

const createTonePlayer = () => {
  let context = null;
  const play = (frequency, durationMs) => {
    try {
      if (!context) {
        context = new AudioContext();
      }
      if (context.state === "suspended") {
        context.resume().catch(() => {});
      }
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.value = 0.12;
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + durationMs / 1000);
    } catch (error) {
      console.warn("Audio tone failed", error);
    }
  };
  return {
    success: () => play(880, 120),
    fail: () => play(220, 180),
  };
};

const matchFilamentType = (types, token) => {
  const matchValue = token.toLowerCase();
  const orderedFields = [
    "barcode_search_data",
    "swatch_code",
    "number",
    "label",
    "color_name",
  ];
  for (const field of orderedFields) {
    const match = types.find((item) => {
      const value = item[field];
      if (Array.isArray(value)) {
        return value.some((entry) =>
          entry?.toString().toLowerCase().includes(matchValue)
        );
      }
      if (value === undefined || value === null || value === "") return false;
      return value.toString().toLowerCase().includes(matchValue);
    });
    if (match) {
      return {
        type: match,
        matchKey: getFilamentTypeMatchKeyForToken(match, token),
      };
    }
  }
  return null;
};

export const FilamentFastEditApp = tag((location, locationSlug) => {
  FilamentFastEditApp.updates((args) => {
    [location, locationSlug] = args;
  });

  const locationKey = slugifyLocation(location);
  const tone = createTonePlayer();
  let types = [];
  let hasLoaded = false;
  let isLoading = false;
  let loadError = "";
  let mode = "";
  let scanStatus = "Choose add or remove to start scanning.";
  let matches = [];
  let lastScan = { token: "", at: 0 };

  const fetchInventory = () => {
    if (!loadFilamentTypes || isLoading || hasLoaded) return;
    isLoading = true;
    return loadFilamentTypes()
      .then((typeItems) => {
        types = Array.isArray(typeItems) ? typeItems : [];
        loadError = "";
        hasLoaded = true;
      })
      .catch((error) => {
        console.error("Fast edit load failed", error);
        loadError = "Failed to load filament data.";
        types = [];
        hasLoaded = true;
      })
      .finally(() => {
        isLoading = false;
      });
  }

  const refreshInventory = tag.callback(() => {
    return fetchInventory()
  })

  tag.promise = fetchInventory()

  const setMode = (nextMode) => {
    mode = nextMode;
    scanStatus = "Scanner active. Point at a barcode.";
  };

  const addMatch = (item, matchKey) => {
    if (!matchKey) return;
    const existing = matches.find((entry) => entry.key === matchKey);
    if (existing) {
      existing.count += 1;
    } else {
      matches.push({
        key: matchKey,
        item,
        count: 1,
      });
    }
  };

  const handleScan = (rawText) => {
    const token = extractBarcodeToken(rawText || "") || rawText || "";
    const normalized = token.trim();
    if (!normalized) {
      scanStatus = "No barcode data received.";
      tone.fail();
      return;
    }
    const now = Date.now();
    if (normalized === lastScan.token && now - lastScan.at < scanCooldownMs) {
      return;
    }
    lastScan = { token: normalized, at: now };

    const match = matchFilamentType(types, normalized);
    if (match?.type && match?.matchKey) {
      addMatch(match.type, match.matchKey);
      scanStatus = `Matched ${match.type.label || match.type.color_name || "filament"}.`;
      tone.success();
    } else {
      scanStatus = `No match for ${normalized}.`;
      tone.fail();
    }
  };

  const updateCount = (key, delta) => {
    const entry = matches.find((row) => row.key === key);
    if (!entry) return;
    const next = entry.count + delta;
    if (next <= 0) {
      matches = matches.filter((row) => row.key !== key);
      return;
    }
    entry.count = next;
  };

  const removeEntry = (key) => {
    matches = matches.filter((row) => row.key !== key);
  };

  const applyInventory = async () => {
    if (!mode || !matches.length) return;
    const adjustments = matches.reduce((acc, entry) => {
      const delta = mode === "add" ? entry.count : -entry.count;
      acc[entry.key] = (acc[entry.key] || 0) + delta;
      return acc;
    }, {});
    try {
      await updateFilamentInventory({ location, adjustments });
      toast.success(
        mode === "add" ? "Inventory added." : "Inventory removed."
      );
      matches = [];
      mode = "";
      scanStatus = "Choose add or remove to start scanning.";
      lastScan = { token: "", at: 0 };
      hasLoaded = false;
      refreshInventory();
    } catch (error) {
      console.error("Fast edit update failed", error);
      toast.error("Update failed. Try again.");
    }
  };

  const getActionLabel = _=>
    mode === "add" ? "ADD INVENTORY" : "REMOVE FROM INVENTORY";
  const modeLabel = () => {
    if (mode === "add") return "Add mode";
    if (mode === "remove") return "Remove mode";
    return "Mode";
  };

  const hasMatches = () => matches.length > 0;
  const canApply = () => Boolean(mode) && hasMatches();
  const disabledActionLabel = () => {
    if (!mode) return "SELECT MODE TO CONTINUE";
    return mode === "add" ? "SCAN TO ADD INVENTORY" : "SCAN TO REMOVE INVENTORY";
  };

  return div.class`fast-edit-page`(
    header.class`fast-edit-header`(
      a.class`ghost-button fast-edit-back`.href`./index.html`(
        "← BACK"
      ),
      div(
        h1("Fast Edit"),
        p(
          `Location: ${location || locationSlug || "Unknown"}`
        )
      )
    ),
    section.class`panel fast-edit-panel`(
      div.class`fast-edit-mode`(
        span.class`fast-edit-label`(_=> modeLabel()),
        div.class`fast-edit-actions`(
          button
            .type`button`
            .class(_=> `add-button ${mode === "add" ? "is-active" : ""}`)
            .onClick(() => setMode("add"))(
            "➕ Add"
          ),
          button
            .type`button`
            .class(_=> `add-button ${mode === "remove" ? "is-active" : ""}`)
            .onClick(() => setMode("remove"))(
            "➖ Remove"
          )
        )
      ),
      div.class`fast-edit-status`(_=> scanStatus),
      _=> (mode
        ? div.class`fast-edit-scanner`(
            BarcodeScannerPanel({
              onResult: handleScan,
              formats: BARCODE_FORMATS,
            })
          )
        : div.class`fast-edit-placeholder`(
            "Select a mode to enable barcode scanning."
          )),
      _=> loadError && div.class`fast-edit-error`(loadError),
      _=> hasMatches() &&
        div.class`fast-edit-list`(
          matches.map((entry) =>
            div.class`fast-edit-row`(
              div.class`fast-edit-row-info`(
                strong(describeFilamentType(entry.item)),
                span.class`fast-edit-row-meta`(
                  `#${entry.item.number || "-"} • ${entry.item.material_type || "Material"}`
                )
              ),
              div.class`fast-edit-row-count`(
                button
                  .type`button`
                  .class`spool-adjust-button`
                  .onClick(() => updateCount(entry.key, -1))(
                  "−"
                ),
                span.class`fast-edit-count`(_=> entry.count),
                button
                  .type`button`
                  .class`spool-adjust-button`
                  .onClick(() => updateCount(entry.key, 1))(
                  "+"
                )
              ),
              button
                .type`button`
                .class`ghost-button fast-edit-remove`
                .onClick(() => removeEntry(entry.key))(
                "Remove"
              )
            ).key(entry.key)
          )
        ),
      button
        .type`button`
        .class`add-button fast-edit-submit`
        .disabled(_=> !canApply())
        .onClick(applyInventory)(
        _=> (canApply() ? getActionLabel() : disabledActionLabel())
      )
    )
  );
});
