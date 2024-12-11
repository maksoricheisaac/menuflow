/* eslint-disable react/no-unescaped-entities */
import { Button } from '@/components/ui/button';
import { ChefHat, Smartphone, QrCode, CreditCard, Clock, Users, ArrowRight, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

const features = [
  {
    title: 'Menu Numérique',
    description: 'Créez et mettez à jour facilement votre menu avec photos et descriptions détaillées.',
    icon: ChefHat,
  },
  {
    title: 'QR Codes',
    description: 'Générez des QR codes uniques pour permettre aux clients d\'accéder rapidement à votre menu.',
    icon: QrCode,
  },
  {
    title: 'Paiements Mobiles',
    description: 'Acceptez les paiements via MTN Money et Airtel Money directement depuis l\'application.',
    icon: Smartphone,
  },
  {
    title: 'Commandes en Ligne',
    description: 'Gérez vos commandes en temps réel avec notifications instantanées.',
    icon: CreditCard,
  },
  {
    title: 'Gestion des Clients',
    description: 'Suivez les préférences de vos clients et fidélisez votre clientèle.',
    icon: Users,
  },
  {
    title: 'Temps Réel',
    description: 'Mises à jour instantanées du menu et des statuts de commande.',
    icon: Clock,
  },
];

const pricing = [
  {
    name: 'Démarrage',
    price: '15,000',
    description: 'Parfait pour les petits restaurants',
    features: [
      'Menu numérique',
      'QR code unique',
      'Commandes en ligne',
      'Paiements mobiles',
      'Support email',
    ],
  },
  {
    name: 'Pro',
    price: '25,000',
    description: 'Pour les restaurants en croissance',
    features: [
      'Tout du plan Démarrage',
      'Analyses avancées',
      'Gestion des employés',
      'Support prioritaire',
      'Formation personnalisée',
    ],
  },
  {
    name: 'Entreprise',
    price: 'Sur mesure',
    description: 'Pour les grandes chaînes',
    features: [
      'Tout du plan Pro',
      'Multi-restaurants',
      'API personnalisée',
      'Support dédié 24/7',
      'Intégrations sur mesure',
    ],
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6" />
            <span className="text-xl font-bold">MenuFlow</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost">Connexion</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Inscription Restaurant</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight">
              Digitalisez votre restaurant, <br />
              Simplifiez vos opérations
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              La solution complète pour les restaurants modernes au Congo-Brazzaville.
              Menu numérique, QR codes, commandes en ligne et paiements mobiles.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/auth/register">
                <Button size="lg" className="h-12 px-8">
                  Commencer Gratuitement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="h-12 px-8">
                  En savoir plus
                </Button>
              </Link>
            </div>
            <div className="mt-12">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
                alt="Restaurant Interface"
                className="mx-auto rounded-lg shadow-xl"
                width={800}
                height={400}
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Tout ce dont vous avez besoin pour gérer votre restaurant
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
                >
                  <feature.icon className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Des tarifs adaptés à vos besoins
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pricing.map((plan, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
                >
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <div className="my-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.price !== 'Sur mesure' && <span> FCFA/mois</span>}
                  </div>
                  <p className="mb-4 text-muted-foreground">{plan.description}</p>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <ChefHat className="mr-2 h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Choisir ce plan</Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Ce que disent nos clients
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6">
                <p className="mb-4 text-muted-foreground">
                  "MenuFlow a révolutionné la gestion de notre restaurant. Nos clients adorent pouvoir commander directement depuis leur téléphone."
                </p>
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="font-semibold">Restaurant Le Parisien</p>
                    <p className="text-sm text-muted-foreground">Brazzaville</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <p className="mb-4 text-muted-foreground">
                  "L'intégration des paiements mobiles a considérablement simplifié nos opérations quotidiennes."
                </p>
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="font-semibold">Mami Wata</p>
                    <p className="text-sm text-muted-foreground">Pointe-Noire</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <p className="mb-4 text-muted-foreground">
                  "Le support client est exceptionnel. L'équipe est toujours disponible pour nous aider."
                </p>
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="font-semibold">La Mandarine</p>
                    <p className="text-sm text-muted-foreground">Brazzaville</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2">
                <ChefHat className="h-6 w-6" />
                <span className="text-xl font-bold">MenuFlow</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Simplifiez la gestion de votre restaurant avec notre solution tout-en-un.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Produit</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>Fonctionnalités</li>
                <li>Tarifs</li>
                <li>Guide d'utilisation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Entreprise</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>À propos</li>
                <li>Blog</li>
                <li>Carrières</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Support</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>Centre d'aide</li>
                <li>Contact</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © 2024 MenuFlow. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}