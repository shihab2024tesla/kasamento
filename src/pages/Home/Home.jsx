import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { ProductCard } from "../../components/Card";
import { EventDetailsModal } from "../../components/EventDetails";
import { BagIcon, MoonIcon, SunIcon } from "../../components/icons";
import { Navbar } from "../../components/Navbar";
import { Reveal } from "../../components/Reveal";
import { useAuth } from "../../hooks/useAuth";
import { useBag } from "../../hooks/useBag";
import { useTheme } from "../../hooks/useTheme";
import { useToast } from "../../hooks/useToast";
import { formatINR } from "../../utils/currency";
import styles from "./Home.module.css";

const BRIDE_HERO = [
  {
    id: "ivory-lace-ballgown",
    category: "Bridal",
    religion: "Christian",
    name: "Ivory Lace Ball Gown",
    priceValue: 7499,
    image: "/Bride/bridal-ivory-lace-ballgown-model.png",
    imageAlt: "Bride wearing an ivory lace ball gown with a cathedral veil",
  },
  {
    id: "maroon-embroidered-lehenga",
    category: "Bridal · Lehenga",
    religion: "Hindu",
    name: "Maroon Embroidered Lehenga",
    priceValue: 8999,
    image: "/Bride/bridal-maroon-embroidered-lehenga.png",
    imageAlt: "Deep maroon zardozi-embroidered bridal lehenga on display",
  },
];

const BRIDE_COLLECTION = [
  ...BRIDE_HERO,
  {
    id: "blush-anarkali-gown",
    category: "Bridal",
    religion: "Muslim",
    name: "Blush Embellished Anarkali Gown",
    priceValue: 6299,
    image: "/Bride/bridal-blush-anarkali-gown.png",
    imageAlt: "Blush pink hand-embellished Anarkali bridal gown",
  },
  {
    id: "hijab-ivory-gown",
    category: "Bridal · Modest",
    religion: "Muslim",
    name: "Ivory & Gold Hijab Gown",
    priceValue: 6799,
    image: "/Bride/bridal-hijab-ivory-gown.png",
    imageAlt: "Bride in an ivory and gold embellished gown with hijab",
  },
  {
    id: "cream-maroon-kerala-lehenga",
    category: "Bridal · Kasavu",
    religion: "Hindu",
    name: "Cream & Maroon Kerala Lehenga",
    priceValue: 7999,
    image: "/Bride/bridal-cream-maroon-lehenga.png",
    imageAlt: "Bride in a cream and maroon Kerala-style bridal lehenga",
  },
  {
    id: "classic-ivory-lace-gown",
    category: "Bridal",
    religion: "Christian",
    name: "Classic Ivory Lace Gown",
    priceValue: 6999,
    image: "/Bride/bridal-ivory-lace-ballgown-mannequin.png",
    imageAlt: "Ivory lace ball gown displayed on a mannequin",
  },
];

const GROOM_COLLECTION = [
  {
    id: "black-sherwani-turban",
    category: "Groom · Sherwani",
    religion: "Muslim",
    name: "Black Embroidered Sherwani",
    priceValue: 5999,
    image: "/Groom/groom-black-sherwani-turban.png",
    imageAlt: "Groom in a black gold-embroidered sherwani with turban",
  },
  {
    id: "ivory-sherwani-turban-1",
    category: "Groom · Sherwani",
    religion: "Muslim",
    name: "Ivory Embroidered Sherwani",
    priceValue: 5499,
    image: "/Groom/groom-ivory-sherwani-turban-1.png",
    imageAlt: "Groom in an ivory embroidered sherwani with matching turban",
  },
  {
    id: "kerala-mundu-set-1",
    category: "Groom · Kerala Mundu",
    religion: "Hindu",
    name: "Cream & Gold Kerala Mundu Set",
    priceValue: 3999,
    image: "/Groom/groom-kerala-mundu-set-1.png",
    imageAlt: "Groom in a cream shirt and gold-bordered Kerala mundu",
  },
  {
    id: "beige-three-piece-suit",
    category: "Groom · Suit",
    religion: "Christian",
    name: "Beige Three-Piece Suit",
    priceValue: 4999,
    image: "/Groom/groom-beige-three-piece-suit.png",
    imageAlt: "Groom in a beige three-piece wedding suit with tie",
  },
  {
    id: "ivory-sherwani-turban-2",
    category: "Groom · Sherwani",
    religion: "Muslim",
    name: "Ivory Kurta Sherwani",
    priceValue: 5799,
    image: "/Groom/groom-ivory-sherwani-turban-2.png",
    imageAlt: "Groom in an ivory sherwani over a kurta with turban",
  },
  {
    id: "kerala-mundu-set-2",
    category: "Groom · Kerala Mundu",
    religion: "Hindu",
    name: "Classic Kerala Mundu Set",
    priceValue: 4199,
    image: "/Groom/groom-kerala-mundu-set-2.png",
    imageAlt: "Groom in a classic cream and gold Kerala mundu set",
  },
  {
    id: "maroon-three-piece-suit",
    category: "Groom · Suit",
    religion: "Christian",
    name: "Maroon Three-Piece Suit",
    priceValue: 5299,
    image: "/Groom/groom-maroon-three-piece-suit.png",
    imageAlt: "Groom in a maroon three-piece suit with bow tie",
  },
];

const RELIGION_OPTIONS = ["All", "Christian", "Hindu", "Muslim"];

