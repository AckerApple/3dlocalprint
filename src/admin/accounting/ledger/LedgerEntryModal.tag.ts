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
  onSyncSaveState: (showErrors?: boolean) => void;
};

const creditOnlyCategories = new Set([
  "Sales Revenue",
  "Owner Contribution",
  "Shipping Income",
  "Bank Bonus Income",
  "Sales Tax Collected",
]);

const debitOnlyCategories = new Set([
  "Filament",
  "Printer Parts",
  "Tools",
  "Packaging",
  "Shipping Expense",
  "Marketing",
  "Software",
  "Event Fees",
]);

const isCategoryAllowedForAmountType = (
  category: string,
  amountType: LedgerDraft["amountType"]
) => {
  const value = String(category || "").trim();
  if (!value || value === "Other") return true;
  if (creditOnlyCategories.has(value)) return amountType === "credit";
  if (debitOnlyCategories.has(value)) return amountType === "debit";
  return true;
};

const renderFieldError = (
  submitted: boolean,
  errors: LedgerValidationErrors,
  field: keyof LedgerValidationErrors
) =>
  p
    .class`ledger-field-error`
    .attr("data-ledger-error", field)(
    submitted && errors[field] ? errors[field] : ""
  );

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

  const toForcedNegativeDecimal = (value: string) => {
    const raw = String(value ?? "").trim();
    if (!raw) return "";

    const cleaned = raw.replace(/[^\d.-]/g, "");
    if (!cleaned) return "";

    if (cleaned === "-" || cleaned === "-.") return "-";

    const unsigned = cleaned.replace(/-/g, "");
    if (!unsigned) return "-";

    const hasTrailingDot = unsigned.endsWith(".");
    const [wholePart = "", ...rest] = unsigned.split(".");
    const fractionDigits = rest.join("").replace(/\./g, "").slice(0, 2);
    const normalizedWhole = wholePart.replace(/^0+(?=\d)/, "") || "0";
    const fractionPart = hasTrailingDot && !fractionDigits
      ? "."
      : (fractionDigits ? `.${fractionDigits}` : "");

    return `-${normalizedWhole}${fractionPart}`;
  };

  const toForcedAmountSign = (
    value: string,
    amountType: LedgerDraft["amountType"]
  ) => {
    const raw = String(value ?? "").trim();
    if (!raw) return "";

    const unsigned = raw.replace(/-/g, "");
    if (!unsigned) return amountType === "debit" ? "-" : "";

    return amountType === "debit" ? `-${unsigned}` : unsigned;
  };

  const syncAmountInput = (value: string) => {
    const nextType = String(value ?? "").includes("-") ? "debit" : draft.amountType;
    draft.amountType = nextType;
    draft.amount = toForcedAmountSign(value, nextType);
    if (!isCategoryAllowedForAmountType(draft.billingCategory, nextType)) {
      draft.billingCategory = "";
    }
    if (nextType === "debit") {
      draft.salesTaxLiability = "";
      draft.processingFees = "";
    }
    onSyncSaveState();
  };

  const syncAmountType = (value: string) => {
    draft.amountType = value === "debit" ? "debit" : "credit";
    draft.amount = toForcedAmountSign(draft.amount, draft.amountType);
    if (!isCategoryAllowedForAmountType(draft.billingCategory, draft.amountType)) {
      draft.billingCategory = "";
    }
    if (draft.amountType === "debit") {
      draft.salesTaxLiability = "";
      draft.processingFees = "";
    }
    onSyncSaveState();
  };

  const renderAmountTypeField = () =>
    label(
      "Type",
      select
        .class`ledger-direction-select`
        .value(() => draft.amountType)
        .onChange((event) => {
          syncAmountType(event.target.value);
        })(
        option.value`credit`("Credit"),
        option.value`debit`("Debit")
      )
    );

  const renderAmountField = (
    errors: LedgerValidationErrors,
    hasFieldError: (field: keyof LedgerValidationErrors) => boolean
  ) =>
    label(
      "Amount",
      input
        .class(_=> hasFieldError("amount") ? "ledger-input-invalid" : "")
        .attr("data-ledger-field", "amount")
        .type`text`
        .inputMode`decimal`
        .placeholder(_=> draft.amountType === "debit" ? "-0.00" : "0.00")
        .value(() => draft.amount)
        .onInput((event) => {
          syncAmountInput(event.target.value);
        }),
      renderFieldError(submitted, errors, "amount")
    );

  const renderModalBody = () => {
    const errors = validateDraft(draft);
    const isValid = Object.keys(errors).length === 0;
    const categoryOptions = getAllCategoryOptions(entries);
    const visibleCategoryOptions = categoryOptions.filter((category) =>
      isCategoryAllowedForAmountType(category, draft.amountType)
    );
    const isSalesRevenueCategory = () =>
      draft.amountType === "credit"
      && String(draft.billingCategory || "").trim().toLowerCase() === "sales revenue";
    const shouldShowCustomCategoryInput = () => {
      const current = String(draft.billingCategory || "").trim();
      return draft.billingCategory === "Other" || !visibleCategoryOptions.includes(current);
    };
    const hasMoneyAccountError = () =>
      submitted && !String(draft.moneyAccountTitle || "").trim();
    const hasFieldError = (field: keyof LedgerValidationErrors) =>
      submitted && !!errors[field];

    return [
      div.class`ledger-form-grid`(
        label(
          "Title",
          input
            .class(_=> hasFieldError("title") ? "ledger-input-invalid" : "")
            .attr("data-ledger-field", "title")
            .type`text`
            .placeholder`Entry title`
            .value(() => draft.title)
            .onInput((event) => {
              draft.title = event.target.value;
              onSyncSaveState();
            }),
          renderFieldError(submitted, errors, "title")
        ),
        _=> isSalesRevenueCategory()
          ? div.class`ledger-amount-group`(
              p.class`ledger-amount-group-title`("Amounts"),
              div.class`ledger-amount-grid`(
                renderAmountTypeField(),
                renderAmountField(errors, hasFieldError),
                label(
                  "Liability / Sales Tax",
                  input
                    .class(_=> hasFieldError("salesTaxLiability") ? "ledger-input-invalid" : "")
                    .attr("data-ledger-field", "salesTaxLiability")
                    .type`text`
                    .inputMode`decimal`
                    .placeholder`-0.00`
                    .value(() => draft.salesTaxLiability)
                    .onInput((event) => {
                      draft.salesTaxLiability = toForcedNegativeDecimal(event.target.value);
                      onSyncSaveState();
                    }),
                  renderFieldError(submitted, errors, "salesTaxLiability")
                ),
                label(
                  "Processing Fees",
                  input
                    .class(_=> hasFieldError("processingFees") ? "ledger-input-invalid" : "")
                    .attr("data-ledger-field", "processingFees")
                    .type`text`
                    .inputMode`decimal`
                    .placeholder`-0.00`
                    .value(() => draft.processingFees)
                    .onInput((event) => {
                      draft.processingFees = toForcedNegativeDecimal(event.target.value);
                      onSyncSaveState();
                    }),
                  renderFieldError(submitted, errors, "processingFees")
                ),
              )
            )
          : div.class`ledger-amount-row`(
              renderAmountTypeField(),
              renderAmountField(errors, hasFieldError)
            ),
        label(
          "Money Account",
          select
            .class(_=> `ledger-money-account-select${hasMoneyAccountError() ? " ledger-input-invalid" : ""}`)
            .attr("data-ledger-field", "moneyAccountTitle")
            .required`true`
            .attr("aria-invalid", _=> (hasMoneyAccountError() ? "true" : "false"))
            .value(() => draft.moneyAccountTitle)
            .onChange((event) => {
              draft.moneyAccountTitle = event.target.value;
              onSyncSaveState();
            })(
            option.value``("Select account"),
            moneyAccountTitles.map((title) => option.value(title)(title))
          ),
          _=> !moneyAccountTitles.length
            ? p.class`ledger-field-error`("No money accounts yet. Add one in Money Accounts first.")
            : null,
          renderFieldError(submitted, errors, "moneyAccountTitle")
        ),
        label(
          "Created On",
          input
            .class(_=> hasFieldError("applicableDate") ? "ledger-input-invalid" : "")
            .attr("data-ledger-field", "applicableDate")
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
              .class(_=> hasFieldError("billingCategory") ? "ledger-input-invalid" : "")
              .attr("data-ledger-field", "billingCategory")
              .value(() => draft.billingCategory)
              .onChange((event) => {
                const selected = event.target.value;
                if (selected === "Other") {
                  const current = String(draft.billingCategory || "").trim();
                  draft.billingCategory = visibleCategoryOptions.includes(current)
                    ? "Other"
                    : (current || "");
                } else {
                  draft.billingCategory = selected;
                }
                if (!isSalesRevenueCategory()) {
                  draft.salesTaxLiability = "";
                  draft.processingFees = "";
                }

                onSyncSaveState();
              })(
              visibleCategoryOptions.map((category) =>
                option.value(category)(category)
              )
            ),
            _=> shouldShowCustomCategoryInput()
              && input
                .class(_=> hasFieldError("billingCategory") ? "ledger-input-invalid" : "")
                .attr("data-ledger-field", "billingCategory")
                .type`text`
                .placeholder`Custom category`
                .value(_=> draft.billingCategory)
                .onInput((event) => {
                  const next = String(event.target.value || "").trim();
                  draft.billingCategory = next || "";
                  if (!isSalesRevenueCategory()) {
                    draft.salesTaxLiability = "";
                    draft.processingFees = "";
                  }
                  onSyncSaveState();
                })
          ),
          renderFieldError(submitted, errors, "billingCategory")
        ),
        label(
          "Status",
          select
            .class(_=> hasFieldError("status") ? "ledger-input-invalid" : "")
            .attr("data-ledger-field", "status")
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
        .disabled(() => isSaving || isDeleting)
        .onClick(() => onSave())(
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
