import { useNavigate } from "react-router-dom";

const AboutPage = () => {

    let navigate = useNavigate()
    const stats = [
        { label: 'Products', value: '20K+', icon: '📦' },
        { label: 'Happy Customers', value: '50K+', icon: '👥' },
        { label: 'Avg. Rating', value: '4.9', icon: '⭐' },
        { label: 'On-time Delivery', value: '99%', icon: '🚚' },
    ];

    const values = [
        { title: 'Trust', desc: 'Every product is verified for quality and authenticity before listing.', icon: '🛡️' },
        { title: 'Speed', desc: 'We obsess over delivery times so your orders arrive when promised.', icon: '⚡' },
        { title: 'Community', desc: 'Built around real customer feedback, not just business metrics.', icon: '🤝' },
        { title: 'Quality', desc: 'We curate the best — no filler, no junk, just great products.', icon: '💎' },
    ];

    const team = [
        { name: 'Aryan Shah', role: 'Founder & CEO', initial: 'A', color: 'bg-[#CCFF00]' },
        { name: 'Priya Mehta', role: 'Head of Product', initial: 'P', color: 'bg-blue-500' },
        { name: 'Rohan Verma', role: 'Lead Engineer', initial: 'R', color: 'bg-purple-500' },
        { name: 'Sneha Kapoor', role: 'Design Director', initial: 'S', color: 'bg-red-500' },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#CCFF00] selection:text-black">
           
            <main className="max-w-6xl mx-auto px-6 pb-20">
                {/* Hero Section */}
                <header className="text-center py-16">
                    <div className="w-12 h-12 bg-[#CCFF00] text-black rounded-full flex items-center justify-center mx-auto mb-6 text-xl shadow-[0_0_20px_rgba(204,255,0,0.3)]">⚡</div>
                    <h1 className="text-5xl font-bold mb-4">About <span className="text-[#CCFF00]">SkyMart</span></h1>
                    <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
                        SkyMart is a next-generation e-commerce platform built to make online shopping fast, fair, and enjoyable — for everyone.
                    </p>
                </header>

                {/* Stats Grid */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-[#111] border border-zinc-800 rounded-2xl p-8 text-center hover:border-zinc-700 transition">
                            <div className="text-2xl mb-4 opacity-80">{stat.icon}</div>
                            <h2 className="text-3xl font-bold mb-1">{stat.value}</h2>
                            <p className="text-zinc-500 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </section>

                {/* Our Story */}
                <section className="mb-16">
                    <div className="bg-[#111] border border-zinc-800 rounded-3xl p-10">
                        <h3 className="text-2xl font-bold mb-6">Our Story</h3>
                        <div className="space-y-4 text-zinc-400 leading-relaxed max-w-4xl">
                            <p>SkyMart started in 2022 as a small side project — two engineers tired of bloated, slow e-commerce experiences. We asked ourselves: <span className="italic text-zinc-200">what if shopping online was actually enjoyable?</span></p>
                            <p>Three years later, SkyMart serves over 50,000 customers across the country. We stock electronics, fashion, jewelry, and everyday essentials — all at prices that don't require a second mortgage.</p>
                            <p>We're still the same team at heart: obsessed with speed, transparency, and making you feel good about every purchase you make here.</p>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="mb-16">
                    <h3 className="text-center text-3xl font-bold mb-10">What We Stand For</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {values.map((v, i) => (
                            <div key={i} className="bg-[#111] border border-zinc-800 rounded-2xl p-6 flex gap-6 items-start hover:bg-zinc-900/50 transition">
                                <div className="bg-zinc-800 p-3 rounded-xl text-xl border border-zinc-700">{v.icon}</div>
                                <div>
                                    <h4 className="text-lg font-bold mb-1">{v.title}</h4>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{v.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team Section */}
                <section className="mb-16">
                    <h3 className="text-center text-3xl font-bold mb-10">Meet the Team</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {team.map((m, i) => (
                            <div key={i} className="bg-[#111] border border-zinc-800 rounded-2xl p-8 text-center group hover:border-[#CCFF00]/50 transition">
                                <div className={`${m.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl`}>
                                    {m.initial}
                                </div>
                                <h4 className="font-bold mb-1">{m.name}</h4>
                                <p className="text-zinc-500 text-xs uppercase tracking-wider">{m.role}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-[#111] border border-zinc-800 rounded-3xl p-16 text-center">
                    <h3 className="text-3xl font-bold mb-4">Ready to shop?</h3>
                    <p className="text-zinc-400 mb-8">Explore thousands of products at unbeatable prices.</p>
                    <button className="bg-[#CCFF00] text-black font-bold py-3 px-8 rounded-xl hover:scale-105 active:scale-95 transition flex items-center gap-2 mx-auto" onClick={()=>navigate("/shop")}>
                        Browse Products <span className="text-lg">➔</span>
                    </button>
                </section>
            </main>

        </div>
        
    );
};

export default AboutPage;