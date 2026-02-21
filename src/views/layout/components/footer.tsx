import { generalSettings } from '@/views/config/general.config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 py-5">
          <div className="flex order-2 md:order-1  gap-2 font-normal text-sm">
            <span className="text-muted-foreground">{currentYear} &copy;</span>
            <a
              href="https://keenthemes.com"
              target="_blank"
              className="text-secondary-foreground hover:text-primary"
            >
              Keenthemes Inc.
            </a>
          </div>
          <nav className="flex order-1 md:order-2 gap-4 font-normal text-sm text-muted-foreground">
            <a
              href={generalSettings.docsLink}
              target="_blank"
              className="hover:text-primary"
            >
              Docs
            </a>
            <a
              href={generalSettings.purchaseLink}
              target="_blank"
              className="hover:text-primary"
            >
              Purchase
            </a>
            <a
              href={generalSettings.faqLink}
              target="_blank"
              className="hover:text-primary"
            >
              FAQ
            </a>
            <a
              href="https://devs.keenthemes.com"
              target="_blank"
              className="hover:text-primary"
            >
              Support
            </a>
            <a
              href={generalSettings.licenseLink}
              target="_blank"
              className="hover:text-primary"
            >
              License
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
