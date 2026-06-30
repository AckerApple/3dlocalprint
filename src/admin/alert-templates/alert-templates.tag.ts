import {
  tag,
  tagElement,
  section,
  div,
  table,
  thead,
  tbody,
  tr,
  th,
  td,
  span,
  p,
  h1,
  h2,
  h3,
  pre,
  button,
  subscribe,
} from "taggedjs";
import { Subject } from "taggedjs/js/subject/Subject.class.js";
import { AdminNav } from "../shared/AdminNav.tag.js";
import { toast } from "../shared/toast.js";
import { Modal } from "../shared/Modal.tag.js";
import { replaceMountRoot } from "../shared/ssoMount.js";
import { startAdminAppShell } from "../shared/adminAppShell.js";
import { alertTemplateCatalog } from "./alert-template-catalog.js";

let app = document.getElementById("alertTemplatesApp");
const appRoot = { current: app };
const templateModal$ = new Subject<number>(0, (subscription) => {
  subscription.next(0);
});
let appMounted = false;
let currentUser: any = null;
let handleSignOut = () => Promise.resolve();
let selectedTemplateId = "";

const formatJson = (value: unknown) => JSON.stringify(value, null, 2);
const getSelectedTemplate = () =>
  alertTemplateCatalog.find((template) => template.id === selectedTemplateId) || null;

const openTemplateModal = (templateId: string) => {
  selectedTemplateId = templateId;
  templateModal$.next((Number(templateModal$.value) || 0) + 1);
};

const closeTemplateModal = () => {
  selectedTemplateId = "";
  templateModal$.next((Number(templateModal$.value) || 0) + 1);
};

const TemplateSourceBlock = (title: string, value = "") =>
  div.class`alert-template-source-block`(
    h3(title),
    pre.class`alert-template-code`(value || "No source output.")
  );

const TemplateDetailContent = (template: NonNullable<ReturnType<typeof getSelectedTemplate>>) =>
  div.class`alert-template-detail`(
    div.class`alert-template-detail-header`(
      div(
        h2.class`orders-detail-section-title`(template.name),
        p.class`orders-meta`(`${template.sourceFunction} · ${template.audience}`)
      ),
      span.class(_=> `pill alert-template-audience alert-template-audience-${template.audience}`)(
        template.audience
      )
    ),
    p.class`alert-template-trigger`(template.trigger),
    div.class`alert-template-variable-list`(
      template.variables.map((variable) =>
        span.class`product-category-pill`(variable).key(`${template.id}-${variable}`)
      )
    ),
    TemplateSourceBlock("Subject", template.rendered.subject),
    TemplateSourceBlock("Text Body", template.rendered.text),
    TemplateSourceBlock("HTML Source", template.rendered.html),
    TemplateSourceBlock("Sample Input", formatJson(template.sampleInput))
  );

const TemplateDetailModal = () =>
  subscribe(templateModal$, () => {
    const template = getSelectedTemplate();
    return Modal({
      modalOpen: Boolean(template),
      title: template ? template.name : "Alert Template",
      className: "ledger-modal alert-template-modal",
      cardClassName: "ledger-modal-card alert-template-modal-card",
      bodyClassName: "alert-template-modal-body",
      onClose: closeTemplateModal,
      content: () => template ? TemplateDetailContent(template) : null,
    });
  });

const TemplateRow = (template: (typeof alertTemplateCatalog)[number]) =>
  tr.class`ledger-row`(
    td(span.class`ledger-title-cell`(template.name)),
    td(span.class(_=> `pill alert-template-audience alert-template-audience-${template.audience}`)(template.audience)),
    td(span.class`orders-meta`(template.sourceFunction)),
    td(
      div.class`ledger-actions`(
        button
          .type`button`
          .class`ghost-button alert-template-view-button`
          .onClick(() => openTemplateModal(template.id))(
            "View"
          )
      )
    )
  ).key(`row-${template.id}`);

const TemplateTable = () =>
  div.class`ledger-table-block`(
    div.class`ledger-table-wrap`(
      table.class`ledger-table alert-templates-table`(
        thead(
          tr(
            th("Template"),
            th("Audience"),
            th("Source"),
            th("Actions")
          )
        ),
        tbody(
          alertTemplateCatalog.map((template) => TemplateRow(template))
        )
      )
    ),
    p.class`ledger-table-hint`(`showing ${alertTemplateCatalog.length} static alert templates`)
  );

export const AlertTemplatesApp = tag(() => [
  AdminNav(handleSignOut, currentUser),
  section.class`panel ledger-panel alert-templates-panel`(
    div.class`ledger-header`(
      div.class`ledger-heading`(
        h1("Alert Templates"),
        p("Static catalog generated from local notification code. Templates are not editable from admin.")
      )
    ),
    TemplateTable(),
    TemplateDetailModal()
  ),
]);

const mountApp = () => {
  if (!appRoot.current || appMounted) {
    return;
  }
  const nextRoot = replaceMountRoot(appRoot);
  if (!nextRoot) return;
  nextRoot.replaceChildren();
  tagElement(AlertTemplatesApp, nextRoot);
  appMounted = true;
  app = appRoot.current;
};

const adminShell = startAdminAppShell({
  rootRef: appRoot,
  toast,
  setAppMounted: (value) => {
    appMounted = value;
  },
  setCurrentUser: (value) => {
    currentUser = value;
  },
  onAfterSsoMount: () => {
    app = appRoot.current;
  },
  onAuthorized: () => {
    mountApp();
  },
});

handleSignOut = adminShell.handleSignOut;
