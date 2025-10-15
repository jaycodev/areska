import { Logo } from '@/components/shared/logo'

interface Props {
  children?: React.ReactNode
}

export function AuthLayout({ children }: Props) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <span className="flex items-center gap-2 self-center font-medium">
          <Logo className="size-6" />
          Areska
        </span>
        {children}
      </div>
    </div>
  )
}
