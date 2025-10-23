'use client'

import { useEffect, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, Trash, Upload } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { getInitials } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth-store'

const photoSchema = z.object({
  photo: z
    .instanceof(File)
    .refine(
      (file) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        return allowedTypes.includes(file.type)
      },
      { message: 'Solo se permiten imágenes en formato JPG, PNG, GIF o WEBP.' }
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'El tamaño máximo de la imagen es 5MB.',
    })
    .nullable(),
})

const personalSchema = z.object({
  email: z.email({ message: 'Introduce un correo electrónico válido.' }).trim(),
  firstName: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
    .max(50, { message: 'El nombre no puede tener más de 50 caracteres.' })
    .transform((val) => val.trim().replace(/\s+/g, ' '))
    .refine((val) => /^[A-Za-zÀ-ÿ\s-]+$/.test(val), {
      message: 'El nombre solo puede contener letras, espacios y guiones (-).',
    }),
  lastName: z
    .string()
    .min(2, { message: 'El apellido debe tener al menos 2 caracteres.' })
    .max(50, { message: 'El apellido no puede tener más de 50 caracteres.' })
    .transform((val) => val.trim().replace(/\s+/g, ' '))
    .refine((val) => /^[A-Za-zÀ-ÿ\s-]+$/.test(val), {
      message: 'El apellido solo puede contener letras, espacios y guiones (-).',
    }),
})

type PhotoFormValues = z.infer<typeof photoSchema>
type PersonalFormValues = z.infer<typeof personalSchema>

export function ProfileForm() {
  const { user, init, isLoadingInitial } = useAuthStore()
  const photoForm = useForm<PhotoFormValues>({
    resolver: zodResolver(photoSchema),
    defaultValues: { photo: null },
    mode: 'onChange',
  })

  const personalForm = useForm<PersonalFormValues>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
    mode: 'onChange',
  })

  const photoValue = useWatch({ control: photoForm.control, name: 'photo' })
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [photoError, setPhotoError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    init()
  }, [init])

  const handleUploadPhoto = () => fileInputRef.current?.click()
  const handleDeletePhoto = () => {
    photoForm.setValue('photo', null)
    setAvatarUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handlePhotoSubmit = (data: PhotoFormValues) => {
    showSubmittedData(data)
  }

  const handlePersonalSubmit = (data: PersonalFormValues) => {
    showSubmittedData(data)
  }

  useEffect(() => {
    if (user) {
      personalForm.setValue('email', user.email || '')
      personalForm.setValue('firstName', user.firstName || '')
      personalForm.setValue('lastName', user.lastName || '')
    }
  }, [user, personalForm])

  useEffect(() => {
    if (photoValue instanceof File) {
      try {
        photoSchema.shape.photo.parse(photoValue)
        const objectUrl = URL.createObjectURL(photoValue)
        setAvatarUrl(objectUrl)
        setPhotoError(null)
        photoForm.handleSubmit(handlePhotoSubmit)()
        return () => URL.revokeObjectURL(objectUrl)
      } catch (error) {
        if (error instanceof z.ZodError) {
          setPhotoError(error.issues[0].message)
          setAvatarUrl(null)
        }
      }
    }
  }, [photoValue, photoForm])

  const getFallback = () => {
    const { firstName, lastName } = personalForm.getValues()
    return getInitials(firstName, lastName)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col items-center relative">
        <div className="relative">
          {isLoadingInitial ? (
            <Skeleton className="w-32 h-32 rounded-full" />
          ) : (
            <Avatar className="w-32 h-32">
              {avatarUrl || user?.photoURL ? (
                <AvatarImage
                  src={avatarUrl || user?.photoURL || ''}
                  alt="Foto de perfil"
                  className="object-cover"
                />
              ) : (
                <AvatarFallback className="text-5xl">{getFallback()}</AvatarFallback>
              )}
            </Avatar>
          )}
          <div className="absolute bottom-0 right-0">
            <DropdownMenu>
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center bg-background">
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-full p-0 rounded-full"
                    aria-label="Editar"
                    title="Editar"
                  >
                    <Pencil />
                  </Button>
                </DropdownMenuTrigger>
              </div>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleUploadPhoto}>
                  <Upload className="text-current" />
                  Subir foto
                </DropdownMenuItem>
                {avatarUrl && (
                  <DropdownMenuItem variant="destructive" onClick={handleDeletePhoto}>
                    <Trash />
                    Eliminar foto
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <input
          ref={fileInputRef}
          id="photo-input"
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              photoForm.setValue('photo', file)
            }
          }}
        />

        {photoError && <p className="text-xs text-destructive mt-2 text-center">{photoError}</p>}
      </div>

      <Form {...personalForm}>
        <form onSubmit={personalForm.handleSubmit(handlePersonalSubmit)} className="space-y-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <FormField
                control={personalForm.control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese su nombre" autoComplete="given-name" {...field} />
                    </FormControl>
                    {fieldState.error && <FormMessage />}
                  </FormItem>
                )}
              />
              <FormField
                control={personalForm.control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese su apellido"
                        autoComplete="family-name"
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={personalForm.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ejemplo@correo.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  {fieldState.error && <FormMessage />}
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center sm:justify-start">
            <Button type="submit">Actualizar perfil</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
