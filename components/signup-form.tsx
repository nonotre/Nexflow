"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter()

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Criar uma conta</CardTitle>
        <CardDescription>
          Insira suas informações abaixo para criar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => {
          e.preventDefault()
          router.push('/projects')
        }}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome Completo</FieldLabel>
              <Input id="name" type="text" placeholder="João Silva" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">E-mail</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                Usaremos isso para entrar em contato. Não compartilharemos seu e-mail
                com mais ninguém.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input id="password" type="password" required />
              <FieldDescription>
                Deve ter pelo menos 8 caracteres.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirmar Senha
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>Por favor, confirme sua senha.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Criar Conta</Button>
                <Button variant="outline" type="button">
                  Cadastrar-se com Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Já tem uma conta? <Link href="/login" className="underline hover:no-underline">Entre</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
