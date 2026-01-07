const Footer = () => {
  return (
    <footer style={{
        position: "sticky",
        bottom: 0,
        height: "60px",
        background: "var(--footer-bg)",
        color: "var(--text-primary)",
        borderTop: "1px solid var(--border-color)",
        padding: "15px",
        display: "flex",
        alignItems: "center",
        zIndex: 1000,
        flexShrink: 0,
        transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
      }}>
      Footer
    </footer>
  );
};

export default Footer;
