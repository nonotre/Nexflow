import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Acesse sua conta</CardTitle>
          <CardDescription>
            Insira seu e-mail abaixo para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Entrar</Button>
                
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border my-2">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Ou continue com:
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <Button variant="outline" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Logar com Google
                  </Button>
                  <Button variant="outline" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                       <path d="M15.429 8.229h-3.429V4.8h3.429v3.429zm-4.286-3.429H7.714v3.429h3.429V4.8zm4.286 4.286h-3.429v3.429h3.429V9.086zm-4.286 0H7.714v3.429h3.429V9.086zM6.857 4.8H3.429v3.429h3.428V4.8zm0 4.286H3.429v3.429h3.428V9.086z" fill="#5059C9" />
                       <path d="M20.571 13.371h-5.142v-5.143h5.142v5.143zm-6.001-5.143H9.429v5.143h5.141v-5.143zm6.001 6.001h-5.142v5.142h5.142v-5.142zm-6.001 0H9.429v5.142h5.141v-5.142z" fill="#7B83EB" />
                    </svg>
                    Logar com Teams
                  </Button>
                  <Button variant="outline" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52-2.523A2.518 2.518 0 0 1 5.042 10.12a2.532 2.532 0 0 1 2.532 2.522v2.523H5.042zM8.213 15.165a2.528 2.528 0 0 1 2.522-2.523 2.528 2.528 0 0 1 2.523 2.523v6.313A2.528 2.528 0 0 1 10.735 24a2.528 2.528 0 0 1-2.522-2.522v-6.313zM8.835 5.042a2.528 2.528 0 0 1 2.523-2.52A2.518 2.518 0 0 1 13.88 5.042a2.532 2.532 0 0 1-2.522 2.532H8.835V5.042zM8.835 8.213a2.528 2.528 0 0 1 2.523 2.522 2.528 2.528 0 0 1-2.523 2.523H2.522A2.528 2.528 0 0 1 0 10.736a2.528 2.528 0 0 1 2.522-2.523h6.313zM18.958 8.835a2.528 2.528 0 0 1 2.52 2.523 2.518 2.518 0 0 1-2.52 2.522 2.532 2.532 0 0 1-2.532-2.522V8.835h2.532zM15.787 8.835a2.528 2.528 0 0 1-2.522 2.523 2.528 2.528 0 0 1-2.523-2.523V2.522A2.528 2.528 0 0 1 13.265 0a2.528 2.528 0 0 1 2.522 2.522v6.313zM15.165 18.958a2.528 2.528 0 0 1-2.523 2.52 2.518 2.518 0 0 1-2.522-2.52 2.532 2.532 0 0 1 2.522-2.532h2.523v2.532zM15.165 15.787a2.528 2.528 0 0 1-2.523-2.522 2.528 2.528 0 0 1 2.523-2.523h6.313A2.528 2.528 0 0 1 24 13.264a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A" />
                      <path d="M15.165 18.958a2.528 2.528 0 0 1-2.523 2.52 2.518 2.518 0 0 1-2.522-2.52 2.532 2.532 0 0 1 2.522-2.532h2.523v2.532z" fill="#36C5F0" />
                      <path d="M15.165 15.787a2.528 2.528 0 0 1-2.523-2.522 2.528 2.528 0 0 1 2.523-2.523h6.313A2.528 2.528 0 0 1 24 13.264a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#36C5F0" />
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52-2.523A2.518 2.518 0 0 1 5.042 10.12a2.532 2.532 0 0 1 2.532 2.522v2.523H5.042z" fill="#2EB67D" />
                      <path d="M8.213 15.165a2.528 2.528 0 0 1 2.522-2.523 2.528 2.528 0 0 1 2.523 2.523v6.313A2.528 2.528 0 0 1 10.735 24a2.528 2.528 0 0 1-2.522-2.522v-6.313z" fill="#2EB67D" />
                      <path d="M8.835 5.042a2.528 2.528 0 0 1 2.523-2.52A2.518 2.518 0 0 1 13.88 5.042a2.532 2.532 0 0 1-2.522 2.532H8.835V5.042z" fill="#ECB22E" />
                      <path d="M8.835 8.213a2.528 2.528 0 0 1 2.523 2.522 2.528 2.528 0 0 1-2.523 2.523H2.522A2.528 2.528 0 0 1 0 10.736a2.528 2.528 0 0 1 2.522-2.523h6.313z" fill="#ECB22E" />
                    </svg>
                    Logar com Slack
                  </Button>
                </div>

                <FieldDescription className="text-center mt-4">
                  Não tem uma conta? <a href="#">Cadastre-se</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
