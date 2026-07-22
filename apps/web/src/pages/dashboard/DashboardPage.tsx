import { tokens, cardStyle } from '../../shared/styles';

export const DashboardPage = () => {
  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <section style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)', color: '#fff', borderRadius: 24, padding: 24 }}>
        <p style={{ margin: 0, opacity: 0.9 }}>Good morning</p>
        <h2 style={{ margin: '6px 0 0', fontSize: 28 }}>Welcome back, Amina</h2>
      </section>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <Card title="Active orders" value="3" />
        <Card title="Prescription review" value="1" />
        <Card title="Saved pharmacies" value="5" />
      </div>

      <section style={{ ...cardStyle }}>
        <h3 style={{ marginTop: 0 }}>Recent activity</h3>
        <ul style={{ margin: 0, paddingLeft: 18, color: tokens.colors.textMuted }}>
          <li>Paracetamol order confirmed</li>
          <li>Prescription uploaded for review</li>
          <li>Delivery rider assigned</li>
        </ul>
      </section>
    </div>
  );
};

const Card = ({ title, value }: { title: string; value: string }) => (
  <div style={{ ...cardStyle }}>
    <p style={{ margin: 0, color: tokens.colors.textMuted }}>{title}</p>
    <h3 style={{ margin: '6px 0 0', fontSize: 24 }}>{value}</h3>
  </div>
);
