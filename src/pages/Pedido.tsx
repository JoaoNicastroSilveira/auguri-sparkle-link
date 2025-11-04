import { useState } from 'react';
import { ShoppingBag, Trash2, Minus, Plus, FileDown } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import BottomNav from '@/components/shared/BottomNav';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const Pedido = () => {
  const { items, updateQuantity, removeItem, clearCart, totalItems, observacoes, setObservacoes } = useCart();
  const { lojista } = useAuth();
  const [obsExpanded, setObsExpanded] = useState(false);

  const formatarPedido = () => {
    let mensagem = `🛍️ *NOVO PEDIDO AUGURI*\n\n`;
    mensagem += `*Lojista:* ${lojista?.nomeLoja}\n`;
    mensagem += `*CNPJ:* ${lojista?.cnpj}\n`;
    mensagem += `*Contato:* ${lojista?.telefone}\n\n`;
    mensagem += `*PRODUTOS:*\n`;
    
    items.forEach(item => {
      mensagem += `• ${item.product.nome} - Ref: ${item.product.referencia}\n`;
      mensagem += `  Qtd: ${item.quantidade} unidades\n`;
      mensagem += `  Peso: ${item.product.peso}g cada\n\n`;
    });
    
    if (observacoes) {
      mensagem += `*OBSERVAÇÕES:*\n${observacoes}\n\n`;
    }
    
    mensagem += `---\nPedido enviado via App Auguri`;
    return mensagem;
  };

  const handleWhatsApp = () => {
    const mensagem = formatarPedido();
    const whatsappURL = `https://wa.me/551132913200?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappURL, '_blank');
    toast.success('Abrindo WhatsApp...');
  };

  const handleDownloadPDF = () => {
    const mensagem = formatarPedido();
    const blob = new Blob([mensagem], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pedido-auguri-${Date.now()}.txt`;
    a.click();
    toast.success('📄 PDF baixado');
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border p-4">
        <h1 className="text-2xl font-bold text-primary">Meu Pedido</h1>
        <p className="text-sm text-muted-foreground">{totalItems} itens</p>
      </header>

      {/* Content */}
      <div className="p-4 space-y-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Seu pedido está vazio</h2>
              <p className="text-muted-foreground">
                Adicione produtos do catálogo para começar
              </p>
            </div>
            <Button onClick={() => window.location.href = '/catalogo'}>
              Explorar Catálogo
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="bg-card rounded-xl p-4 shadow-card space-y-3">
                  <div className="flex gap-3">
                    <img
                      src={item.product.imagens[0]}
                      alt={item.product.nome}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{item.product.nome}</h3>
                      <p className="text-xs text-muted-foreground">Ref: {item.product.referencia}</p>
                      <p className="text-xs text-gold mt-1">{item.product.material}</p>
                      {item.product.estoque > 0 ? (
                        <p className="text-xs text-success mt-1">Em estoque</p>
                      ) : (
                        <p className="text-xs text-muted-foreground mt-1">Sob encomenda</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantidade - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold">{item.quantidade}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantidade + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        removeItem(item.product.id);
                        toast.success('Item removido');
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Observations */}
            <div className="bg-card rounded-xl p-4 shadow-card space-y-3">
              <button
                onClick={() => setObsExpanded(!obsExpanded)}
                className="w-full flex items-center justify-between text-left"
              >
                <Label className="font-semibold cursor-pointer">Observações</Label>
                <span className="text-xs text-muted-foreground">
                  {obsExpanded ? '▲' : '▼'}
                </span>
              </button>
              
              {obsExpanded && (
                <Textarea
                  placeholder="Adicione observações sobre o pedido..."
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  maxLength={500}
                  rows={4}
                  className="resize-none"
                />
              )}
            </div>

            {/* Summary */}
            <div className="bg-card rounded-xl p-4 shadow-card space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total de itens:</span>
                <span className="font-semibold">{totalItems}</span>
              </div>
              <p className="text-xs text-muted-foreground pt-2">
                Preços e condições serão confirmados pela Auguri
              </p>
            </div>
          </>
        )}
      </div>

      {/* Bottom Actions */}
      {items.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 p-4 bg-card border-t border-border space-y-2">
          <Button
            onClick={handleWhatsApp}
            className="w-full h-14 gradient-primary text-primary-foreground font-semibold text-lg gap-2"
          >
            💬 Enviar via WhatsApp
          </Button>
          
          <Button
            onClick={handleDownloadPDF}
            variant="outline"
            className="w-full h-12 gap-2"
          >
            <FileDown className="w-5 h-5" />
            Baixar PDF
          </Button>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Pedido;
