export default function DashboardSection({ metrics }) {
  return (
    <section className="section github-center">
      <div className="section-kicker">GitHub Command Center</div>
      <h2>Activity, repositories, and engineering signal as a dashboard.</h2>
      <div className="dashboard">
        {metrics.map(({ label, value }) => (
          <div className="metric" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
        <div
          className="heatmap"
          aria-label="Contribution heatmap mock visualization"
        >
          {Array.from({ length: 96 }, (_, index) => (
            <span key={index} style={{ opacity: 0.2 + (index % 7) / 8 }} />
          ))}
        </div>
      </div>
    </section>
  );
}
