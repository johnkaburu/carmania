import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import { Inventory, Makes, BodyTypes, Vehicle } from "../../constants/inventory";
import CarCard from "../HomePage/CarCard";

export const PRICE_OPTIONS = [
  { label: "Any budget", value: 0 },
  { label: "Under KSh 3M", value: 3_000_000 },
  { label: "Under KSh 5M", value: 5_000_000 },
  { label: "Under KSh 10M", value: 10_000_000 },
  { label: "Under KSh 20M", value: 20_000_000 },
  { label: "Under KSh 50M", value: 50_000_000 },
];

const SORTS = {
  featured: { label: "Featured", fn: () => 0 },
  "price-asc": { label: "Price: low to high", fn: (a: Vehicle, b: Vehicle) => a.price - b.price },
  "price-desc": { label: "Price: high to low", fn: (a: Vehicle, b: Vehicle) => b.price - a.price },
  "year-desc": { label: "Newest first", fn: (a: Vehicle, b: Vehicle) => b.year - a.year },
  "mileage-asc": { label: "Lowest mileage", fn: (a: Vehicle, b: Vehicle) => a.mileage - b.mileage },
} as const;
type SortKey = keyof typeof SORTS;

const PAGE_SIZE = 12;

const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

/** Filterable, sortable inventory grid. Filter state lives in the URL query string. */
const InventoryBrowser = () => {
  const router = useRouter();
  const q = str(router.query.q);
  const make = str(router.query.make);
  const body = str(router.query.body);
  const maxPrice = Number(str(router.query.max)) || 0;
  const sort: SortKey = str(router.query.sort) in SORTS ? (str(router.query.sort) as SortKey) : "featured";

  // The search box is typed into locally and pushed to the URL after a short pause.
  const [search, setSearch] = useState(q);
  useEffect(() => setSearch(q), [q]);

  const update = (patch: Record<string, string | number>) => {
    const next: Record<string, string> = {};
    const merged = { q, make, body, max: maxPrice || "", sort: sort === "featured" ? "" : sort, ...patch };
    Object.entries(merged).forEach(([k, v]) => {
      if (v) next[k] = String(v);
    });
    router.replace({ pathname: router.pathname, query: next }, undefined, { shallow: true, scroll: false });
  };

  useEffect(() => {
    if (search === q) return;
    const t = setTimeout(() => update({ q: search.trim() }), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const [visible, setVisible] = useState(PAGE_SIZE);
  useEffect(() => setVisible(PAGE_SIZE), [q, make, body, maxPrice, sort]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return Inventory.filter(
      (c) =>
        (!needle || `${c.year} ${c.make} ${c.model} ${c.color}`.toLowerCase().includes(needle)) &&
        (!maxPrice || c.price <= maxPrice) &&
        (!make || c.make === make) &&
        (!body || c.body === body)
    ).sort(SORTS[sort].fn);
  }, [q, maxPrice, make, body, sort]);

  const hasFilters = Boolean(q || maxPrice || make || body);
  const clearFilters = () => {
    setSearch("");
    router.replace({ pathname: router.pathname }, undefined, { shallow: true, scroll: false });
  };

  return (
    <>
      <div className="filters">
        <label className="filters__search">
          <FiSearch />
          <input
            type="search"
            placeholder="Search make, model, year or colour…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search inventory"
          />
        </label>
        <select className="field" value={make} onChange={(e) => update({ make: e.target.value })} aria-label="Make">
          <option value="">All makes</option>
          {Makes.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <select
          className="field"
          value={maxPrice}
          onChange={(e) => update({ max: Number(e.target.value) })}
          aria-label="Budget"
        >
          {PRICE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <select
          className="field"
          value={sort}
          onChange={(e) => update({ sort: e.target.value === "featured" ? "" : e.target.value })}
          aria-label="Sort by"
        >
          {(Object.keys(SORTS) as SortKey[]).map((k) => (
            <option key={k} value={k}>{SORTS[k].label}</option>
          ))}
        </select>
      </div>

      <div className="toolbar">
        <div className="toolbar__tabs" role="tablist" aria-label="Body type">
          {["", ...BodyTypes].map((b) => (
            <button
              key={b || "all"}
              role="tab"
              aria-selected={body === b}
              className={`tab ${body === b ? "tab--active" : ""}`}
              onClick={() => update({ body: b })}
            >
              {b || "All"}
            </button>
          ))}
        </div>
        <div className="toolbar__right">
          <span className="section__count">
            {filtered.length} {filtered.length === 1 ? "vehicle" : "vehicles"}
          </span>
          {hasFilters && (
            <button className="toolbar__clear" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filtered.length ? (
        <>
          <div className="car-grid">
            {filtered.slice(0, visible).map((car, i) => (
              <CarCard key={car.id} car={car} priority={i < 3} />
            ))}
          </div>
          {visible < filtered.length && (
            <div className="load-more">
              <p>Showing {visible} of {filtered.length}</p>
              <button className="btn-x btn-ghost-x" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                Load more
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="empty">
          <p>No cars match your search.</p>
          <button className="btn-x btn-ghost-x" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      )}
    </>
  );
};

export default InventoryBrowser;
