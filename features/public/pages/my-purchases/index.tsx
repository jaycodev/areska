import { Store } from 'lucide-react'

export function MyPurchasesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p-5 gap-4 flex flex-col">
      <div className="flex flex-col">
        <div className="space-y-0.5">
          <h1 className="text-2xl flex items-center gap-2">
            <Store />
            Mis compras
          </h1>
          <p className="text-muted-foreground">
            Consulta y gestiona tu historial de compras, el estado de pedidos, facturas y
            devoluciones.
          </p>
          {/* Placeholder de ejemplo - eliminar cuando se desarrolle la vista */}
          <div className="mt-4 text-sm text-amber-600">
            Ejemplo/placeholder: contenido de muestra para diseño. Eliminar cuando se desarrolle la
            funcionalidad real.
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <article key={i} className="border rounded-lg p-4 bg-muted/40">
                <h2 className="font-semibold">Pedido #{10000 + i}</h2>
                <p className="text-sm text-muted-foreground">Fecha: 0{i + 1}/10/2025</p>
                <p className="mt-2">Contenido: Lorem ipsum dolor sit amet.</p>
                <p className="mt-2 font-medium">Total: $--.--</p>
                <p className="mt-2 text-xs text-muted-foreground">Estado: Pendiente</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
