import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import 'react-loading-skeleton/dist/skeleton.css';
import HomePage from './pages/home-page/home-page.tsx';
import ChatBotPage from './pages/chat-page/chat-page.tsx';
import ReviewPage from './pages/review-page/review-page.tsx';
import NotFoundPage from './pages/not-found-page/not-found-page.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: '/chat', element: <ChatBotPage /> },
        { path: '/reviews', element: <ReviewPage /> },
      ]

    },

  ]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
