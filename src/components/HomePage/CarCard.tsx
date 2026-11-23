import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TbEngine, TbGasStation, TbManualGearbox, TbGauge } from "react-icons/tb";
import { FiArrowUpRight } from "react-icons/fi";
import type { Vehicle } from "../../constants/inventory";
import { formatEngine, formatKes, formatKm } from "../../lib/format";
import { unsplashLoader } from "../../lib/images";

const CarCard = ({ car, priority = false }: { car: Vehicle; priority?: boolean }) => {
  const title = `${car.make} ${car.model}`;

  return (
    <article className="car-card">
      <Link href={`/cars/${car.slug}`} className="car-card__link" aria-label={`View the ${car.year} ${title}`}>
        <div className="car-card__stage">
          <span className="car-card__badge">{car.body}</span>
          <Image
            src={car.image}
            loader={unsplashLoader}
            priority={priority}
            alt={`${car.year} ${title} in ${car.color}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="car-card__img"
          />
        </div>

        <div className="car-card__body">
          <div className="car-card__head">
            <div>
              <p className="car-card__year">{car.year} · {car.make}</p>
              <h3>{car.model}</h3>
            </div>
            <span className="car-card__arrow"><FiArrowUpRight /></span>
          </div>
          <p className="car-card__color">{car.color}</p>

          <ul className="car-card__specs">
            <li><TbGauge /> {formatKm(car.mileage)}</li>
            <li><TbEngine /> {formatEngine(car.engine)}</li>
            <li><TbManualGearbox /> {car.transmission}</li>
            <li><TbGasStation /> {car.fuel}</li>
          </ul>

          <div className="car-card__price">
            <span>Price</span>
            <strong>{formatKes(car.price)}</strong>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default CarCard;
