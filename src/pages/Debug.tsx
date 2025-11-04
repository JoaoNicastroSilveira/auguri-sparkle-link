import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import * as storage from '@/utils/storage';
import { mockProducts } from '@/data/mockProducts';
import { toast } from 'sonner';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const Debug = () => {
  const navigate = useNavigate();
  const { lojista } = useAuth();
  const [debugInfo, setDebugInfo] = useState({
    produtos: 0,
    lojistas: 0,
    carrinho: 0,
    favoritos: 0,
    pedidos: 0
  });

  const loadDebugInfo = async () => {
    try {
      const produtos = await storage.getProdutos();
      const lojistas = await storage.getLojistas();
      const carrinho = lojista ? await storage.getCarrinho(lojista.id) : [];
      const favoritos = lojista ? await storage.getFavoritos(lojista.id) : [];
      const pedidos = await storage.getAllPedidos();

      setDebugInfo({
        produtos: produtos.length,
        lojistas: lojistas.length,
        carrinho: carrinho.length,
        favoritos: favoritos.length,
        pedidos: pedidos.length
      });
    } catch (error) {
      console.error('Erro ao carregar debug info:', error);
    }
  };

  useEffect(() => {
    loadDebugInfo();
  }, [lojista]);

  const handleResetStorage = async () => {
    if (!confirm('Tem certeza que deseja resetar todos os dados? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      // Clear all storage
      if (lojista) {
        localStorage.setItem(`carrinho:${lojista.id}`, JSON.stringify([]));
        localStorage.setItem(`favoritos:${lojista.id}`, JSON.stringify([]));
        localStorage.setItem(`observacoes:${lojista.id}`, '');
      }
      
      // Reset to initial state
      await storage.saveProdutos(mockProducts);
      
      toast.success('Storage resetado com sucesso!');
      loadDebugInfo();
      
      // Reload page to reinitialize
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Erro ao resetar storage:', error);
      toast.error('Erro ao resetar storage');
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <button
        onClick={() => navigate('/perfil')}
        className="flex items-center gap-2 text-primary mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Voltar</span>
      </button>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">🔧 Debug Panel</h1>
          <p className="text-muted-foreground">Informações de desenvolvimento</p>
        </div>

        {/* User Info */}
        <Card className="p-6 space-y-3">
          <h2 className="text-xl font-semibold">👤 Usuário Atual</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nome:</span>
              <span className="font-medium">{lojista?.nomeLoja}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID:</span>
              <span className="font-mono text-xs">{lojista?.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{lojista?.email}</span>
            </div>
          </div>
        </Card>

        {/* Storage Stats */}
        <Card className="p-6 space-y-3">
          <h2 className="text-xl font-semibold">💾 Storage Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary">{debugInfo.produtos}</div>
              <div className="text-sm text-muted-foreground">Produtos</div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary">{debugInfo.lojistas}</div>
              <div className="text-sm text-muted-foreground">Lojistas</div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary">{debugInfo.carrinho}</div>
              <div className="text-sm text-muted-foreground">Itens no Carrinho</div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary">{debugInfo.favoritos}</div>
              <div className="text-sm text-muted-foreground">Favoritos</div>
            </div>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-primary">{debugInfo.pedidos}</div>
            <div className="text-sm text-muted-foreground">Total de Pedidos</div>
          </div>
        </Card>

        {/* Actions */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">⚙️ Ações</h2>
          
          <Button
            onClick={loadDebugInfo}
            className="w-full gap-2"
            variant="outline"
          >
            <RefreshCw className="w-4 h-4" />
            Recarregar Informações
          </Button>

          <Button
            onClick={handleResetStorage}
            className="w-full"
            variant="destructive"
          >
            🗑️ Reset Storage (Limpar Tudo)
          </Button>
        </Card>

        {/* Info */}
        <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground text-center">
          Este painel está disponível apenas em modo de desenvolvimento.
          <br />
          Use com cuidado - algumas ações não podem ser desfeitas.
        </div>
      </div>
    </div>
  );
};

export default Debug;
