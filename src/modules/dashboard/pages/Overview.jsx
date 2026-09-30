function Overview() {
    return (
        <div className="space-y-8">
            {/* Header / Hero Banner with Primary Colors */}
            <div className="bg-primary text-primary-content rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors">
                <div>
                    <span className="badge badge-secondary font-semibold uppercase tracking-wider mb-2">
                        Theme Colors Configured
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold">
                        TeamFlow Overview
                    </h2>
                    <p className="text-primary-content/80 mt-1 max-w-xl text-sm sm:text-base">
                        Colors are seamlessly synchronized across light and dark modes for both standard Tailwind utility classes and DaisyUI components.
                    </p>
                </div>
            </div>

            {/* Section 1: Standard Utility Classes Swatch Grid */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-base-content">
                            Regular Tailwind CSS Utility Classes
                        </h3>
                        <p className="text-xs sm:text-sm text-base-content/70">
                            Using <code className="text-primary font-mono font-semibold">bg-primary</code>, <code className="text-secondary font-mono font-semibold">bg-secondary</code>, <code className="text-accent font-mono font-semibold">bg-accent</code>, <code className="text-base-content font-mono font-semibold">bg-base-100</code>, etc.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {/* Primary */}
                    <div className="bg-primary text-primary-content p-4 rounded-xl shadow-xs flex flex-col justify-between h-28 border border-primary/20 transition-colors">
                        <span className="text-xs font-bold uppercase tracking-wider">Primary</span>
                        <div className="text-xs opacity-80 font-mono">bg-primary</div>
                    </div>

                    {/* Secondary */}
                    <div className="bg-secondary text-secondary-content p-4 rounded-xl shadow-xs flex flex-col justify-between h-28 border border-secondary/20 transition-colors">
                        <span className="text-xs font-bold uppercase tracking-wider">Secondary</span>
                        <div className="text-xs opacity-80 font-mono">bg-secondary</div>
                    </div>

                    {/* Accent */}
                    <div className="bg-accent text-accent-content p-4 rounded-xl shadow-xs flex flex-col justify-between h-28 border border-accent/20 transition-colors">
                        <span className="text-xs font-bold uppercase tracking-wider">Accent</span>
                        <div className="text-xs opacity-80 font-mono">bg-accent</div>
                    </div>

                    {/* Neutral */}
                    <div className="bg-neutral text-neutral-content p-4 rounded-xl shadow-xs flex flex-col justify-between h-28 border border-neutral/20 transition-colors">
                        <span className="text-xs font-bold uppercase tracking-wider">Neutral</span>
                        <div className="text-xs opacity-80 font-mono">bg-neutral</div>
                    </div>

                    {/* Base 100 */}
                    <div className="bg-base-100 text-base-content p-4 rounded-xl shadow-xs flex flex-col justify-between h-28 border border-base-300 transition-colors">
                        <span className="text-xs font-bold uppercase tracking-wider">Base 100</span>
                        <div className="text-xs text-base-content/70 font-mono">bg-base-100</div>
                    </div>

                    {/* Base 300 */}
                    <div className="bg-base-300 text-base-content p-4 rounded-xl shadow-xs flex flex-col justify-between h-28 border border-base-300 transition-colors">
                        <span className="text-xs font-bold uppercase tracking-wider">Base 300</span>
                        <div className="text-xs text-base-content/70 font-mono">bg-base-300</div>
                    </div>
                </div>

                {/* State colors */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="bg-success text-success-content p-3.5 rounded-xl text-xs font-medium flex items-center justify-between shadow-xs">
                        <span>Success Status</span>
                        <span className="font-mono text-[10px] opacity-80">bg-success</span>
                    </div>
                    <div className="bg-warning text-warning-content p-3.5 rounded-xl text-xs font-medium flex items-center justify-between shadow-xs">
                        <span>Warning Status</span>
                        <span className="font-mono text-[10px] opacity-80">bg-warning</span>
                    </div>
                    <div className="bg-error text-error-content p-3.5 rounded-xl text-xs font-medium flex items-center justify-between shadow-xs">
                        <span>Error Status</span>
                        <span className="font-mono text-[10px] opacity-80">bg-error</span>
                    </div>
                    <div className="bg-info text-info-content p-3.5 rounded-xl text-xs font-medium flex items-center justify-between shadow-xs">
                        <span>Info Status</span>
                        <span className="font-mono text-[10px] opacity-80">bg-info</span>
                    </div>
                </div>
            </div>

            {/* Section 2: DaisyUI Components Showcase */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-bold text-base-content">
                        DaisyUI Component Integration
                    </h3>
                    <p className="text-xs sm:text-sm text-base-content/70">
                        Components styled with DaisyUI semantic classes like <code className="text-primary font-mono font-semibold">btn-primary</code>, <code className="text-primary font-mono font-semibold">card</code>, <code className="text-primary font-mono font-semibold">badge</code>, <code className="text-primary font-mono font-semibold">alert</code>.
                    </p>
                </div>

                {/* Buttons and Badges */}
                <div className="card bg-base-100 border border-base-300 p-6 shadow-xs space-y-5">
                    <h4 className="text-sm font-semibold text-base-content uppercase tracking-wider">
                        Buttons & Badges
                    </h4>
                    <div className="flex flex-wrap gap-3 items-center">
                        <button className="btn btn-primary">btn-primary</button>
                        <button className="btn btn-secondary">btn-secondary</button>
                        <button className="btn btn-accent">btn-accent</button>
                        <button className="btn btn-neutral">btn-neutral</button>
                        <button className="btn btn-outline btn-primary">Outline Primary</button>
                        <button className="btn btn-ghost">Ghost</button>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center pt-2">
                        <span className="badge badge-primary">Primary Badge</span>
                        <span className="badge badge-secondary">Secondary Badge</span>
                        <span className="badge badge-accent">Accent Badge</span>
                        <span className="badge badge-neutral">Neutral Badge</span>
                        <span className="badge badge-info">Info</span>
                        <span className="badge badge-success">Success</span>
                        <span className="badge badge-warning">Warning</span>
                        <span className="badge badge-error">Error</span>
                    </div>
                </div>

                {/* Cards and Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="card bg-base-100 border border-base-300 p-5 shadow-xs space-y-2">
                        <span className="text-xs text-base-content/60 uppercase font-semibold">Total Projects</span>
                        <div className="text-3xl font-extrabold text-primary">24 Active</div>
                        <p className="text-xs text-success flex items-center gap-1 font-medium">
                            ↑ 12% increase from last month
                        </p>
                    </div>

                    <div className="card bg-base-100 border border-base-300 p-5 shadow-xs space-y-2">
                        <span className="text-xs text-base-content/60 uppercase font-semibold">Team Velocity</span>
                        <div className="text-3xl font-extrabold text-secondary">98.4%</div>
                        <p className="text-xs text-base-content/70 font-medium">
                            48 completed sprints
                        </p>
                    </div>

                    <div className="card bg-base-100 border border-base-300 p-5 shadow-xs space-y-2">
                        <span className="text-xs text-base-content/60 uppercase font-semibold">Pending Review</span>
                        <div className="text-3xl font-extrabold text-accent">7 Tasks</div>
                        <p className="text-xs text-warning flex items-center gap-1 font-medium">
                            ● 3 urgent reviews needed
                        </p>
                    </div>
                </div>

                {/* Alerts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="alert alert-info shadow-xs text-xs sm:text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>DaisyUI Info Alert: Light and dark palettes adjusted.</span>
                    </div>
                    <div className="alert alert-success shadow-xs text-xs sm:text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>DaisyUI Success Alert: Contrast ratios verified!</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;