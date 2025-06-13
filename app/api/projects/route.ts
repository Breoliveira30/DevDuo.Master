import { NextResponse } from "next/server"

// Esta é uma API simulada que usa localStorage em vez de um banco de dados real
// Ela existe apenas para manter a compatibilidade com o código existente

export async function GET() {
  // Em um ambiente real, isso seria uma consulta ao banco de dados
  // Como estamos usando localStorage, a lógica real está no contexto
  // Esta API é apenas um stub para manter compatibilidade

  return NextResponse.json({
    success: true,
    message: "Use o contexto para acessar os projetos",
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação dos dados
    const requiredFields = ["title", "description", "category", "tech", "features"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            error: `Campo ${field} é obrigatório`,
            success: false,
          },
          { status: 400 },
        )
      }
    }

    // A lógica real está no contexto
    return NextResponse.json(
      {
        success: true,
        message: "Use o contexto para adicionar projetos",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erro ao processar requisição:", error)
    return NextResponse.json(
      {
        error: "Erro ao processar requisição",
        success: false,
      },
      { status: 500 },
    )
  }
}
