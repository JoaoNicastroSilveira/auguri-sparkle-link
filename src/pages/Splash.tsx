import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Splash = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/catalogo');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen gradient-primary flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="text-center space-y-8 max-w-md">
        <div className="space-y-4 animate-scale-in">
          <h1 className="text-6xl font-bold text-primary-foreground tracking-wide">
            Auguri
          </h1>
          <p className="text-2xl text-primary-foreground/90 font-light tracking-widest">
            JOIAS
          </p>
          <div className="inline-block bg-gold text-primary px-4 py-1 rounded-full">
            <p className="text-sm font-semibold tracking-wide">DESDE 1970</p>
          </div>
        </div>

        <p className="text-primary-foreground/80 text-lg">
          Excelência em joias há mais de 55 anos
        </p>

        <div className="space-y-3 pt-4">
          <Button
            size="lg"
            onClick={() => navigate('/login')}
            className="w-full bg-card text-primary hover:bg-card/90 h-12 text-base font-semibold"
          >
            Entrar
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/cadastro')}
            className="w-full border-2 border-card text-primary-foreground hover:bg-card/20 h-12 text-base font-semibold"
          >
            Cadastrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Splash;
