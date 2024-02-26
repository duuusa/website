import { NextRequest, NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'

export const config = {
  matcher: ['/'],
}

export async function middleware(req: NextRequest) {
  if (!process.env.EDGE_CONFIG) {
    console.error('EDGE_CONFIG is not set')
  }

  try {
    const isInMaintenanceMode = await get<boolean>('isInMaintenanceMode')
    
    if (isInMaintenanceMode) {
      req.nextUrl.pathname = `/closed`
      return NextResponse.rewrite(req.nextUrl)
    }
  } catch (error) {
    console.error(error)
  }
}