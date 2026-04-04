<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSportsArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ["required", "min:5", "max:100"],
            "brand" => ["required", "min:5", "max:100"],
            "price" => ["required", "decimal:2"],
            "year" => ["required", "integer"],
            "image" => ["file"],
            "amount" => ["required", "integer"],
            "category_id" => ["required"]
        ];
    }
}
