'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createSportsItem(form: FormData) {
    const res = await api('POST', '/sports-articles', {data: form})

    if(!res.error){
        revalidatePath('/admin/artigos-esportivos')
    }

    return JSON.stringify(res)
}

export async function updateSportsItem(form: FormData) {
    const res = await api('POST', `/sports-articles/${form.get('id')}`, {data: form})

    if(!res.error){
        revalidatePath('/admin/artigos-esportivos')
    }

    return JSON.stringify(res)
}

export async function destroySportsItem(id: string) {
    const res = await api('DELETE', `/sports-articles/${id}`)

    if(!res.error){
        revalidatePath('/admin/artigos-esportivos')
    }

    return JSON.stringify(res)
}

export async function buySportsItem(id: string, quantity: number) {

    const res = await api('POST', `/sports-articles/${id}/buy`, {data: {quantity: Number(quantity)}})

    if(!res.error){
        revalidatePath('/')
    }

    return JSON.stringify(res)
}

