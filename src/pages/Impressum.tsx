
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Impressum: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Impressum</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Angaben gemäß § 5 TMG</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>Verantwortlich für den Inhalt:</strong><br />
            Max Mustermann<br />
            Musterstraße 123<br />
            12345 Musterstadt<br />
            Deutschland
          </p>
          
          <p>
            <strong>Kontakt:</strong><br />
            Telefon: +49 123 4567890<br />
            E-Mail: info@example.com
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Haftungsausschluss</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold">Haftung für Inhalte</h3>
          <p>
            Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
            Vollständigkeit und Aktualität der Inhalte kann ich jedoch keine Gewähr übernehmen.
          </p>
          
          <h3 className="text-lg font-semibold">Haftung für Links</h3>
          <p>
            Mein Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte ich keinen 
            Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen.
          </p>
          
          <h3 className="text-lg font-semibold">Urheberrecht</h3>
          <p>
            Die durch mich erstellten Inhalte und Werke auf diesen Seiten unterliegen dem 
            deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
            der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen meiner schriftlichen 
            Zustimmung.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Impressum;
