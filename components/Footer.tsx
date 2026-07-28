export default function Footer() {
  return (
    <footer className="relative z-10 px-6 pb-10">
      <div className="max-w-7xl mx-auto glass-strong rounded-[2rem] p-10 md:p-14 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-sm">
            <div className="font-display italic text-2xl text-white mb-4">AURA</div>
            <p className="text-ink-500 text-sm leading-relaxed">
              Premium services, engineered with cinematic precision. Built
              for teams who refuse to settle for ordinary.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div>
              <div className="text-white text-sm font-medium mb-4">Company</div>
              <div className="flex flex-col gap-3 text-sm text-ink-500">
                <a href="#" className="hover:text-white transition-colors">About</a>
                <a href="#" className="hover:text-white transition-colors">Careers</a>
                <a href="#" className="hover:text-white transition-colors">Press</a>
              </div>
            </div>
            <div>
              <div className="text-white text-sm font-medium mb-4">Services</div>
              <div className="flex flex-col gap-3 text-sm text-ink-500">
                <a href="#services" className="hover:text-white transition-colors">Consulting</a>
                <a href="#services" className="hover:text-white transition-colors">Engineering</a>
                <a href="#services" className="hover:text-white transition-colors">Brand</a>
              </div>
            </div>
            <div>
              <div className="text-white text-sm font-medium mb-4">Legal</div>
              <div className="flex flex-col gap-3 text-sm text-ink-500">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-ink-700">
          <span>© {new Date().getFullYear()} AURA Collective. All rights reserved.</span>
          <span>Designed with obsessive precision.</span>
        </div>
      </div>
    </footer>
  );
}
