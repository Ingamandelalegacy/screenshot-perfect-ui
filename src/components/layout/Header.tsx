import { User } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-end px-6">
      <div className="flex items-center gap-3">
        <span className="text-sm text-foreground">Admin UAT User 3</span>
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <User size={20} className="text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};

export default Header;
