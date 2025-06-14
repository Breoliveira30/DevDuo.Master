# 🚀 DevDuo - Landing Page

Uma landing page moderna e responsiva desenvolvida para a empresa DevDuo, especializada em criação de landing pages extraordinárias. O projeto foi construído com Next.js 14, TypeScript, Tailwind CSS e inclui um sistema completo de administração de projetos.

## ✨ Características

- 🎨 **Design Moderno**: Interface elegante com gradientes e animações suaves
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em todos os dispositivos
- ⚡ **Alta Performance**: Otimizado para velocidade e SEO
- 🔐 **Sistema Admin**: Painel administrativo para gerenciar projetos
- 🎭 **Animações Avançadas**: Efeitos visuais tecnológicos e interativos
- 🛠️ **TypeScript**: Código tipado para maior segurança e manutenibilidade

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React para produção
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Biblioteca de ícones moderna
- **Embla Carousel** - Carrossel responsivo e performático
- **Radix UI** - Componentes acessíveis e customizáveis

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18.0 ou superior)
- **npm** ou **yarn** ou **pnpm**
- **Git**

## 🚀 Instalação e Execução

### 1. Clone o repositório
\`\`\`bash
git clone https://github.com/seu-usuario/devduo-landing.git
cd devduo-landing
\`\`\`

### 2. Instale as dependências
\`\`\`bash
# Com npm
npm install

# Com yarn
yarn install

# Com pnpm
pnpm install
\`\`\`

### 3. Execute o projeto em modo de desenvolvimento
\`\`\`bash
# Com npm
npm run dev

# Com yarn
yarn dev

# Com pnpm
pnpm dev
\`\`\`

### 4. Acesse o projeto
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

\`\`\`
devduo-landing/
├── app/                          # App Router do Next.js 14
│   ├── admin/                    # Páginas administrativas
│   │   ├── dashboard/           # Dashboard principal
│   │   ├── login/               # Página de login
│   │   └── projects/            # Gerenciamento de projetos
│   ├── globals.css              # Estilos globais
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página inicial
├── components/                   # Componentes reutilizáveis
│   ├── admin/                   # Componentes administrativos
│   ├── ui/                      # Componentes de interface
│   └── portfolio-carousel.tsx   # Carrossel de projetos
├── lib/                         # Utilitários e configurações
│   ├── project-context.tsx     # Context para gerenciar projetos
│   ├── types.ts                 # Definições de tipos TypeScript
│   └── utils.ts                 # Funções utilitárias
├── public/                      # Arquivos estáticos
│   └── images/                  # Imagens do projeto
├── package.json                 # Dependências e scripts
├── tailwind.config.ts          # Configuração do Tailwind
├── tsconfig.json               # Configuração do TypeScript
└── README.md                   # Documentação do projeto
\`\`\`

## 🎯 Funcionalidades

### 🏠 Landing Page Principal
- Hero section com efeitos tecnológicos avançados
- Seção de serviços com cards interativos
- Apresentação da equipe
- Portfólio interativo com carrossel
- Formulário de contato integrado

### 🔐 Sistema Administrativo
- **Login seguro** com credenciais:
  - Usuário: `brenno.om` | Senha: `Bre140903`
  - Usuário: `gabriel.an` | Senha: `Gab123456`
- **Dashboard** com estatísticas dos projetos
- **CRUD completo** para gerenciar projetos
- **Visualização** dos projetos como no site principal

### 📱 Recursos Técnicos
- **Carrossel automático** com controles manuais
- **Animações CSS** personalizadas
- **Context API** para gerenciamento de estado
- **LocalStorage** para persistência de dados
- **Responsive design** mobile-first

## 🎨 Customização

### Cores e Temas
As cores principais podem ser alteradas no arquivo `tailwind.config.ts`:

\`\`\`typescript
colors: {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  // Adicione suas cores personalizadas
}
\`\`\`

### Projetos
Para adicionar novos projetos, acesse:
1. Faça login no painel admin: `/admin/login`
2. Vá para "Gerenciar Projetos"
3. Clique em "Novo Projeto"
4. Preencha os dados e salve

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente (se necessário)
3. Deploy automático a cada push

### Netlify
1. Conecte seu repositório ao Netlify
2. Configure o comando de build: `npm run build`
3. Pasta de publicação: `out` (se usando export estático)

### Outros Provedores
\`\`\`bash
# Build para produção
npm run build

# Inicie o servidor de produção
npm start
\`\`\`

## 📦 Scripts Disponíveis

\`\`\`bash
npm run dev      # Executa em modo desenvolvimento
npm run build    # Cria build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa linting do código
\`\`\`

## 🔧 Configurações Importantes

### Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto (se necessário):

\`\`\`env
# Exemplo de variáveis (ajuste conforme necessário)
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
\`\`\`

### Otimizações de Performance
- **Lazy loading** automático de imagens
- **Code splitting** do Next.js
- **Compressão** automática de assets
- **Cache** otimizado para recursos estáticos

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Equipe DevDuo

- **Brenno Oliveira** - Desenvolvedor Frontend
  - GitHub: [@Breoliveira30](https://github.com/Breoliveira30)
  - LinkedIn: [brenno-oliveira](https://www.linkedin.com/in/brenno-oliveira-5264b9265/)

- **Gabriel Alves** - Desenvolvedor Frontend
  - LinkedIn: [gabriel-alves](https://www.linkedin.com/in/gabriel-alves-7a1617263/)

## 📞 Contato

- **WhatsApp**: (61) 99859-0309
- **Email**: devduo.solution@gmail.com
- **Website**: [DevDuo Landing Page](https://seu-dominio.com)

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a [documentação](#-funcionalidades)
2. Procure em [Issues existentes](https://github.com/seu-usuario/devduo-landing/issues)
3. Crie uma [nova issue](https://github.com/seu-usuario/devduo-landing/issues/new)
4. Entre em contato via WhatsApp: (61) 99859-0309

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela no repositório!**
