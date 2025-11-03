import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { analyzeImage, matchProducts } from '@/utils/imageAnalysis';
import { mockProducts } from '@/data/mockProducts';

interface VisualSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VisualSearchModal = ({ open, onOpenChange }: VisualSearchModalProps) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const navigate = useNavigate();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.heic']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadedImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
    },
    onDropRejected: (fileRejections) => {
      const error = fileRejections[0]?.errors[0];
      if (error?.code === 'file-too-large') {
        toast.error('Imagem muito grande. Máximo 10MB.');
      } else {
        toast.error('Formato de imagem não suportado.');
      }
    }
  });

  const handleCameraCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setUploadedImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
    };
    input.click();
  };

  const handleSearch = async () => {
    if (!uploadedImage) {
      toast.error('Selecione uma imagem primeiro');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Step 1: Detectando cores
      setAnalysisStep('Detectando cores...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Step 2: Analisando imagem
      setAnalysisStep('Identificando tipo de joia...');
      const analysis = await analyzeImage(uploadedImage);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Step 3: Buscando produtos
      setAnalysisStep('Buscando produtos similares...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const matches = matchProducts(analysis, mockProducts);
      
      if (matches.length === 0) {
        toast.error('Nenhum produto similar encontrado. Tente outra foto.');
        setIsAnalyzing(false);
        return;
      }
      
      // Salvar resultados temporários
      sessionStorage.setItem('visualSearchResults', JSON.stringify(matches));
      sessionStorage.setItem('visualSearchImage', imagePreview || '');
      
      toast.success(`✨ Encontramos ${matches.length} joias similares!`);
      
      // Navegar para resultados
      navigate('/busca-visual/resultados');
      onOpenChange(false);
      
    } catch (error) {
      console.error('Erro na análise:', error);
      toast.error('Erro ao analisar imagem. Tente novamente.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setIsAnalyzing(false);
    setAnalysisStep('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">🔍 Encontre Joias Similares</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!uploadedImage ? (
            <>
              {/* Upload Area */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-base ${
                  isDragActive
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="font-medium mb-1">
                  {isDragActive ? 'Solte a imagem aqui' : 'Clique ou arraste uma foto'}
                </p>
                <p className="text-sm text-muted-foreground">
                  JPG, PNG, HEIC ou WebP até 10MB
                </p>
              </div>

              {/* Camera Button */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">OU</p>
                <Button
                  onClick={handleCameraCapture}
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Camera className="w-4 h-4" />
                  📸 Tirar Foto Agora
                </Button>
              </div>

              {/* Tips */}
              <div className="bg-muted/50 rounded-lg p-3 text-sm">
                <p className="font-medium text-gold mb-1">💡 Dica:</p>
                <p className="text-muted-foreground">
                  Quanto melhor a foto, melhores os resultados! Use boa iluminação e foque na joia.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Image Preview */}
              <div className="relative rounded-xl overflow-hidden bg-muted">
                <img
                  src={imagePreview || ''}
                  alt="Preview"
                  className="w-full h-64 object-contain"
                />
                {!isAnalyzing && (
                  <button
                    onClick={handleReset}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-2 hover:bg-destructive/90 transition-base"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Analysis Progress */}
              {isAnalyzing && (
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    <span className="font-medium">Analisando imagem...</span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className={analysisStep.includes('cores') ? 'text-success' : 'text-muted-foreground'}>
                      {analysisStep.includes('cores') ? '✅' : '⏳'} Detectando cores
                    </div>
                    <div className={analysisStep.includes('tipo') ? 'text-success' : 'text-muted-foreground'}>
                      {analysisStep.includes('tipo') ? '✅' : '⏳'} Identificando tipo
                    </div>
                    <div className={analysisStep.includes('produtos') ? 'text-success' : 'text-muted-foreground'}>
                      {analysisStep.includes('produtos') ? '✅' : '⏳'} Buscando produtos similares
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1"
              disabled={isAnalyzing}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSearch}
              className="flex-1 gradient-primary"
              disabled={!uploadedImage || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analisando...
                </>
              ) : (
                'Buscar →'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VisualSearchModal;
