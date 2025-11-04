import { COMPANY } from '@/constants/company';
import { Pedido } from '@/types/Pedido';
import { Lojista } from '@/types/Lojista';

export class WhatsAppService {
  static formatOrderMessage(pedido: Pedido, lojista: Lojista): string {
    let message = `🛍️ *NOVO PEDIDO AUGURI*\n\n`;
    message += `*Lojista:* ${lojista.nomeLoja}\n`;
    message += `*CNPJ:* ${lojista.cnpj}\n`;
    message += `*Contato:* ${lojista.telefone}\n\n`;
    message += `*PRODUTOS:*\n\n`;

    pedido.produtos.forEach((produto, index) => {
      message += `${index + 1}. ${produto.nome}\n`;
      message += `   Ref: ${produto.referencia}\n`;
      message += `   Qtd: ${produto.quantidade} unidades\n\n`;
    });

    if (pedido.observacoes) {
      message += `*OBSERVAÇÕES:*\n${pedido.observacoes}\n\n`;
    }

    message += `---\nPedido enviado via App Auguri`;

    return message;
  }

  static sendOrder(pedido: Pedido, lojista: Lojista): void {
    const message = this.formatOrderMessage(pedido, lojista);
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${COMPANY.contact.whatsapp}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
  }

  static downloadOrderAsText(pedido: Pedido, lojista: Lojista): void {
    const message = this.formatOrderMessage(pedido, lojista);
    const blob = new Blob([message], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pedido-${pedido.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
