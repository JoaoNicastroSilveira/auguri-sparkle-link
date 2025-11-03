import { Home, Heart, ShoppingCart, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const { isTestUser } = useAuth();

  const navItems = [
    { path: '/catalogo', label: 'Catálogo', icon: Home },
    { path: '/favoritos', label: 'Favoritos', icon: Heart },
    { path: '/pedido', label: 'Pedido', icon: ShoppingCart, badge: totalItems },
    { path: '/perfil', label: 'Perfil', icon: User },
  ];

  return (
    <>
      {isTestUser && (
        <div className="fixed top-4 right-4 z-50 bg-orange-500/90 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center gap-1.5">
          🔧 Modo Teste
        </div>
      )}
      
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-inset-bottom">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
          {navItems.map(({ path, label, icon: Icon, badge }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 h-full transition-smooth relative",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <div className="relative">
                  <Icon className={cn("w-6 h-6", isActive && "animate-scale-in")} />
                  {badge && badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                      {badge > 9 ? '9+' : badge}
                    </span>
                  )}
                </div>
                <span className={cn("text-xs mt-1", isActive && "font-semibold")}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default BottomNav;
