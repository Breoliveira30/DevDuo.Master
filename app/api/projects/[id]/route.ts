import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // A lógica real está no contexto
  return NextResponse.json({
    success: true,
    message: "Use o contexto para acessar projetos específicos",
  })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  // A lógica real está no contexto
  return NextResponse.json({
    success: true,
    message: "Use o contexto para atualizar projetos",
  })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // A lógica real está no contexto
  return NextResponse.json({
    success: true,
    message: "Use o contexto para excluir projetos",
  })
}
