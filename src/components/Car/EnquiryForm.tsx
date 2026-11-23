import React, { FormEvent, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

export interface EnquiryField {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "date" | "select" | "textarea";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  full?: boolean; // span both columns
  defaultValue?: string;
}

interface EnquiryFormProps {
  fields: EnquiryField[];
  submitLabel?: string;
  successTitle?: string;
  successText?: string;
}

/**
 * Generic lead form. There is no backend yet, so submissions are only acknowledged
 * on screen. Hook `onSubmit` up to an API route or email service to receive them.
 */
const EnquiryForm = ({
  fields,
  submitLabel = "Send enquiry",
  successTitle = "Thanks, we've got it!",
  successText = "A member of our sales team will get back to you within one working day.",
}: EnquiryFormProps) => {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: POST Object.fromEntries(new FormData(e.currentTarget)) to a backend.
    setSent(true);
  };

  if (sent) {
    return (
      <div className="form-success" role="status">
        <FiCheckCircle />
        <h3>{successTitle}</h3>
        <p>{successText}</p>
        <button type="button" className="btn-x btn-ghost-x" onClick={() => setSent(false)}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      {fields.map((f) => {
        const id = `f-${f.name}`;
        const common = {
          id,
          name: f.name,
          required: f.required,
          placeholder: f.placeholder,
          defaultValue: f.defaultValue,
        };
        return (
          <div key={f.name} className={`form__field ${f.full || f.type === "textarea" ? "form__field--full" : ""}`}>
            <label htmlFor={id}>
              {f.label}
              {f.required && <span aria-hidden> *</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea rows={4} {...common} />
            ) : f.type === "select" ? (
              <select {...common} defaultValue={f.defaultValue ?? ""}>
                <option value="" disabled>
                  Select…
                </option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input type={f.type ?? "text"} {...common} />
            )}
          </div>
        );
      })}
      <button type="submit" className="btn-x btn-primary-x form__submit">
        {submitLabel}
      </button>
    </form>
  );
};

export default EnquiryForm;
