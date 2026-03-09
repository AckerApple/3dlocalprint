import { tag, div, span, button, strong, a, output } from "taggedjs";
import { describeFilamentType } from "./filament-match-utils.js";

const isValidHex = (value) =>
  /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);

const getDomainLabel = (url) => {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (error) {
    return url.replace(/^https?:\/\//, "").split("/")[0];
  }
};

export const inventorySummaryRow = tag(
  (item, type, index, toggleRowEdit, onSave) => {
    inventorySummaryRow.inputs((args) => {
      [item, type, index, toggleRowEdit, onSave] = args;
      toggleRowEdit = output(toggleRowEdit);
      onSave = output(onSave);
    });

    const adjustSpoolCount = (event, delta) => {
      const current = Number(item.spool_inventory);
      const nextValue = Math.max(
        0,
        (Number.isFinite(current) ? current : 0) + delta
      );
      item.spool_inventory = nextValue;
      if (event?.currentTarget) {
        const target = event.currentTarget;
        target.classList.add("is-clicked");
        window.setTimeout(() => target.classList.remove("is-clicked"), 220);
      }
      if (onSave) {
        const result = onSave();
        if (result && typeof result.then === "function") {
          result.catch(() => {});
        }
      }
    };

    return div.class`summary-row`(
      div.class`summary-swatch`(
        div
          .class`summary-chip`
          .style(_=> `background:${isValidHex(type?.hex) ? type.hex : ""};`)(),
        span.class`summary-swatch-name`(_=> type?.color_name || "Unnamed")
      ),
      div.class`summary-details`(
        div.class`summary-title-row`(
          strong(_=> type?.label),
          button
            .type`button`
            .class`summary-edit-button`
            .ariaLabel`Edit inventory entry`
            .onClick(() => {
              toggleRowEdit(index, item?.location ?? "");
            })("✏️")
        ),
        _=> {
          const parts = [];
          const description = describeFilamentType(type, {
            includeColor: false,
            includeManufacturer: false,
          });
          if (description) {
            parts.push(span.class`summary-meta-item`(description));
          }
          const materialDetails = [type?.material_type, type?.sub_material_type]
            .filter(Boolean)
            .join(" • ");
          if (materialDetails) {
            parts.push(span.class`summary-meta-item`(materialDetails));
          }
          parts.push(
            span.class`summary-meta-item summary-spool-meta`(
              span.class`summary-spool-label`("Spools:"),
              span.class`summary-spool-count`(_=> {
                const spoolValue = Number(item.spool_inventory);
                return Number.isFinite(spoolValue) ? spoolValue : 0;
              }),
              div.class`summary-spool-controls`(
                button
                  .type`button`
                  .class`spool-adjust-button`
                  .attr("aria-label", "Decrease spool count")
                  .onClick((event) => adjustSpoolCount(event, -1))(
                  "−"
                ),
                button
                  .type`button`
                  .class`spool-adjust-button`
                  .attr("aria-label", "Increase spool count")
                  .onClick((event) => adjustSpoolCount(event, 1))(
                  "+"
                )
              )
            )
          );
          if (type?.url) {
            const domainLabel = getDomainLabel(type.url);
            parts.push(
              span.class`summary-meta-item`(
                a
                  .href(type.url)
                  .attr("target", "_blank")
                  .attr("rel", "noopener noreferrer")(
                  domainLabel || type.url
                )
              )
            );
          }
          if (!parts.length) {
            return "";
          }
          return div.class`summary-meta`(...parts);
        }
      )
    );
  }
);
