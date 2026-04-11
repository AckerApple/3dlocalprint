import {
  tag,
  div,
  button,
  label,
  input,
  select,
  option,
  textarea,
  p,
  output,
} from "taggedjs";
import { Modal } from "../../shared/Modal.tag.js";
import type { LedgerEntry } from "../../../types/ledger.js";
import type {
  LedgerDraft,
  LedgerModalMode,
  LedgerValidationErrors,
} from "./types.js";

type LedgerEntryModalProps = {
  modalOpen?: boolean;
  modalMode?: LedgerModalMode;
  draft: LedgerDraft;
  entries?: LedgerEntry[];
  submitted?: boolean;
  isSaving?: boolean;
  isDeleting?: boolean;
  validateDraft: (source: LedgerDraft) => LedgerValidationErrors;
  getAllCategoryOptions: (entries: LedgerEntry[]) => string[];
  moneyAccountTitles?: string[];
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
  onSyncSaveState: () => void;
};

const renderFieldError = (
  submitted: boolean,
  errors: LedgerValidationErrors,
  field: keyof LedgerValidationErrors
) =>
  submitted && errors[field]
    ? p.class`ledger-field-error`(errors[field])
    : null;

export const LedgerEntryModal = tag(({
  modalOpen = false,
  modalMode = "create",
  draft,
  entries = [],
  submitted = false,
  isSaving = false,
  isDeleting = false,
  validateDraft,
  getAllCategoryOptions,
  moneyAccountTitles = [],
  onClose,
  onSave,
  onDelete,
  onSyncSaveState,
}: LedgerEntryModalProps) => {
  LedgerEntryModal.inputs((args) => {
    [{
      modalOpen = false,
      modalMode = "create",
      draft,
      entries = [],
      submitted = false,
      isSaving = false,
      isDeleting = false,
      validateDraft,
      getAllCategoryOptions,
      moneyAccountTitles = [],
      onClose,
      onSave,
      onDelete,
      onSyncSaveState,
    }] = args

    onClose = output(onClose);
    onSave = output(onSave);
    onDelete = output(onDelete);
    onSyncSaveState = output(onSyncSaveState);
  })

  const onModalKeyDown = (event: KeyboardEvent & { target?: EventTarget | null }) => {
    const targetTag = event.target instanceof HTMLElement ? event.target.tagName : "";
    if (event.key === "Enter" && targetTag !== "TEXTAREA") {
      event.preventDefault();
      if (!isSaving) {
        onSave();
      }
    }
  }

  const renderModalBody = () => {
    const errors = validateDraft(draft);
    const isValid = Object.keys(errors).length === 0;
    const categoryOptions = getAllCategoryOptions(entries);
    const shouldShowCustomCategoryInput = () => {
      const current = String(draft.billingCategory || "").trim();
      return draft.billingCategory === "Other" || !categoryOptions.includes(current);
    };
    const hasMoneyAccountError = () =>
      submitted && !String(draft.moneyAccountTitle || "").trim();

    return [
      div.class`ledger-form-grid`(
        label(
          "Title",
          input
            .type`text`
            .placeholder`Entry title`
            .value(() => draft.title)
            .onInput((event) => {
              draft.title = event.target.value;
              onSyncSaveState();
            }),
          renderFieldError(submitted, errors, "title")
        ),
        label(
          "Amount",
          input
            .type`text`
            .inputmode`decimal`
            .placeholder`0.00`
            .value(() => draft.amount)
            .onInput((event) => {
              draft.amount = event.target.value;
              onSyncSaveState();
            }),
          renderFieldError(submitted, errors, "amount")
        ),
        label(
          "Money Account",
          select
            .class(_=> `ledger-money-account-select${hasMoneyAccountError() ? " ledger-input-invalid" : ""}`)
            .required`true`
            .attr("aria-invalid", _=> (hasMoneyAccountError() ? "true" : "false"))
            .value(() => draft.moneyAccountTitle)
            .onChange((event) => {
              draft.moneyAccountTitle = event.target.value;
              onSyncSaveState();
            })(
            option.value``("Select account"),
            ...moneyAccountTitles.map((title) => option.value(title)(title))
          ),
          _=> !moneyAccountTitles.length
            ? p.class`ledger-field-error`("No money accounts yet. Add one in Money Accounts first.")
            : null,
          renderFieldError(submitted, errors, "moneyAccountTitle")
        ),
        label(
          "Applicable Date",
          input
            .type`date`
            .value(() => draft.applicableDate)
            .onChange((event) => {
              draft.applicableDate = event.target.value;
              onSyncSaveState();
            }),
          renderFieldError(submitted, errors, "applicableDate")
        ),
        label(
          "Billing Category",
          div.class`ledger-category-row`(
            select
              .value(() => draft.billingCategory)
              .onChange((event) => {
                const selected = event.target.value;
                if (selected === "Other") {
                  const current = String(draft.billingCategory || "").trim();
                  draft.billingCategory = categoryOptions.includes(current)
                    ? "Other"
                    : (current || "");
                } else {
                  draft.billingCategory = selected;
                }

                onSyncSaveState();
              })(
              ...categoryOptions.map((category) =>
                option.value(category)(category)
              )
            ),
            _=> shouldShowCustomCategoryInput()
              && input
                .type`text`
                .placeholder`Custom category`
                .value(_=> draft.billingCategory)
                .onInput((event) => {
                  const next = String(event.target.value || "").trim();
                  draft.billingCategory = next || "";
                  onSyncSaveState();
                })
          ),
          renderFieldError(submitted, errors, "billingCategory")
        ),
        label(
          "Status",
          select
            .value(() => draft.status)
            .onChange((event) => {
              draft.status = event.target.value as LedgerEntry["status"];
              onSyncSaveState();
            })(
            option
              .value`pending`
              .attr("title", "its not hit bank")(
              "⏳ Pending"
            ),
            option
              .value`posted`
              .attr("title", "its in the bank")(
              "🏦 Posted"
            ),
            option
              .value`reconciled`
              .attr("title", "its on quickbooks and bank")(
              "✅ Reconciled"
            )
          ),
          renderFieldError(submitted, errors, "status")
        ),
        label(
          "Notes (optional)",
          textarea
            .class`ledger-notes`
            .placeholder`Optional notes`
            .value(() => draft.notes)
            .onInput((event) => {
              draft.notes = event.target.value;
            })
        )
      ),
      div.class`ledger-modal-actions`(
        modalMode === "edit"
          ? button
              .type`button`
              .class`ghost-button delete-button`
              .disabled(() => isDeleting || isSaving)
              .onClick(onDelete)(
              isDeleting ? "Deleting..." : "Delete"
            )
          : null,
        button
          .type`button`
          .class`ghost-button`
          .disabled(() => isDeleting || isSaving)
          .onClick(onClose)(
          "Cancel"
        ),
        button
          .id`ledgerSaveButton`
          .type`button`
          .class`add-button`
          .disabled(() => !isValid || isSaving || isDeleting)
          .onClick(onSave)(
          isSaving ? "Saving..." : "Save"
        )
      )
    ];
  };

  return [
    _=> Modal({
      modalOpen,
      title: modalMode === "edit" ? "Edit Ledger Entry" : "Add Ledger Entry",
      draggableTitle: true,
      className: "ledger-modal",
      cardClassName: "ledger-modal-card",
      onClose,
      onKeyDown: onModalKeyDown,
      content: renderModalBody,
    })
  ];
})
