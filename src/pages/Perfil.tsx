import { Phone, Mail, Instagram, Link as LinkIcon, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNav from '@/components/shared/BottomNav';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const { lojista, logout, isTestUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado');
    navigate('/');
  };

  const handleSwitchAccount = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
            {lojista?.nomeLoja.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{lojista?.nomeLoja}</h1>
            <p className="text-sm opacity-90">{lojista?.cnpj}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Dados da Loja */}
        <div className="bg-card rounded-xl p-4 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Dados da Loja</h2>
            <Button variant="ghost" size="sm">Editar</Button>
          </div>
          
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-muted-foreground">Nome:</span>
              <p className="font-medium">{lojista?.nomeLoja}</p>
            </div>
            <div>
              <span className="text-muted-foreground">CNPJ:</span>
              <p className="font-medium">{lojista?.cnpj}</p>
            </div>
            <div>
              <span className="text-muted-foreground">E-mail:</span>
              <p className="font-medium">{lojista?.email}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Telefone:</span>
              <p className="font-medium">{lojista?.telefone}</p>
            </div>
          </div>
        </div>

        {/* Status da Conta */}
        <div className="bg-card rounded-xl p-4 shadow-card space-y-3">
          <h2 className="font-semibold text-lg">Status da Conta</h2>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-success/20 text-success rounded-full text-sm font-medium">
              ✅ Aprovado
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Membro desde {new Date(lojista?.createdAt || '').toLocaleDateString('pt-BR')}
          </p>
        </div>

        {/* Contato Auguri */}
        <div className="bg-card rounded-xl p-4 shadow-card space-y-4">
          <h2 className="font-semibold text-lg">📱 Contato Auguri</h2>
          
          <div className="space-y-3">
            <a
              href="tel:1132913200"
              className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-base"
            >
              <Phone className="w-5 h-5 text-primary" />
              <span className="flex-1">(11) 3291-3200</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </a>

            <a
              href="https://instagram.com/augurijoias"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-base"
            >
              <Instagram className="w-5 h-5 text-primary" />
              <span className="flex-1">@augurijoias</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </a>

            <a
              href="https://linktr.ee/auguri_joias"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-base"
            >
              <LinkIcon className="w-5 h-5 text-primary" />
              <span className="flex-1">linktr.ee/auguri_joias</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </a>
          </div>
        </div>

        {/* Test User Actions */}
        {isTestUser && (
          <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
              <span className="text-lg">🔧</span>
              <span className="font-semibold text-sm">Modo de Desenvolvimento</span>
            </div>
            <p className="text-xs text-orange-600 dark:text-orange-500">
              Você está usando um usuário de teste. Clique abaixo para testar login/cadastro.
            </p>
            <Button
              onClick={handleSwitchAccount}
              variant="outline"
              className="w-full border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950/30"
            >
              Trocar de Conta
            </Button>
          </div>
        )}

        {/* About & Help */}
        <div className="bg-card rounded-xl shadow-card divide-y divide-border">
          <button 
            onClick={() => navigate('/debug')}
            className="w-full flex items-center gap-3 p-4 hover:bg-muted transition-base"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-lg">📖</span>
            </div>
            <span className="flex-1 text-left font-medium">Sobre a Auguri</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full flex items-center gap-3 p-4 hover:bg-muted transition-base">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            <span className="flex-1 text-left font-medium">Ajuda & Suporte</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full h-12 gap-2"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </Button>

        {/* App Info */}
        <p className="text-center text-xs text-muted-foreground pt-4">
          Auguri Joias App • v1.0.0<br />
          Desde 1970
        </p>
      </div>

      <BottomNav />
    </div>
  );
};

export default Perfil;
