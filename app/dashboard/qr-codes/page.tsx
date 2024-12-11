'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import QRCode from 'qrcode';
import { saveAs } from 'file-saver';
import { useToast } from '@/hooks/use-toast';

export default function QRCodesPage() {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const { toast } = useToast();

  const generateQRCode = async () => {
    try {
      const url = `https://menuflow.app/restaurant/1`;
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      setQrCodeUrl(qrDataUrl);
      toast({
        title: 'QR Code régénéré',
        description: 'Votre QR code a été mis à jour avec succès.',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la génération du QR code.',
        variant: 'destructive',
      });
    }
  };

  const downloadQRCode = () => {
    try {
      if (!qrCodeUrl) {
        throw new Error('Aucun QR code généré');
      }
      saveAs(qrCodeUrl, 'menuflow-qr-code.png');
      toast({
        title: 'Téléchargement réussi',
        description: 'Le QR code a été téléchargé avec succès.',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors du téléchargement.',
        variant: 'destructive',
      });
    }
  };

  // Générer le QR code au chargement de la page
  useState(() => {
    generateQRCode();
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">QR Codes</h1>
        <Button onClick={generateQRCode}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Régénérer
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>QR Code du Menu</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            {qrCodeUrl && (
              <div className="relative h-64 w-64">
                <Image
                  src={qrCodeUrl}
                  alt="QR Code du menu"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <Button onClick={downloadQRCode}>
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Comment utiliser votre QR Code :</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Imprimez le QR code et placez-le sur vos tables</li>
                <li>Ajoutez-le à vos cartes de visite</li>
                <li>Intégrez-le dans vos supports marketing</li>
                <li>Partagez-le sur vos réseaux sociaux</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Conseils d&apos;utilisation :</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Imprimez en haute qualité pour une meilleure lisibilité</li>
                <li>Évitez de déformer le QR code</li>
                <li>Assurez-vous qu&apos;il y a suffisamment de contraste</li>
                <li>Testez le QR code avant de l&apos;utiliser</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}