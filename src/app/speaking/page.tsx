import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function SpeakingSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({
  title,
  description,
  event,
  cta,
  href,
}: {
  title: string
  description: string
  event: string
  cta: string
  href: string
}) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href} target="_blank">
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export const metadata: Metadata = {
  title: 'Vystupování',
  description: 'Vždycky mě bavilo prezentovat',
}

export default function Speaking() {
  return (
    <SimpleLayout
      title="Vždycky mě bavilo prezentovat"
      intro="Prezentování, školení a webináře mě baví a jsou mými silnými stránkami, zejména pokud je mi téma blízké a rozumím mu. Disponuji rozsáhlými zkušenostmi s prezentací produktů klientům a školením uživatelů, zejména v oblasti specifických nástrojů. Aktivně jsem se podílel na řadě profesionálních webinářů, což mi umožnilo další rozvoj v této oblasti."
    >
      <div className="space-y-20">
        <SpeakingSection title="Webináře">
          <Appearance
            href="https://youtu.be/8RmOkqAZx1o?si=rv3Lo-nnOW8VXb0C"
            title="Newsletter s umělou inteligencí"
            description="Proč dává smysl AI v email marketingu využívat. Popis newsletteru vytvořeného pomocí AI. Praktická ukázka, jak newsletter s AI vytvořit. Jak lze využít AI i po odeslaní newsletteru. Rizika AI a základní informace o doplňku."
            event="Shoptet webináře 2023"
            cta="Shlédnout video"
          />
          <Appearance
            href="https://youtu.be/Oepvpod3rY8?si=UQFiP3d4bTDymtk9"
            title="Bezpečnost v e-mail marketingu"
            description="Nástrahy a podvody ve světě e-mailů, víte o nich dost? Štve vás, že vaše e-mailové kampaně končí ve spamu? Pojďte s naším Digital Marketing Leadem Marem Vočadlem odkrýt souvislosti, které ovlivňují vaše výsledky a nebezpečí, kterým je třeba se vyhnout."
            event="Shoptet webináře 2021"
            cta="Shlédnout video"
          />
        </SpeakingSection>
      </div>
    </SimpleLayout>
  )
}
