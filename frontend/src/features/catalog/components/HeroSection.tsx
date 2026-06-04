import "./HeroSection.css";

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-section__content">
        <p className="hero-section__badge">Explore your options</p>

        <h1 className="hero-section__title">
          Passenger services,
          <span>simplified.</span>
        </h1>

        <p className="hero-section__subtitle">
          Browse meals, movies, newspapers and activities during your journey.
          <br />
          Enhance your travel experience with a single tap.
        </p>

        <label className="hero-search">
          <svg
            aria-hidden="true"
            className="hero-search__icon"
            fill="none"
            height="22"
            viewBox="0 0 24 24"
            width="22"
          >
            <path
              d="m21 21-4.35-4.35m1.1-5.15a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.7"
            />
          </svg>

          <input
            className="hero-search__input"
            placeholder="Search for 'documentary' or 'breakfast'..."
            type="search"
          />
        </label>
      </div>
    </section>
  );
}