const PRICE_OPTIONS = [
  { value: "all", label: "Any price" },
  { value: "under5k", label: "Under ₹5,000" },
  { value: "5kto8k", label: "₹5,000 – ₹8,000" },
  { value: "above8k", label: "Above ₹8,000" },
];

function matchesPrice(priceValue, priceFilter) {
  if (priceFilter === "under5k") return priceValue < 5000;
  if (priceFilter === "5kto8k") return priceValue >= 5000 && priceValue <= 8000;
  if (priceFilter === "above8k") return priceValue > 8000;
  return true;
}

function filterItems(items, religionFilter, priceFilter) {
  return items.filter(
    (item) => (religionFilter === "All" || item.religion === religionFilter) && matchesPrice(item.priceValue, priceFilter)
  );
}

function CollectionSection({ id, eyebrow, title, items, onAddToBag, cardVariant = "zoom" }) {
  return (
    <section className={styles.curated} id={id}>
      <Reveal variant="up">
        <div className={styles.curatedEyebrow}>{eyebrow}</div>
        <h2 className={styles.curatedTitle}>{title}</h2>
      </Reveal>
      {items.length === 0 ? (
        <p className={styles.noResults}>No pieces match these filters. Try widening your search.</p>
      ) : (
        <div className={styles.curatedGrid}>
          {items.map((item, index) => (
            <Reveal key={item.id} variant={cardVariant} delay={(index % 4) * 90}>
              <ProductCard
                category={item.category}
                name={item.name}
                price={formatINR(item.priceValue)}
                image={item.image}
                imageAlt={item.imageAlt}
                onAddToBag={() => onAddToBag(item)}
              />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}

function FilterBar({ religion, onReligionChange, price, onPriceChange }) {
  const hasActiveFilters = religion !== "All" || price !== "all";

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>Religion</span>
        <div className={styles.pillRow}>
          {RELIGION_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              className={[styles.pill, religion === option ? styles.pillActive : ""].filter(Boolean).join(" ")}
              onClick={() => onReligionChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel} htmlFor="price-filter">
          Price
        </label>
        <select
          id="price-filter"
          className={styles.select}
          value={price}
          onChange={(event) => onPriceChange(event.target.value)}
        >
          {PRICE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          className={styles.clearFilters}
          onClick={() => {
            onReligionChange("All");
            onPriceChange("all");
          }}
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

export function Home() {
  const { user, logout } = useAuth();
  const { totalCount, addItem, openBag } = useBag();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [religionFilter, setReligionFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("all");

  const filteredBride = filterItems(BRIDE_COLLECTION, religionFilter, priceFilter);
  const filteredGroom = filterItems(GROOM_COLLECTION, religionFilter, priceFilter);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logout();
      showToast("You've been signed out.", "success");
      navigate("/login", { replace: true });
    } finally {
      setLoggingOut(false);
    }
  }

  function handleAddToBag(item) {
    addItem(item);
  }

  return (
    <div className="page-transition">
      <EventDetailsModal />
      <Navbar
        activeHref="#home"
        rightSlot={
          <>
            <span className={styles.greeting}>
              Welcome, <strong>{user?.name}</strong>
            </span>
            <button type="button" className={styles.bagButton} onClick={openBag} aria-label="Open bag">
              <BagIcon />
              {totalCount > 0 && <span className={styles.bagCount}>{totalCount}</span>}
            </button>
            <button
              type="button"
              className={styles.themeButton}
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <button type="button" className={styles.logoutButton} onClick={handleLogout} disabled={loggingOut}>
              {loggingOut ? "Signing out…" : "Logout"}
            </button>
          </>
        }
      />

      <main className={styles.hero} id="home">
        <section className={styles.heroCopy}>
          <div className={styles.eyebrow}>Bridal &amp; Groom Rental Boutique · Kerala</div>
          <h1 className={styles.title}>
            The art of the
            <br />
            <span className={styles.gold}>perfect</span> wedding look.
          </h1>
          <p className={styles.intro}>
            Wear a designer gown or bespoke Kerala silk on your wedding day — then return it. No storage fees, no
            regrets, no compromise on elegance.
          </p>
          <div className={styles.actions}>
            <Button variant="primary" as="a" href="#rentals">
              Explore Rentals
            </Button>
            <Button variant="secondary" as="a" href="#how">
              How It Works
            </Button>
          </div>
        </section>

        <section className={styles.collection}>
          {BRIDE_HERO.map((item, index) => (
            <Reveal key={item.id} variant="zoom" delay={index * 120}>
              <ProductCard
                category={item.category}
                name={item.name}
                price={formatINR(item.priceValue)}
                image={item.image}
                imageAlt={item.imageAlt}
                onAddToBag={() => handleAddToBag(item)}
              />
            </Reveal>
          ))}
        </section>
      </main>

      <Reveal variant="up">
        <FilterBar
          religion={religionFilter}
          onReligionChange={setReligionFilter}
          price={priceFilter}
          onPriceChange={setPriceFilter}
        />
      </Reveal>

      <CollectionSection
        id="rentals"
        eyebrow="The Bridal Collection"
        title="Curated for every ceremony"
        items={filteredBride}
        onAddToBag={handleAddToBag}
      />

      <CollectionSection
        id="groom"
        eyebrow="The Groom Collection"
        title="Sherwanis, mundus & suits"
        items={filteredGroom}
        onAddToBag={handleAddToBag}
        cardVariant="zoomOut"
      />
    </div>
  );
}
