import { SearchPanel } from '../../features/search/SearchPanel';

export const HomePage = () => {
  return (
    <section>
      <h1>Find medicines near you</h1>
      <p>Search, compare, and order securely.</p>
      <SearchPanel />
    </section>
  );
};
