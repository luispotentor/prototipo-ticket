<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTicketCustomerRequest extends FormRequest
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
            'ticket_type_id' => 'sometimes|required|exists:ticket_types,id',
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages():array
    {
        return [
            'ticket_type_id.required' => 'El tipo de ticket es obligatorio.',
            'ticket_type_id.exists' => 'El tipo de ticket seleccionado no es válido.',
            'title.required' => 'El título del ticket es obligatorio.',
            'title.string' => 'El título del ticket debe ser una cadena de caracteres.',
            'title.max' => 'El título del ticket no puede tener más de :max caracteres.',
            'description.required' => 'La descripción del ticket es obligatoria.',
            'description.string' => 'La descripción del ticket debe ser una cadena de caracteres.',
        ];
    }
}
