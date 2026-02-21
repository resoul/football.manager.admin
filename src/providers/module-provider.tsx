import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ScreenLoader } from '@/components/screen-loader';

const AppModule = lazy(() => import('@/views'));

export function ModuleProvider() {
    return (
        <Routes>
            <Route
                path="/*"
                element={
                    <Suspense fallback={<ScreenLoader />}>
                        <AppModule />
                    </Suspense>
                }
            />
        </Routes>
    );
}
