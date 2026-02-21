import { Helmet } from '@packages/react-helmet-async';
import { LayoutProvider } from './components/context';
import { Main } from './components/main';

export function DefaultLayout() {
  return (
    <>
      <Helmet>
        <title>Metronic - Store Inventory</title>
      </Helmet>

      <LayoutProvider>
        <Main />
      </LayoutProvider>
    </>
  );
}
