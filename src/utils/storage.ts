// Storage utility functions using localStorage

export interface Lojista {
  id: string;
  email: string;
  senha: string;
  nome_loja: string;
  cnpj: string;
  telefone: string;
  aprovado: boolean;
  created_at: string;
}

export interface CarrinhoItem {
  produto_id: string;
  quantidade: number;
  added_at: string;
}

export interface Pedido {
  id: string;
  lojista_id: string;
  lojista_nome: string;
  produtos: Array<{
    produto_id: string;
    nome: string;
    referencia: string;
    quantidade: number;
  }>;
  observacoes: string;
  status: 'pendente' | 'confirmado' | 'entregue' | 'cancelado';
  created_at: string;
}

// ========== PRODUTOS ==========
export async function getProdutos() {
  try {
    const result = localStorage.getItem('produtos');
    if (result) {
      return JSON.parse(result);
    }
    return [];
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
}

export async function getProdutoById(id: string) {
  try {
    const produtos = await getProdutos();
    return produtos.find((p: any) => p.id === id);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return null;
  }
}

export async function saveProdutos(produtos: any[]) {
  try {
    localStorage.setItem('produtos', JSON.stringify(produtos));
    return true;
  } catch (error) {
    console.error('Erro ao salvar produtos:', error);
    return false;
  }
}

// ========== FAVORITOS ==========
export async function getFavoritos(userId: string) {
  try {
    const result = localStorage.getItem(`favoritos:${userId}`);
    if (result) {
      return JSON.parse(result);
    }
    return [];
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    return [];
  }
}

export async function toggleFavorito(userId: string, produtoId: string) {
  try {
    const favoritos = await getFavoritos(userId);
    let newFavoritos;
    
    if (favoritos.includes(produtoId)) {
      newFavoritos = favoritos.filter((id: string) => id !== produtoId);
    } else {
      newFavoritos = [...favoritos, produtoId];
    }
    
    localStorage.setItem(`favoritos:${userId}`, JSON.stringify(newFavoritos));
    return newFavoritos;
  } catch (error) {
    console.error('Erro ao toggle favorito:', error);
    return [];
  }
}

export async function isFavorito(userId: string, produtoId: string) {
  try {
    const favoritos = await getFavoritos(userId);
    return favoritos.includes(produtoId);
  } catch (error) {
    console.error('Erro ao verificar favorito:', error);
    return false;
  }
}

// ========== CARRINHO ==========
export async function getCarrinho(userId: string) {
  try {
    const result = localStorage.getItem(`carrinho:${userId}`);
    if (result) {
      return JSON.parse(result);
    }
    return [];
  } catch (error) {
    console.error('Erro ao buscar carrinho:', error);
    return [];
  }
}

export async function addToCarrinho(userId: string, produtoId: string, quantidade: number) {
  try {
    const carrinho = await getCarrinho(userId);
    const existingItem = carrinho.find((item: CarrinhoItem) => item.produto_id === produtoId);
    
    let newCarrinho;
    if (existingItem) {
      newCarrinho = carrinho.map((item: CarrinhoItem) =>
        item.produto_id === produtoId
          ? { ...item, quantidade: item.quantidade + quantidade }
          : item
      );
    } else {
      newCarrinho = [...carrinho, {
        produto_id: produtoId,
        quantidade,
        added_at: new Date().toISOString()
      }];
    }
    
    localStorage.setItem(`carrinho:${userId}`, JSON.stringify(newCarrinho));
    return newCarrinho;
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
    return [];
  }
}

export async function updateQuantidade(userId: string, produtoId: string, quantidade: number) {
  try {
    const carrinho = await getCarrinho(userId);
    const newCarrinho = carrinho.map((item: CarrinhoItem) =>
      item.produto_id === produtoId ? { ...item, quantidade } : item
    );
    
    localStorage.setItem(`carrinho:${userId}`, JSON.stringify(newCarrinho));
    return newCarrinho;
  } catch (error) {
    console.error('Erro ao atualizar quantidade:', error);
    return [];
  }
}

export async function removeFromCarrinho(userId: string, produtoId: string) {
  try {
    const carrinho = await getCarrinho(userId);
    const newCarrinho = carrinho.filter((item: CarrinhoItem) => item.produto_id !== produtoId);
    
    localStorage.setItem(`carrinho:${userId}`, JSON.stringify(newCarrinho));
    return newCarrinho;
  } catch (error) {
    console.error('Erro ao remover do carrinho:', error);
    return [];
  }
}

export async function clearCarrinho(userId: string) {
  try {
    localStorage.setItem(`carrinho:${userId}`, JSON.stringify([]));
    return true;
  } catch (error) {
    console.error('Erro ao limpar carrinho:', error);
    return false;
  }
}

// ========== PEDIDOS ==========
export async function createPedido(lojista: Lojista, produtos: any[], observacoes: string) {
  try {
    const pedidoId = `order_${Date.now()}`;
    const novoPedido: Pedido = {
      id: pedidoId,
      lojista_id: lojista.id,
      lojista_nome: lojista.nome_loja,
      produtos: produtos.map((item: any) => ({
        produto_id: item.product.id,
        nome: item.product.nome,
        referencia: item.product.referencia,
        quantidade: item.quantidade
      })),
      observacoes,
      status: 'pendente',
      created_at: new Date().toISOString()
    };
    
    // Salvar no pedidos gerais
    const allPedidos = await getAllPedidos();
    localStorage.setItem('pedidos', JSON.stringify([...allPedidos, novoPedido]));
    
    // Salvar no histórico do usuário
    const userPedidos = await getPedidosUsuario(lojista.id);
    const userPedidoIds = userPedidos.map((p: Pedido) => p.id);
    localStorage.setItem(`pedidos:${lojista.id}`, JSON.stringify([...userPedidoIds, pedidoId]));
    
    return novoPedido;
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return null;
  }
}

export async function getPedidosUsuario(userId: string) {
  try {
    const result = localStorage.getItem(`pedidos:${userId}`);
    if (result) {
      const pedidoIds = JSON.parse(result);
      const allPedidos = await getAllPedidos();
      return allPedidos.filter((p: Pedido) => pedidoIds.includes(p.id));
    }
    return [];
  } catch (error) {
    console.error('Erro ao buscar pedidos do usuário:', error);
    return [];
  }
}

export async function getAllPedidos() {
  try {
    const result = localStorage.getItem('pedidos');
    if (result) {
      return JSON.parse(result);
    }
    return [];
  } catch (error) {
    console.error('Erro ao buscar todos pedidos:', error);
    return [];
  }
}

export async function updatePedidoStatus(pedidoId: string, status: Pedido['status']) {
  try {
    const pedidos = await getAllPedidos();
    const updatedPedidos = pedidos.map((p: Pedido) =>
      p.id === pedidoId ? { ...p, status } : p
    );
    
    localStorage.setItem('pedidos', JSON.stringify(updatedPedidos));
    return true;
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    return false;
  }
}

// ========== AUTH ==========
export async function getLojistas() {
  try {
    const result = localStorage.getItem('lojistas');
    if (result) {
      return JSON.parse(result);
    }
    return [];
  } catch (error) {
    console.error('Erro ao buscar lojistas:', error);
    return [];
  }
}

export async function registerLojista(dados: Omit<Lojista, 'id' | 'created_at'>) {
  try {
    const lojistas = await getLojistas();
    
    // Verificar se email já existe
    if (lojistas.some((l: Lojista) => l.email === dados.email)) {
      return { success: false, error: 'Email já cadastrado' };
    }
    
    const novoLojista: Lojista = {
      ...dados,
      id: `user_${Date.now()}`,
      created_at: new Date().toISOString()
    };
    
    localStorage.setItem('lojistas', JSON.stringify([...lojistas, novoLojista]));
    return { success: true, lojista: novoLojista };
  } catch (error) {
    console.error('Erro ao registrar lojista:', error);
    return { success: false, error: 'Erro ao registrar' };
  }
}

export async function loginLojista(email: string, senha: string) {
  try {
    const lojistas = await getLojistas();
    const lojista = lojistas.find((l: Lojista) => l.email === email && l.senha === senha);
    
    if (!lojista) {
      return { success: false, error: 'Email ou senha incorretos' };
    }
    
    if (!lojista.aprovado) {
      return { success: false, error: 'Cadastro aguardando aprovação' };
    }
    
    return { success: true, lojista };
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return { success: false, error: 'Erro ao fazer login' };
  }
}

// ========== OBSERVAÇÕES ==========
export async function getObservacoes(userId: string) {
  try {
    const result = localStorage.getItem(`observacoes:${userId}`);
    if (result) {
      return result;
    }
    return '';
  } catch (error) {
    console.error('Erro ao buscar observações:', error);
    return '';
  }
}

export async function saveObservacoes(userId: string, observacoes: string) {
  try {
    localStorage.setItem(`observacoes:${userId}`, observacoes);
    return true;
  } catch (error) {
    console.error('Erro ao salvar observações:', error);
    return false;
  }
}
