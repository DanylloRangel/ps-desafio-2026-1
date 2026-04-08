'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select'
import { cn } from '@/lib/utils'
import { api, ResponseErrorType } from '@/services/api'
import { categoryType } from '@/types/category'
import { sportsItemType } from '@/types/sportsItem'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsSportsItemProps {
  sportsItem?: sportsItemType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsSportsItem({
  sportsItem,
  readOnly,
  error,
}: FormFieldsSportsItemProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>()
  const [categories, setCategories] = useState<categoryType[]>([])
  const [selectedCategory, setSelectedCategory] = useState< categoryType | null>(
    sportsItem?.category ?? null
  )

  useEffect(() => {
    async function getCategories() {
      const {response, error} = await api('GET', '/category')
      if (response) {
        setCategories(response as categoryType[])
      }
      else {
        console.error(error?.message)
      }
    }
    getCategories()
  }, [])

  return (
    <>
      <FormFieldsGroup>
        {sportsItem && <Input defaultValue={sportsItem.id} type="text" name="id" hidden />}
        <FormField>
          <Label htmlFor= "image" required= {!sportsItem}>
            Imagem
          </Label>
          <Input name="image" id="image" type="file" accept= "image/*" disabled={pending} hidden={readOnly} error={error?.errors?.name}/>
          <ImageForm
            className = "aspect-square size-40"
            src={updateImage || sportsItem?.image}
          />
        </FormField>
        <FormField>
          <Label htmlFor="name" required = {!sportsItem}>
            Nome
          </Label>
          <Input name="name" id="name" placeholder="Insira o nome do artigo esportivo" type="text" disabled={pending} readOnly={readOnly} defaultValue={sportsItem?.name} error={error?.errors?.name}/>
        </FormField>
        <FormField>
          <Label htmlFor="brand" required = {!sportsItem}>
            Marca
          </Label>
          <Input name="brand" id="brand" placeholder="Insira a marca do artigo esportivo" type="text" disabled={pending} readOnly={readOnly} defaultValue={sportsItem?.brand} error={error?.errors?.brand}/>
        </FormField>
        <FormField>
          <Label htmlFor="price" required = {!sportsItem}>
            Preço
          </Label>
          <Input 
            name="price" 
            id="price" 
            placeholder="Insira o preço do artigo esportivo" 
            defaultValue={sportsItem?.price} 
            disabled={pending} 
            readOnly={readOnly}
            error={error?.errors?.price}
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
          />
        </FormField>
        <FormField>
          <Label htmlFor="year" required = {!sportsItem}>
            Ano
          </Label>
          <Input name="year" id="year" placeholder="Insira o ano do artigo esportivo" type="number" readOnly={readOnly} disabled={pending} defaultValue={sportsItem?.year} error={error?.errors?.year}/>
        </FormField>
        <FormField>
          <Label htmlFor='category_id' required = {!sportsItem}>
            Categoria
          </Label>
          <Input
            id="category_id" 
            name="category_id" 
            type= "hidden"
            value={selectedCategory?.id}
          />
          <Select
            value= {selectedCategory?.id}
            onValueChange={(value) => setSelectedCategory(categories.find((category) => category.id === value) ?? null)}
            disabled={pending || readOnly}
          >
            <SelectTrigger id="category_id" className="col-span-3" >
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error?.errors?.category_id && (
            <p className="text-destructive text-xs mt-2 col-start-2 col-end-5">
              {error.errors.category_id}
            </p>
          )}
        </FormField>
        <FormField>
          <Label htmlFor="amount" required = {!sportsItem}>
            Quantidade
          </Label>
          <Input name="amount" id="amount" placeholder="Insira a quantidade do artigo esportivo" type="number" readOnly={readOnly} disabled={pending} defaultValue={sportsItem?.amount} error={error?.errors?.amount} min="0"/>
        </FormField>
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}
