/**
 * Local FAQ knowledge base for the site's chat assistant. No real backend —
 * getReply() simulates a network delay and matches the message against
 * keyword groups, same pattern as mockApi.js.
 */

const FAQS = [
  {
    keywords: ["what is kasamento", "about kasamento", "what is this site", "who are you"],
    answer:
      "Kasamento is a bridal and groom wear rental boutique serving Kerala. Browse the Bridal and Groom collections, add pieces to your bag, and rent instead of buying for your big day.",
  },
  {
    keywords: ["how does it work", "how it works", "how do i rent", "rental process", "how to rent", "how to book"],
    answer:
      "It's simple: browse the collection, add your favourite pieces to your bag, and check out. We get everything ready for your event date, and you return it afterwards — no storage, no regrets.",
  },
  {
    keywords: ["deliver", "delivery", "pickup", "area", "location", "kerala", "ship"],
    answer:
      "We serve customers across Kerala. Delivery and pickup details are confirmed at checkout based on your event date and location.",
  },
  {
    keywords: ["price", "cost", "how much", "rent for", "rental fee", "expensive"],
    answer:
      "Each piece shows its rental price on the product card. Add it to your bag to see the running total, including quantity, in the bag summary.",
  },
  {
    keywords: ["deposit", "security deposit", "refund"],
    answer:
      "A refundable security deposit may apply at checkout depending on the piece. It's returned in full once the outfit comes back in its original condition.",
  },
  {
    keywords: ["filter", "religion", "hindu", "christian", "muslim", "budget"],
    answer:
      "Yes — scroll to the Bridal or Groom Collection and use the Religion and Price filters above the grid to quickly find pieces that suit your ceremony and budget.",
  },
  {
    keywords: ["login", "log in", "sign in", "account", "password", "forgot"],
    answer:
      "Sign in with your username and password from the Login page. Forgotten your password? Use the \"Forgot password?\" link there.",
  },
  {
    keywords: ["bag", "cart", "remove item", "quantity", "checkout"],
    answer:
      "Tap the bag icon in the navigation to review your items — you can adjust quantities, remove pieces, and proceed to checkout from there.",
  },
  {
    keywords: ["groom", "sherwani", "mundu", "suit"],
    answer:
      "Our Groom Collection includes sherwanis, Kerala mundu sets, and tailored suits — tap \"Groom\" in the navigation to explore.",
  },
  {
    keywords: ["bride", "bridal", "gown", "lehenga", "saree", "hijab"],
    answer:
      "Our Bridal Collection features ball gowns, lehengas, sarees, and modest wear — tap \"Bridal\" in the navigation to explore.",
  },
  {
    keywords: ["cancel", "cancellation", "change date", "reschedule"],
    answer:
      "Need to change or cancel a booking? Reach out to our team as soon as possible at hello@kasamento.shop and we'll help sort it out.",
  },
  {
    keywords: ["size", "sizing", "fit", "measurement"],
    answer:
      "We stock a range of sizes, and our team confirms fit details with you after checkout. If you're unsure what size to choose, just ask us.",
  },
  {
    keywords: ["contact", "help", "support", "email", "phone", "talk to someone", "human"],
    answer: "Happy to help further — reach our team directly at hello@kasamento.shop and we'll get back to you shortly.",
  },
];

const DEFAULT_REPLY =
  "I don't have an answer for that just yet — for anything more specific, reach our team at hello@kasamento.shop.";

const GREETING = "Hi! I'm the Kasamento assistant. Ask me about rentals, pricing, delivery, or how to book your outfit.";

export const SUGGESTED_QUESTIONS = [
  "How does renting work?",
  "Do you deliver across Kerala?",
  "Is there a security deposit?",
  "How do I filter by religion?",
];

const randomDelay = (min = 450, max = 950) =>
  new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min));

export const faqService = {
  getGreeting() {
    return GREETING;
  },

  async getReply(message) {
    await randomDelay();
    const text = message.toLowerCase();
    const match = FAQS.find((faq) => faq.keywords.some((keyword) => text.includes(keyword)));
    return match ? match.answer : DEFAULT_REPLY;
  },
};
