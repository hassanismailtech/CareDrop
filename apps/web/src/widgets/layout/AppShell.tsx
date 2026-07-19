type AppShellProps = {
  children: React.ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', padding: 24 }}>
      <header style={{ marginBottom: 24 }}>
        <strong>CareDrop</strong>
      </header>
      <main>{children}</main>
    </div>
  );
};
