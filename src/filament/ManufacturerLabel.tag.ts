import { tag, span, img, a } from "taggedjs";

type ManufacturerLabelProps = {
  label?: string;
  iconUrl?: string;
  showLabel?: boolean;
  linkIcon?: boolean;
  className?: string;
  iconClassName?: string;
  nameClassName?: string;
  linkClassName?: string;
};

export const ManufacturerLabel = tag(({
  label = "",
  iconUrl = "",
  showLabel = true,
  linkIcon = false,
  className = "",
  iconClassName = "",
  nameClassName = "",
  linkClassName = "",
}: ManufacturerLabelProps = {}) => {
  ManufacturerLabel.inputs((args) => {
    [{
      label = "",
      iconUrl = "",
      showLabel = true,
      linkIcon = false,
      className = "",
      iconClassName = "",
      nameClassName = "",
      linkClassName = "",
    } = {}] = args;
  });

  return span.class(_=> className || "")(
    _=> {
      const icon = iconUrl
        && img
            .class(_=> iconClassName)
            .src(iconUrl)
            .alt(`${label || "Manufacturer"} icon`)
            .attr("loading", "lazy")();

      const iconElement =  iconUrl && linkIcon
        ? a
            .class(_=> linkClassName)
            .href(iconUrl)
            .attr("target", "_blank")
            .attr("rel", "noopener noreferrer")
            .attr("title", "Open icon URL")(icon)
        : icon
      
      return iconElement
    },
    showLabel ? span.class(_=> nameClassName || "")(_=> label || "") : null
  );
});
