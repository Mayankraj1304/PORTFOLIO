import { Code2, Mail } from "lucide-react";

const formEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;
const fallbackEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim();

export default function ContactSection() {
  const handleSubmit = (event) => {
    // Let the form submit naturally to Formspree (no CORS issues)
    // If formEndpoint is set, the form action will handle it
    if (!formEndpoint && !fallbackEmail) {
      event.preventDefault();
      alert(
        "No contact endpoint configured. Add VITE_CONTACT_FORM_ENDPOINT or VITE_CONTACT_EMAIL.",
      );
    }
  };

  if (formEndpoint) {
    // Use Formspree's standard form submission (no CORS issues)
    return (
      <section id="contact" className="section contact">
        <div className="section-kicker">Mission Control</div>
        <h2>Open a channel.</h2>
        <form action={formEndpoint} method="POST" onSubmit={handleSubmit}>
          <input aria-label="Name" name="name" placeholder="Name" required />
          <input
            aria-label="Email"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <textarea
            aria-label="Message"
            name="message"
            placeholder="Mission brief"
            rows={4}
            required
          />
          <button type="submit" data-cursor>
            <Mail /> Launch Message
          </button>
        </form>
        <a
          href="https://github.com/Mayankraj1304"
          target="_blank"
          rel="noreferrer"
        >
          <Code2 /> GitHub signal
        </a>
      </section>
    );
  }

  if (fallbackEmail) {
    // Email fallback
    const mailtoLink = `mailto:${fallbackEmail}?subject=${encodeURIComponent(
      "Portfolio contact",
    )}`;

    return (
      <section id="contact" className="section contact">
        <div className="section-kicker">Mission Control</div>
        <h2>Open a channel.</h2>
        <div style={{ marginTop: "2rem", maxWidth: "720px" }}>
          <p style={{ color: "#b7c8df", marginBottom: "1rem" }}>
            Send me an email directly:
          </p>
          <a
            href={mailtoLink}
            className="contact-fallback-link"
            style={{
              display: "inline-flex",
              gap: "0.5rem",
              alignItems: "center",
              padding: "0.8rem 1rem",
              border: "1px solid #ffffff24",
              borderRadius: "999px",
              color: "#fff",
              textDecoration: "none",
              background: "linear-gradient(135deg, #66e3ff, #ff7ad9)",
            }}
          >
            <Mail /> Send Email
          </a>
        </div>
        <a
          href="https://github.com/Mayankraj1304"
          target="_blank"
          rel="noreferrer"
        >
          <Code2 /> GitHub signal
        </a>
      </section>
    );
  }

  // No endpoint configured
  return (
    <section id="contact" className="section contact">
      <div className="section-kicker">Mission Control</div>
      <h2>Open a channel.</h2>
      <p className="response info" style={{ marginTop: "2rem" }}>
        Configure <code>VITE_CONTACT_FORM_ENDPOINT</code> or{" "}
        <code>VITE_CONTACT_EMAIL</code> in a .env.local file.
      </p>
      <a
        href="https://github.com/Mayankraj1304"
        target="_blank"
        rel="noreferrer"
      >
        <Code2 /> GitHub signal
      </a>
    </section>
  );
}
