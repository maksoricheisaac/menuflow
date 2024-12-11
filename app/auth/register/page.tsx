/* eslint-disable react/no-unescaped-entities */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { PhoneInput } from '@/components/phone-input';

const restaurantSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  address: z.string().min(5, 'Adresse invalide'),
});

const ownerSchema = z.object({
  fullName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

export default function RegisterPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('restaurant');
  const [restaurantData, setRestaurantData] = useState<z.infer<typeof restaurantSchema> | null>(null);
  const [ownerData, setOwnerData] = useState<z.infer<typeof ownerSchema> | null>(null);

  const restaurantForm = useForm<z.infer<typeof restaurantSchema>>({
    resolver: zodResolver(restaurantSchema),
  });

  const ownerForm = useForm<z.infer<typeof ownerSchema>>({
    resolver: zodResolver(ownerSchema),
  });

  const onRestaurantSubmit = async (values: z.infer<typeof restaurantSchema>) => {
    setRestaurantData(values);
    setActiveTab('owner');
  };

  const onOwnerSubmit = async (values: z.infer<typeof ownerSchema>) => {
    setOwnerData(values);
    // Combine both forms data and submit
    if (restaurantData) {
      const completeData = {
        restaurant: restaurantData,
        owner: values,
      };
      console.log('Complete registration data:', completeData);
      toast({
        title: 'Inscription réussie',
        description: 'Votre compte a été créé avec succès.',
      });
    }
  };

  const isFormComplete = restaurantData && ownerData;

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Inscription Restaurant
        </h1>
        <p className="text-muted-foreground">
          Créez votre compte pour commencer à gérer votre menu numérique
        </p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Informations d'inscription</CardTitle>
          <CardDescription>
            Remplissez les informations de votre restaurant et créez votre compte propriétaire
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger
                value="restaurant"
                className={cn(
                  'text-base',
                  restaurantData && 'bg-green-500/10 text-green-600 data-[state=active]:bg-green-500/20'
                )}
              >
                Restaurant
              </TabsTrigger>
              <TabsTrigger
                value="owner"
                className={cn(
                  'text-base',
                  ownerData && 'bg-green-500/10 text-green-600 data-[state=active]:bg-green-500/20'
                )}
              >
                Propriétaire
              </TabsTrigger>
            </TabsList>
            <TabsContent value="restaurant">
              <ScrollArea className="h-[500px] pr-4">
                <Form {...restaurantForm}>
                  <form onSubmit={restaurantForm.handleSubmit(onRestaurantSubmit)} className="space-y-6 px-3">
                    <FormField
                      control={restaurantForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Nom du restaurant</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={restaurantForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Email professionnel</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={restaurantForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Téléphone</FormLabel>
                          <FormControl>
                            <PhoneInput {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={restaurantForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Adresse</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end">
                      <Button type="submit" size="lg" className="w-full md:w-auto">
                        Suivant
                      </Button>
                    </div>
                  </form>
                </Form>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="owner">
              <ScrollArea className="h-[500px] pr-4">
                <Form {...ownerForm}>
                  <form onSubmit={ownerForm.handleSubmit(onOwnerSubmit)} className="space-y-6 px-3">
                    <FormField
                      control={ownerForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Nom complet</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={ownerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Email personnel</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={ownerForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Téléphone</FormLabel>
                          <FormControl>
                            <PhoneInput {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={ownerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Mot de passe</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={ownerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Confirmer le mot de passe</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => setActiveTab('restaurant')}
                      >
                        Retour
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                      >
                        Créer le compte
                      </Button>
                    </div>
                  </form>
                </Form>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        Déjà inscrit?{' '}
        <Link href="/auth/login" className="text-primary hover:underline">
          Connectez-vous
        </Link>
      </p>
    </div>
  );
}