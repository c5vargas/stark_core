import { Suspense, useEffect } from "react";
import { RouterProvider, useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { AlertProvider } from "@/contexts/shared/contexts/AlertContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "@/router/router";
import Loading from "@/contexts/shared/components/Loading";

const queryClient = new QueryClient();

const App = () => {
  const { i18n } = useTranslation();
	const { lang } = useParams();

  useEffect(() => {
		if (lang && i18n.resolvedLanguage !== lang) {
			const fallbackLng = 'en'
			
			if (fallbackLng === lang) {
				i18n.changeLanguage(lang);
			}
		}
	}, [lang]);

  return (
    <Suspense fallback={<LoadingContainer />}>
      <QueryClientProvider client={queryClient}>
        <AlertProvider>
          <main className="block relative">
            <RouterProvider router={Router} />
          </main>
        </AlertProvider>
      </QueryClientProvider>
    </Suspense>
  );
}

const LoadingContainer = () => (
  <div className="w-dvh h-dvh flex items-center justify-center">
    <Loading />
  </div>
)

export default App;
