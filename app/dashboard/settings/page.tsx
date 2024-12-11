'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { RestaurantInfoForm } from '@/components/settings/restaurant-info-form';
import { NotificationSettingsForm } from '@/components/settings/notification-settings-form';
import { RestaurantSettings } from '@/types/settings';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  address: z.string().min(5, 'Adresse invalide'),
  description: z.string().optional(),
  openingHours: z.string().optional(),
  notifyEmail: z.boolean(),
  notifySMS: z.boolean(),
});

export default function SettingsPage() {
  const { toast } = useToast();
  const form = useForm<RestaurantSettings>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'Le Petit Bistrot',
      email: 'contact@petitbistrot.cg',
      phone: '+242 06 123 4567',
      address: 'Brazzaville, Congo',
      description: 'Restaurant traditionnel congolais',
      openingHours: 'Lun-Sam: 10h-22h, Dim: 12h-20h',
      notifyEmail: true,
      notifySMS: true,
    },
  });

  async function onSubmit(values: RestaurantSettings) {
    try {
      // TODO: Implement API call to save settings
      console.log(values);
      toast({
        title: 'Paramètres enregistrés',
        description: 'Vos modifications ont été enregistrées avec succès.',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'enregistrement.',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Paramètres</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <RestaurantInfoForm form={form} />
          <NotificationSettingsForm form={form} />
          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Enregistrer les modifications
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}