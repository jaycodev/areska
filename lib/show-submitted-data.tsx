import { toast } from 'sonner'

export function showSubmittedData(data: unknown, title: string = 'Envió los siguientes valores:') {
  toast.message(title, {
    description: (
      <pre className="mt-2 w-full overflow-x-auto rounded-md bg-black p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  })
}
