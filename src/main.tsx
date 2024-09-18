import { Layout } from '@/Layout/Layout';
import { Router } from '@/router/router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <Router />
    </Layout>
  </StrictMode>,
);
