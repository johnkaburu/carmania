import React, { useState } from "react";
import { formatKes, monthlyPayment } from "../../lib/format";

const TERMS = [12, 24, 36, 48, 60, 72];
export const DEFAULT_RATE = 13.5; // indicative annual rate, %

const FinanceCalculator = ({ price }: { price: number }) => {
  const [depositPct, setDepositPct] = useState(30);
  const [term, setTerm] = useState(48);
  const [rate, setRate] = useState(DEFAULT_RATE);

  const deposit = (price * depositPct) / 100;
  const loan = price - deposit;
  const monthly = monthlyPayment(loan, rate, term);
  const totalInterest = monthly * term - loan;

  return (
    <div className="calc">
      <div className="calc__result">
        <span>Estimated monthly</span>
        <strong>{formatKes(monthly)}</strong>
        <small>over {term} months at {rate}% p.a.</small>
      </div>

      <label className="calc__row">
        <span className="calc__label">
          Deposit <b>{depositPct}% · {formatKes(deposit)}</b>
        </span>
        <input
          type="range"
          min={10}
          max={70}
          step={5}
          value={depositPct}
          onChange={(e) => setDepositPct(Number(e.target.value))}
        />
      </label>

      <div className="calc__row">
        <span className="calc__label">Term</span>
        <div className="seg" role="radiogroup" aria-label="Loan term in months">
          {TERMS.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={term === t}
              className={term === t ? "is-active" : ""}
              onClick={() => setTerm(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <label className="calc__row">
        <span className="calc__label">
          Interest rate <b>{rate}%</b>
        </span>
        <input
          type="range"
          min={8}
          max={20}
          step={0.5}
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
        />
      </label>

      <dl className="calc__summary">
        <div><dt>Loan amount</dt><dd>{formatKes(loan)}</dd></div>
        <div><dt>Total interest</dt><dd>{formatKes(totalInterest)}</dd></div>
      </dl>
      <p className="calc__note">
        Indicative only. Final rates depend on lender approval and your credit profile.
      </p>
    </div>
  );
};

export default FinanceCalculator;
