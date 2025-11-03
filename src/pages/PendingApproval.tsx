import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Phone, Mail, Instagram } from 'lucide-react';

const PendingApproval = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8 text-center animate-fade-in">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-warning" />
          </div>
          
          <h1 className="text-3xl font-bold text-primary">Cadastro em análise</h1>
          
          <p className="text-muted-foreground text-lg">
            Sua conta será aprovada em breve. Você receberá um email de confirmação.
          </p>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-card space-y-4">
          <h2 className="font-semibold text-primary">Contato Auguri</h2>
          
          <div className="space-y-3 text-sm">
            <a href="tel:1132913200" className="flex items-center gap-3 text-foreground hover:text-primary transition-base">
              <Phone className="w-5 h-5" />
              <span>(11) 3291-3200</span>
            </a>
            
            <a href="mailto:contato@auguri.com.br" className="flex items-center gap-3 text-foreground hover:text-primary transition-base">
              <Mail className="w-5 h-5" />
              <span>contato@auguri.com.br</span>
            </a>
            
            <a
              href="https://instagram.com/augurijoias"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-foreground hover:text-primary transition-base"
            >
              <Instagram className="w-5 h-5" />
              <span>@augurijoias</span>
            </a>
          </div>
        </div>

        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="w-full"
        >
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default PendingApproval;
