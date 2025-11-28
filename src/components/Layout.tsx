import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-elastic-black text-zinc-100 selection:bg-elastic-accent selection:text-black flex flex-col font-sans relative overflow-hidden">
            {/* Content */}
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow pt-10">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};
